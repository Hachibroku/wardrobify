from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
import json
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO
from common.json import ModelEncoder


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "id",
        "location_id",
    ]
    encoders = {
        "location_id": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location_id=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location_id"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location_id"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hat(request, id):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=id)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            hat = Hat.objects.get(id=id)

            props = ["fabric", "style", "color", "picture_url", "location_id"]
            for prop in props:
                if prop in content:
                    setattr(hat, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else: #DELETE
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
