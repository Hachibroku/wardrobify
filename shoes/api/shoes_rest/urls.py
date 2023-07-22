from django.urls import path
from .views import list_shoes, shoe_detail

urlpatterns = [
    path("shoes/", list_shoes, name="list_shoes"),
    path("shoes/<int:pk>/", shoe_detail, name="shoe_detail"),
]
