from rest_framework import permissions, viewsets

from .models import Document
from .serializers import DocumentSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return (
            Document.objects.filter(user=self.request.user)
            .prefetch_related('attestations')
            .order_by('-uploaded_at')
        )
