from io import BytesIO

import qrcode
from django.core.files.base import ContentFile
from django.utils import timezone
from rest_framework import decorators, permissions, response, status, viewsets

from .models import Attestation
from .serializers import AttestationSerializer, PublicAttestationSerializer


def build_verification_number(attestation):
    short_id = str(attestation.id).split('-')[0].upper()
    return f'TD-{timezone.now().year}-{short_id}'


def build_qr_code(attestation):
    qr_image = qrcode.make(attestation.verification_number)
    buffer = BytesIO()
    qr_image.save(buffer, format='PNG')
    return ContentFile(buffer.getvalue(), name=f'{attestation.verification_number}.png')


class AttestationViewSet(viewsets.ModelViewSet):
    serializer_class = AttestationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        queryset = Attestation.objects.select_related('document', 'user', 'verifier')

        if user.role == 'VERIFIER':
            return queryset.filter(verifier=user).order_by('-requested_at')

        return queryset.filter(user=user).order_by('-requested_at')

    @decorators.action(detail=True, methods=['post'])
    def attest(self, request, pk=None):
        attestation = self.get_object()
        if request.user.role != 'VERIFIER' or attestation.verifier != request.user:
            return response.Response(
                {'detail': 'Only the assigned verifier can attest this document.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        attestation.status = 'ATTESTED'
        attestation.attested_at = timezone.now()
        if not attestation.verification_number:
            attestation.verification_number = build_verification_number(attestation)
        if not attestation.qr_code:
            attestation.qr_code.save(attestation.verification_number, build_qr_code(attestation), save=False)
        attestation.save()
        return response.Response(self.get_serializer(attestation).data)

    @decorators.action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        attestation = self.get_object()
        if request.user.role != 'VERIFIER' or attestation.verifier != request.user:
            return response.Response(
                {'detail': 'Only the assigned verifier can reject this document.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        attestation.status = 'REJECTED'
        attestation.save(update_fields=['status'])
        return response.Response(self.get_serializer(attestation).data)


class PublicVerificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PublicAttestationSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'verification_number'
    lookup_value_regex = '[^/]+'

    def get_queryset(self):
        return Attestation.objects.select_related('document', 'user', 'verifier').filter(
            verification_number__isnull=False
        )
