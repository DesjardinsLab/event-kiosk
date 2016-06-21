#!/bin/bash
export DEBUG="True"
export SECRET_KEY="secret"
export DB_ENGINE="django.db.backends.sqlite3"
export DB_NAME="./db.sqlite3"
export ALLOWED_HOST="127.0.0.1"
export OPEN_WEATHER_MAP_APPID=""

./manage.py runserver 0.0.0.0:8888
