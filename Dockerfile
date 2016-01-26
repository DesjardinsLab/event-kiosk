FROM ubuntu:14.04

ENV LANG C

ENV PYTHONUNBUFFERED 1

# keep upstart quiet
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -sf /bin/true /sbin/initctl

# no tty
ENV DEBIAN_FRONTEND noninteractive

# Install Nginx + Python + Supervisor
RUN \
  apt-get update && \
  apt-get install -y nginx supervisor python3 python3-dev python3-pip python-virtualenv libpq-dev libffi6 libffi-dev libjpeg-dev libjpeg8 && \
  rm -rf /var/lib/apt/lists/* && \
  chown -R www-data:www-data /var/lib/nginx

RUN service supervisor stop
RUN service nginx stop

RUN pip install supervisor-stdout  -i  http://pypi.douban.com/simple/

ADD ./backend/etc/supervisord.conf /etc/supervisord.conf
ADD ./backend/etc/nginx.conf /etc/nginx/nginx.conf

# Copy project files
RUN mkdir /app
WORKDIR /app
ENV HOME /app

ADD ./backend /app
RUN chmod -R 0755 /app/run-prod.sh

# Install pip requirements
RUN pip3 install -r requirements.txt

# Expose port and media
EXPOSE 80
VOLUME /app/event_kiosk/media

# Run project
CMD supervisord -c /etc/supervisord.conf -n
