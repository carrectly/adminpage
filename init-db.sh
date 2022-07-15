#!/bin/sh
echo "########### Setting up Postgres DB ###########"
#pg_restore -U postgres -d adminpage -v "/mnt/disk/dockerentrypoint.initdb.d/dump-latest.dump" 
cat ./dump-latest.dump  | docker exec -i adminpage_postgres_1 pg_restore --verbose --clean --no-acl --no-owner -d adminpage -U postgres
exit 