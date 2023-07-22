import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()


from hats_rest.models import LocationVO


def poll():
    while True:
        print('Hats poller polling for data')
        try:
            response = requests.get('http://wardrobe-api:8000/api/locations/')
            print(response.status_code)
            if response.status_code == 200:
                locations = response.json()
                for location in locations["locations"]:
                    LocationVO.objects.update_or_create(
                        import_href=location['href'],
                        defaults={
                            'closet_name': location['closet_name'],
                            'section_number': location['section_number'],
                            'shelf_number': location['shelf_number'],
                        }
                    )
                print(f'Imported {len(locations["locations"])} locations')
            else:
                print(f'Error in API call: {response.status_code}')
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
