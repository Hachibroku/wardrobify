from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href"
    ]



class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "bin",
        "picture_url",
        "color",
        "id"
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin = BinVO.objects.get(import_href=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_shoe_detail(request, id):
    if request.method == "GET":
        shoes = Shoe.objects.filter(id=id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET"])
def api_list_bins(request):
    bins = BinVO.objects.all()
    return JsonResponse(
        {"bins": bins},
        encoder=BinVODetailEncoder,
        safe=False,
    )
