#!/bin/sh
export DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/test
docker start test-postgres
bunx prisma db push
bun test tests
unset DATABASE_URL
docker stop test-postgres