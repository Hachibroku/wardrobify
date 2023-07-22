import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()


from shoes_rest.models import BinVO


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            response = requests.get('http://wardrobe-api:8000/api/bins/')
            print(response.status_code)
            if response.status_code == 200:
                bins = response.json()
                for bin in bins["bins"]:
                    BinVO.objects.update_or_create(
                        import_href=bin['href'],
                        defaults={
                            'closet_name': bin['closet_name'],
                            'bin_number': bin['bin_number'],
                            'bin_size': bin['bin_size'],
                        }
                    )
                print(f'Imported {len(bins["bins"])} bins')
            else:
                print(f'Error in API call: {response.status_code}')
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
