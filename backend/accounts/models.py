from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Super Admin'),
        ('VERIFIER', 'Verifier / Attestation Officer'),
        ('CITIZEN', 'Citizen / User'),
        ('ORGANIZATION', 'Organization / API Client'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='CITIZEN')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_verifier_approved = models.BooleanField(default=False)
    
    # NID/Passport, verification status, etc.
    nid_document = models.FileField(upload_to='verifiers/nid/', blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    workplace = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"
