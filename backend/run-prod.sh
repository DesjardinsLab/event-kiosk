#!/bin/bash
cd /app/event_kiosk
python3 manage.py collectstatic --noinput
python3 manage.py migrate --noinput auth
python3 manage.py migrate --noinput
/usr/local/bin/gunicorn ecd.wsgi -w 4 -b 127.0.0.1:5000 --log-level=info --chdir=/app/event_kiosk
