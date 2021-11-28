#!/bin/bash

if [ -d "./reports/api-test-report" ]; then
	echo "Newman report found, deleting "reports/api-test-report" directory"
	rm -rf reports/api-test-report
fi
docker-compose run --rm \
  -u $UID \
  api
