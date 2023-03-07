in progress...

### Copy env file
```sh
cp .env.example .env
```
### Start up and setup container
```sh
docker compose up -d
```
```sh
docker-compose exec node npm install
```
### Compile and Hot-Reload for Development
```sh
docker-compose exec node npm run dev
```
### Compile and Minify for Production
```sh
docker-compose exec node npm run build
```
### Lint with [ESLint]
```sh
docker-compose exec node npm run lint
```
