Event Kiosk
========================
Simple react application allowing creation of a slideshow centered around
an event calendar.

The layout is arranged with a 1080x1920 kiosk screen in mind.

The front-end is a npm app bundled with Webpack.

The back-end is a django app that allows creation of a presentation.

Dev mode for front-end only
=======================
To test front-end only (with an example json file), run
```
npm start
```

To modify test data, change *example-data.json*.

To compile the bundle for the back-end, run
```
npm run deploy
```

Dev mode for django back-end
=======================
If you made changes to the ReactJS front-end, make sure to compile the bundle
using webpack.

To start your dev server for django:
```
cd backend
virtualenv -p /usr/bin/python3 env
source env/bin/activate
pip install -r requirements.txt
cd event_kiosk
./manage-with-env.sh collectstatic
./manage-with-env.sh migrate
./run-dev.sh
```

Deploying with Docker
=======================
Environment variables:

* **SECRET_KEY** : Django secret key
* **DEBUG** : Django Debug flag (True or False)
* **ALLOWED_HOSTS** : Hostname of the app
* **DB_ENGINE** : Database engine (ex: django.db.backends.postgresql)
* **DB_NAME** : Database name
* **DB_USER** : Database user
* **OPEN_WEATHER_MAP_APPID** : API key for openweathermap (Optional, required for weather Slides)

Deploying with Dokku
=======================
Using Dokku requires additional environment variables:

* **DOKKU_POSTGRES_EVENT_KIOSK_ENV_POSTGRES_PASSWORD** : Database password
* **DOKKU_POSTGRES_EVENT_KIOSK_PORT_5432_TCP_ADDR** : Database hostname
* **DOKKU_POSTGRES_EVENT_KIOSK_PORT_5432_TCP_PORT** : Database port

Credits and mentions
=======================
Weather icons come from [VClouds on DeviantArt](http://vclouds.deviantart.com/art/VClouds-Weather-Icons-179152045), they are reserved for non-commercial use.

If you intend to use weather slides for commercial use, make sure to contact him for pricing and permission (or add new icons to /src/utils/WeatherProviders.js).
