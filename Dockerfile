FROM node:6

RUN npm install -g browser-sync
WORKDIR /source

ADD entrypoint.sh /entrypoint.sh
RUN chmod u+x /entrypoint.sh

EXPOSE 3000 3001

ENTRYPOINT ["/entrypoint.sh"]
