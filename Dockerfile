ARG REACT_APP_ENV="dev"
ARG AUTH_CONFIG="config"

FROM node:12 AS build

COPY . ./

ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV
RUN echo "ARGS is ${REACT_APP_ENV}"

ARG AUTH_CONFIG
ENV AUTH_CONFIG=$AUTH_CONFIG
RUN echo "ARGS is ${AUTH_CONFIG}"

RUN npm ci
RUN npm run build

EXPOSE 3000

## Second stage image
FROM node:12
COPY package.json ./

ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV
ARG AUTH_CONFIG
ENV AUTH_CONFIG=$AUTH_CONFIG
RUN echo "ARGS is ${REACT_APP_ENV}"
RUN echo "ARGS is ${AUTH_CONFIG}"

# Move the UI server into ./build, and create a public/ folder to serve from
COPY --from=build public ./public
# Need to do this so the Firebase config can be generated at runtime (don't have to keep static credentials)
COPY --from=build scripts ./scripts
COPY --from=build node_modules ./node_modules

COPY --from=build build ./build
CMD npm run serve