from django.shortcuts import render
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
from .models import LocationVO, Hat


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
        "id",
    ]


class HatEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "fabric",
        "style",
        "color",
        "picture_url",
        "location",
        "id",
    ]
    encoders = {
        "location": LocationVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    pass

@require_http_methods(["GET","PUT", "DELETE"])
def api_show_hats(request, pk):
    pass
