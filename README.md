Event Kiosk
========================

The frondend is a npm app bundled with Webpack.


Deploying with Docker
=======================

environment variables:

SECRET_KEY : Django secret key
DEBUG : Django Debug flag (True or False)
ALLOWED_HOSTS : Hostname of the app
DB_ENGINE : Database engine (ex: django.db.backends.postgresql)
DB_NAME : Database name
DB_USER : Database user
DOKKU_POSTGRES_EVENT_KIOSK_ENV_POSTGRES_PASSWORD : Database password
DOKKU_POSTGRES_EVENT_KIOSK_PORT_5432_TCP_ADDR : Database hostname
DOKKU_POSTGRES_EVENT_KIOSK_PORT_5432_TCP_PORT : Database port
