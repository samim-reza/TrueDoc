from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AttestationViewSet, PublicVerificationViewSet

router = DefaultRouter()
router.register('attestations', AttestationViewSet, basename='attestations')
router.register('public', PublicVerificationViewSet, basename='public-verification')

urlpatterns = [
    path('', include(router.urls)),
]
