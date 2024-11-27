FROM node:22.6.0-alpine3.20 AS base

COPY / ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:mainline-alpine3.20 AS production
COPY --from=base /dist /usr/share/nginx/html

