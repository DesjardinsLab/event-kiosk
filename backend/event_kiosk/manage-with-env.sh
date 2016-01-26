#!/bin/bash
DEBUG=True DB_NAME="./db.sqlite3" DB_ENGINE="django.db.backends.sqlite3" SECRET_KEY="secret" ./manage.py "$@"
