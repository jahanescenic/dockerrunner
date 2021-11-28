FROM ubuntu:latest
USER root

# Install neccessary packages
RUN if [ -n "${APT_MIRROR}" ] ; then sed -i /'^deb '/s,'deb [^:]*:[^ ]* ',"deb ${APT_MIRROR} ", /etc/apt/sources.list ; fi && \
    if [ -n "${APT_PROXY}" ] ; then echo 'Acquire::http { Proxy "'"${APT_PROXY}"'"; }' > /etc/apt/apt.conf.d/proxy ; fi && \
    DEBIAN_FRONTEND=noninteractive apt-get update && \
  	DEBIAN_FRONTEND=noninteractive apt-get install --yes \
        curl \
        gnupg \
        git \
        libgconf-2-4

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && \
        DEBIAN_FRONTEND=noninteractive apt-get update && \
  	DEBIAN_FRONTEND=noninteractive apt-get install --yes \
        nodejs

WORKDIR /opt
RUN git clone https://github.com/jahanescenic/todo_api.git 

WORKDIR /opt/todo_api

# Install the required modules
RUN npm ci  
RUN npm install newman-reporter-html

COPY bin/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Start Services
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
CMD npm run test


