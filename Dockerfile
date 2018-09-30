FROM node:8

COPY . /app/node/



RUN chmod ugo+x /app/node/wait-for-it.sh
RUN mkdir /app/uploads


WORKDIR /app/node

RUN npm install

EXPOSE 9090

CMD ["npm","start"]



