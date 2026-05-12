from rest_framework import serializers

from documents.models import Document

from .models import Attestation


class AttestationSerializer(serializers.ModelSerializer):
    document_title = serializers.CharField(source='document.title', read_only=True)
    document_type = serializers.CharField(source='document.document_type', read_only=True)
    citizen_name = serializers.SerializerMethodField()
    verifier_name = serializers.SerializerMethodField()

    class Meta:
        model = Attestation
        fields = (
            'id',
            'document',
            'document_title',
            'document_type',
            'citizen_name',
            'verifier',
            'verifier_name',
            'verification_number',
            'qr_code',
            'digital_pdf',
            'status',
            'fee_paid',
            'requested_at',
            'attested_at',
        )
        read_only_fields = (
            'id',
            'document_title',
            'document_type',
            'citizen_name',
            'verifier_name',
            'verification_number',
            'qr_code',
            'digital_pdf',
            'status',
            'fee_paid',
            'requested_at',
            'attested_at',
        )

    def get_citizen_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_verifier_name(self, obj):
        if not obj.verifier:
            return None
        return obj.verifier.get_full_name() or obj.verifier.username

    def validate_document(self, document):
        request = self.context['request']
        if document.user != request.user:
            raise serializers.ValidationError('You can only request attestation for your own documents.')
        return document

    def create(self, validated_data):
        document = validated_data['document']
        return Attestation.objects.create(
            document=document,
            user=self.context['request'].user,
            verifier=validated_data['verifier'],
            fee_paid=True,
        )


class PublicAttestationSerializer(serializers.ModelSerializer):
    document_title = serializers.CharField(source='document.title', read_only=True)
    document_type = serializers.CharField(source='document.document_type', read_only=True)
    citizen_name = serializers.SerializerMethodField()
    verified_by = serializers.SerializerMethodField()
    is_valid = serializers.SerializerMethodField()

    class Meta:
        model = Attestation
        fields = (
            'is_valid',
            'status',
            'verification_number',
            'document_title',
            'document_type',
            'citizen_name',
            'verified_by',
            'attested_at',
        )

    def get_citizen_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_verified_by(self, obj):
        if not obj.verifier:
            return None
        return obj.verifier.get_full_name() or obj.verifier.username

    def get_is_valid(self, obj):
        return obj.status == 'ATTESTED'
