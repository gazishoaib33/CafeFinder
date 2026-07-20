# Dockerfile
# ------------------------------------------------------------------
# Serves the CafeFinder static site with Nginx.
# This is a pure static site (HTML/CSS/JS ES modules) — no build step,
# no Node runtime needed at container run time.
# ------------------------------------------------------------------

FROM nginx:1.27-alpine

# Clear Nginx's default placeholder site
RUN rm -rf /usr/share/nginx/html/*

# Copy the project into Nginx's web root
COPY . /usr/share/nginx/html

# Nginx listens on 80 inside the container by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
