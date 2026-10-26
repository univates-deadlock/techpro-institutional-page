FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY index.html /usr/share/caddy/index.html
COPY pages/ /usr/share/caddy/pages/
COPY css/ /usr/share/caddy/css/
COPY js/ /usr/share/caddy/js/
COPY assets/ /usr/share/caddy/assets/

EXPOSE 80 443 8080