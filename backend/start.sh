#!/bin/sh

python -c "from utils.download_models import download_models; download_models()"

gunicorn -w 4 -b 0.0.0.0:5000 app:app