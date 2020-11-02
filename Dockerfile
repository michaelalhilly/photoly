FROM node:12.18.3

# Adds vodka tonic alias.

RUN echo 'alias vt="./vt.sh"' >> ~/.bashrc

# Adds Supervisor configuration file. Supervisor is run
# as a background process to keep this container running.

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Installs Vue and Ionic tools.

RUN npm i -g @ionic/cli@latest native-run cordova-res --unsafe-perm=true --allow-root

# Updates environment and installs supervisor
# to keep containers running.

RUN apt-get update && apt-get install -y \
	supervisor

# Creates Supervisor directory.

RUN mkdir -p /var/log/supervisor