FROM node:16.13.1

COPY ./package.json /opt/app/web/package.json
COPY ./yarn.lock /opt/app/web/yarn.lock
WORKDIR /opt/app/web
RUN yarn install

COPY ./public /opt/app/web/public
COPY ./tsconfig.json /opt/app/web/tsconfig.json
COPY ./.eslintrc.js /opt/app/web/.eslintrc.js
COPY ./.eslintignore /opt/app/web/.eslintignore
COPY ./.prettierrc /opt/app/web/.prettierrc

EXPOSE 3000