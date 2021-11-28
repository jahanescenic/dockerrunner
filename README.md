Docker Test Runner
=================

This repository is the driver to build and run docker images for the compilation of *System* and *API* tests

*Pre-requisites*: `docker` should be installed and running in your local machine.


Run System tests
================

The location of all system test feature files: https://github.com/jahanescenic/todo

You don't need to download the repository to run system test, it will be done inside the docker image.

From the repository root (where docker-compose.yml exists), Run following command to build the image:
```
docker-compose build system --no-cache
```

Finally, you're ready to run some tests.  

```
./system-test.sh
```
The above script is going to clear the reports directory and run system test container with the image created before.

Note that the `-u $UID` is strictly not necessary, but it makes it
easier to work with the resulting files created in the
*reports/* directory, as you become the owner of those files.

After the test run successfully, you will find *cucumber-report.html* inside *reports/system-test-report* directory. If not generated, something went wrong while running the container.

Run API tests
================

The location of api test package: https://github.com/jahanescenic/todo_api

You don't need to download the repository to run api test, it will be done inside the docker image.

From the repository root (where docker-compose.yml exists), Run following command to build the image:
```
docker-compose build api --no-cache
```

Finally, you're ready to run some tests.  

```
./api-test.sh
```
The above script is going to clear the reports directory and run api test container with the image created above.

Note that the `-u $UID` is strictly not necessary, but it makes it
easier to work with the resulting files created in the
*reports/* directory, as you become the owner of those files.

After the test run successfully, you will find html reports inside *reports/api-test-report* directory. If not generated, something went wrong while running the container.

Limitations
==============================
There are multiple limitations of this docker test runs.

- Viewing the test in real time is not possible right now. It Could be possible with display server and vncviewer.
- The chromedriver setup is not generic. It needs to be more optimized and sturdy.