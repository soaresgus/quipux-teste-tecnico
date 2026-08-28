.PHONY: start-api stop-api build-api

start-api:
	docker compose up -d --build api

stop-api:
	docker compose stop api

build-api:
	docker compose build api
