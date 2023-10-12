from django.urls import path
from .api_views import api_list_hats, api_show_hat

urlpatterns = [
    path('hats/', api_list_hats, name="api_list_hats"),
    path('hats/<int:id>/', api_show_hat, name="api_show_hat")
]
