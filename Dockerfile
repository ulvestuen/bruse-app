FROM node:slim

RUN groupadd -g 999 bruse-app && \
    useradd -r -u 999 -g bruse-app bruse-app

ADD --chown=bruse-app:bruse-app ./ /home/bruse-app/
WORKDIR /home/bruse-app

USER bruse-app
EXPOSE 5000
ENTRYPOINT ["/bin/bash","entrypoint.sh"]
