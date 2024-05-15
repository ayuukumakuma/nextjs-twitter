up-data ud u:
	@echo "Running up-data"
	docker compose -f compose_data.yml up -d

down-data dd d:
	@echo "Running down-data"
	docker compose -f compose_data.yml down

restart r: d u

prisma-migrate:
	@echo "Running prisma migrate"
	bunx prisma migrate dev --name migrate

prisma-generate:
	@echo "Running prisma generate"
	bunx prisma generate

migrate: prisma-migrate prisma-generate
