from django.db import models


class LocationVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    closet_name = models.CharField(max_length=100, null=True)
    section_number = models.PositiveSmallIntegerField(null=True)
    shelf_number = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.closet_name


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    location_id = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return self.fabric

    class Meta:
        ordering = ("fabric",)
