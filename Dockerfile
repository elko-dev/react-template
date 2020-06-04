FROM node:12 AS build

COPY . ./

# potential performance optimization from https://github.com/npm/npm/issues/8836
RUN npm config set registry https://registry.npmjs.org/

RUN npm i

EXPOSE 3000

## Second stage image
FROM node:12
COPY package.json ./


## Move the UI server into ./dist, and create a public/ folder to serve from
COPY --from=build public ./public
# Need to do this so the Firebase config can be generated at runtime (don't have to keep static credentials)
COPY --from=build scripts ./scripts
COPY --from=build node_modules ./node_modules

COPY --from=build src ./src
CMD npm run start