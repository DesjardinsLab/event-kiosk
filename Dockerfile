FROM python:3
ENV PYTHONUNBUFFERED 1

#
# Setup project and install Python dependencies
#
RUN mkdir /app
WORKDIR /app

ADD backend /app
RUN pip install -r requirements.txt

#
# Set ENV
#
ENV HOME /app
VOLUME /app/event_kiosk/media

WORKDIR /app/event_kiosk
RUN ./manage-with-env.sh collectstatic --noinput

#
# Run project
#
EXPOSE 8080
CMD python manage.py migrate --noinput auth && python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8080
