#!/bin/bash

DB_NAME="./db.sqlite3" DB_ENGINE="django.db.backends.sqlite3" SECRET_KEY="secret" ./manage.py collectstatic --no-input
