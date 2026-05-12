from rest_framework import serializers

from verification.models import Attestation

from .models import Document


class AttestationSummarySerializer(serializers.ModelSerializer):
    verifier_name = serializers.SerializerMethodField()

    class Meta:
        model = Attestation
        fields = (
            'id',
            'status',
            'verification_number',
            'fee_paid',
            'verifier',
            'verifier_name',
            'requested_at',
            'attested_at',
        )
        read_only_fields = fields

    def get_verifier_name(self, obj):
        if not obj.verifier:
            return None
        return obj.verifier.get_full_name() or obj.verifier.username


class DocumentSerializer(serializers.ModelSerializer):
    attestations = AttestationSummarySerializer(many=True, read_only=True)
    owner_name = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = (
            'id',
            'title',
            'description',
            'document_type',
            'file',
            'uploaded_at',
            'owner_name',
            'attestations',
        )
        read_only_fields = ('id', 'uploaded_at', 'owner_name', 'attestations')

    def get_owner_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def create(self, validated_data):
        return Document.objects.create(user=self.context['request'].user, **validated_data)
