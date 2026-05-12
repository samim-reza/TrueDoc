from django.db import models
from django.conf import settings
from documents.models import Document
import uuid

class Attestation(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('ATTESTED', 'Attested'),
        ('REJECTED', 'Rejected'),
        ('REVOKED', 'Revoked'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='attestations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='requested_attestations')
    verifier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='performed_attestations')
    
    verification_number = models.CharField(max_length=100, unique=True, blank=True, null=True)
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)
    digital_pdf = models.FileField(upload_to='attested_pdfs/', blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    fee_paid = models.BooleanField(default=False)
    
    requested_at = models.DateTimeField(auto_now_add=True)
    attested_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Attestation {self.verification_number} - {self.status}"
