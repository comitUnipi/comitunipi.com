#!/bin/bash

ENV_FILE="/var/www/.env"

for VAR in XDEBUG PHP_IDE_CONFIG REMOTE_HOST; do
    if [ -z "${!VAR}" ] && [ -f "${ENV_FILE}" ]; then
        VALUE=$(grep $VAR $ENV_FILE | cut -d '=' -f 2-)
        if [ ! -z "${VALUE}" ]; then
            sed -i "/$VAR/d" ~/.bashrc
            echo "export $VAR=$VALUE" >>~/.bashrc
        fi
    fi
done

. ~/.bashrc

if [ -z "${REMOTE_HOST}" ]; then
    REMOTE_HOST="host.docker.internal"
    sed -i "/REMOTE_HOST/d" ~/.bashrc
    echo "export REMOTE_HOST=\"$REMOTE_HOST\"" >>~/.bashrc
    . ~/.bashrc
fi

service cron start

if [ "true" == "$XDEBUG" ] && [ ! -f /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini ]; then
    sed -i '/PHP_IDE_CONFIG/d' /etc/cron.d/laravel-scheduler
    if [ ! -z "${PHP_IDE_CONFIG}" ]; then
        echo -e "PHP_IDE_CONFIG=\"$PHP_IDE_CONFIG\"\n$(cat /etc/cron.d/laravel-scheduler)" >/etc/cron.d/laravel-scheduler
    fi
    docker-php-ext-enable xdebug &&
        echo "xdebug.remote_enable=1" >>/usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
    echo "xdebug.remote_autostart=1" >>/usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
    echo "xdebug.remote_connect_back=0" >>/usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
    echo "xdebug.remote_host=$REMOTE_HOST" >>/usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

elif [ -f /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini ]; then
    sed -i '/PHP_IDE_CONFIG/d' /etc/cron.d/laravel-scheduler
    rm -rf /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
fi

exec "$@"
