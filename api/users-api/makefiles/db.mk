.PHONY: start-db stop-db

start-db:
	docker compose up -d postgres

stop-db:
	docker compose stop postgres
