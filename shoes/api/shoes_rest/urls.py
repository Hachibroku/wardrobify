from django.urls import path
from .views import api_list_shoes, api_shoe_detail, api_list_bins


urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("shoes/<int:id>/", api_shoe_detail, name="api_shoe_detail"),
    path("bins/", api_list_bins, name="api_list_bins")
]
