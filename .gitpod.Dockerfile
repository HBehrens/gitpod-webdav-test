FROM gitpod/workspace-full

USER root

# dependency for puppeteer
RUN apt-get update \
 && apt-get install -y libnss3 libatk1.0-0

USER gitpod
