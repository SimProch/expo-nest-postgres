APPLICATION_NAME=meddi-app

down:
	docker compose down
build:
	docker build --tag ${APPLICATION_NAME}:latest .
run:
	docker compose up -d
run-db:
	docker compose up -d postgres
migrate: 
	sleep 3 && npm run db:generate && npm run db:push

all:
	$(MAKE) down
	$(MAKE) build
	$(MAKE) run
	$(MAKE) migrate
all-db:
	$(MAKE) down
	$(MAKE) run-db
	$(MAKE) migrate