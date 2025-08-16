FROM php:8.2-fpm

ENV COMPOSER_MEMORY_LIMIT='-1'

ENV PS1="\u@\h:\w\\$ "
ENV TZ="Asia/Jakarta"

RUN apt-get update && \
    apt-get install -y --force-yes --no-install-recommends \
        libmemcached-dev \
        libmcrypt-dev \
        libreadline-dev \
        libgmp-dev \
        libzip-dev \
        libz-dev \
        libpq-dev \
        libjpeg-dev \
        libpng-dev \
        libfreetype6-dev \
        libssl-dev \
        openssh-server \
        libmagickwand-dev \
        git \
        cron \
        nano \
        libxml2-dev

# Install extension
# soap, exif, pcntl, intl, gmp, zip,
# pdo_mysql, pdo_pgsql, bcmath,
# memcached, imagick, gd, xdebug

RUN docker-php-ext-install soap
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install intl
RUN docker-php-ext-install gmp
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install bcmath

# aktifkan jika membutuhkan redis, mongodb
# RUN pecl install redis && docker-php-ext-enable redis
# RUN pecl install mongodb && docker-php-ext-enable mongodb

RUN pecl install imagick && \
    docker-php-ext-enable imagick
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd
RUN pecl install xdebug
RUN pecl install memcached && docker-php-ext-enable memcached
RUN curl -s http://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

RUN echo "* * * * * root /usr/local/bin/php /var/www/html/artisan schedule:run >> /dev/null 2>&1" >> /etc/cron.d/laravel-scheduler
RUN chmod 0644 /etc/cron.d/laravel-scheduler

ADD ./local.ini /usr/local/etc/php/conf.d

RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/vendor/bin/dep "$@"' > /usr/bin/dep
RUN chmod +x /usr/bin/dep
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/html/artisan "$@"' > /usr/bin/art
RUN chmod +x /usr/bin/art
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/html/artisan migrate "$@"' > /usr/bin/migrate
RUN chmod +x /usr/bin/migrate
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/html/artisan migrate:fresh --seed' > /usr/bin/fresh
RUN chmod +x /usr/bin/fresh
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/html/artisan config:clear\n/var/www/vendor/bin/phpunit -d memory_limit=2G --stop-on-error --stop-on-failure --testdox-text=tests/report.txt "$@"' > /usr/bin/t
RUN chmod +x /usr/bin/t
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/html/artisan config:clear\n/bin/bash\n/usr/local/bin/php /var/www/html/artisan dusk -d memory_limit=2G --stop-on-error --stop-on-failure --testdox-text=tests/report-dusk.txt "$@"' > /usr/bin/d
RUN chmod +x /usr/bin/d

RUN rm -r /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]
