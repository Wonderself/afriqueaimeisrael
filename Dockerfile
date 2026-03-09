FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY "ONG AFRIQUE ISRAEL 1/ONG AFRIQUE ISRAEL 2/" /usr/share/nginx/html/
EXPOSE 80
