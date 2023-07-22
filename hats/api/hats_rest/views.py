from django.http import JsonResponse
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
def list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Ya done fucked up kid"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )


@require_http_methods(["GET","PUT", "DELETE"])
def hat_detail(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "This does does not exist yo"},
                status=400,
            )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            hat = Hat.objects.get(id=pk)

            props = ["fabric", "style", "color", "picture_url", "location"]
            for prop in props:
                if prop in content:
                    setattr(hat, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "You can't update what doesn't exist dawg"},
                status=404,
            )
    else:
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
