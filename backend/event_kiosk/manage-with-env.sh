#!/bin/bash

if [ -z "${DEV_IP}" ]; then
  if which ip >/dev/null; then
    # Linux
    DEV_IP=`ip route get 8.8.8.8 | grep src | sed 's/.*src \(.*\)$/\1/g' | awk '{print $1}'`
  else
    if which ifconfig >/dev/null; then
      # MacOS
      DEV_IP=`ifconfig | grep "inet " | grep -v 127.0.0.1 | awk 'NR == 1' | awk '{print $2}'`
    else
      echo 'ERROR: IP detection failed'
      exit
    fi
  fi
fi

DEBUG=True \
DB_NAME="./db.sqlite3" \
DB_ENGINE="django.db.backends.sqlite3" \
SECRET_KEY="secret" \
ALLOWED_HOST="${DEV_IP}" \
./manage.py "$@"
