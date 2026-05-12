from django.db import models
from django.conf import settings
from verification.models import Attestation
import uuid

class Payment(models.Model):
    PAYMENT_PURPOSE = (
        ('VERIFIER_REGISTRATION', 'Verifier Registration Fee'),
        ('ATTESTATION_FEE', 'Attestation Request Fee'),
        ('API_CREDITS', 'API Credits Purchase'),
    )
    
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    attestation = models.ForeignKey(Attestation, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purpose = models.CharField(max_length=50, choices=PAYMENT_PURPOSE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.id} - {self.amount} BDT"
