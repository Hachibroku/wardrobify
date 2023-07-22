from django.urls import path
from .views import list_hats, hat_detail

urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
    path("hats/<int:pk>/", hat_detail, name="hat_detail"),
]
