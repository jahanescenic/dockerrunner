# This Dockerfile contains all neccessary components and services needed to
# run automatic test cases successfully.

FROM ubuntu:18.04
USER root

RUN if [ -n "${APT_MIRROR}" ] ; then sed -i /'^deb '/s,'deb [^:]*:[^ ]* ',"deb ${APT_MIRROR} ", /etc/apt/sources.list ; fi && \
    if [ -n "${APT_PROXY}" ] ; then echo 'Acquire::http { Proxy "'"${APT_PROXY}"'"; }' > /etc/apt/apt.conf.d/proxy ; fi && \
    DEBIAN_FRONTEND=noninteractive apt-get update && \
  	DEBIAN_FRONTEND=noninteractive apt-get install --yes \
        curl \
        gnupg \
        git \
        libgconf-2-4

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
    echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    if [ -z "$CHROME_PACKAGE" ] ; then \
      CHROME_PACKAGE=google-chrome-stable ; \
    fi && \
    DEBIAN_FRONTEND=noninteractive apt-get update && \
  	DEBIAN_FRONTEND=noninteractive apt-get install --yes \
        ${CHROME_PACKAGE}

# Install NodeJs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && \
        DEBIAN_FRONTEND=noninteractive apt-get update && \
  	DEBIAN_FRONTEND=noninteractive apt-get install --yes \
        nodejs

WORKDIR /opt
# Clone the public repository for automated todo test
RUN git clone https://github.com/jahanescenic/todo.git 

WORKDIR /opt/todo

# Install the required modules
RUN npm ci

# get existing chromedriver version
RUN EXISTING_CD_VERSION=$(./node_modules/chromedriver/bin/chromedriver -version | cut -f 1-3 -d . | cut -d ' ' -f 2) && \
    CHROME_VERSION=$(google-chrome --version | cut -f 1-3 -d . | cut -d ' ' -f 3) && \
    if [ "$EXISTING_CD_VERSION" = "$CHROME_VERSION" ]; then \
        echo "ChromeDriver version matches the Google Chrome version" ; \
    else \
        NEW_CD_VERSION=$(curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION | cut -f 1 -d .) && \
        npm install --save-dev chromedriver@$NEW_CD_VERSION ; \
    fi && \
    cp node_modules/chromedriver/lib/chromedriver/chromedriver node_modules/selenium-cucumber-js/node_modules/chromedriver/lib/chromedriver/

COPY bin/chromeDriver.js /opt/todo/node_modules/selenium-cucumber-js/runtime/
COPY bin/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Start Services
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
CMD npm run test
