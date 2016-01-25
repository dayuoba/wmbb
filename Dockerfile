FROM    node:5.0.0
MAINTAINER dayuoba
RUN \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /app
ADD ./package.json /app/
ADD ./bower.json /app/

RUN npm install bower -g
RUN npm install webpack -g
RUN npm install uglify -g
RUN bower install --allow-root
RUN npm install

EXPOSE 2208
ADD . /app
RUN make config
CMD node server.js
