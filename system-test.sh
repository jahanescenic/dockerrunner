#!/bin/bash

if [ -d "./reports/system-test-report" ]; then
	echo "Cucumber report found, deleting "reports/system-test-report" directory"
	rm -rf reports/system-test-report
fi
docker-compose run --rm \
  -u $UID \
  system

