from django.db import models


class BinVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField(null=True)
    bin_size = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.closet_name

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return self.model_name

    class Meta:
        ordering = ("style", "model_name")
