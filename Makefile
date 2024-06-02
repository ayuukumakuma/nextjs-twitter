# docker compose
up u:
	docker compose -f ./compose_data.yml up -d
down d:
	docker compose down
restart r: u d

# prisma migration
migrate m:
	bunx prisma migrate dev --name migration

# bun build
bun-build bb:
	bun run build
