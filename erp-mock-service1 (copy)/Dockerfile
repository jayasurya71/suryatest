# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
LABEL maintainer="Shameer<shameer@pando.in>"

# Update the repository
RUN apt-get update && apt-get install -y gnupg2 && apt-get install -y sudo && apt-get install -y curl

# Install necessary tools
RUN apt-get install -y nano vim wget dialog net-tools

# Install Node npm and yarn
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | sudo bash -
RUN apt-get install -f  --yes nodejs
RUN apt-get install -f  --yes build-essential
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" |  tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt-get install --yes yarn

#Installing Git
RUN apt-get install --yes git

#Install AWS cli
RUN apt-get install --yes python2.7
RUN curl -O https://bootstrap.pypa.io/get-pip.py
RUN python2.7 get-pip.py
RUN pip install awscli

#Creating app folder and coping files
RUN mkdir /root/nodejs-template-service/
COPY . /root/nodejs-template-service/
WORKDIR /root/nodejs-template-service/
RUN chmod +x pm2.sh

#Default Aruguments
ARG S3DEPLOY="deploy-staging"
ARG NODEENV="staging"

RUN echo "S3Deploy => $S3DEPLOY"
RUN echo "NODEENV => $NODEENV"

#Setting env
ENV NODE_ENV=$NODEENV

#Building Backend packages
RUN rm -rf yarn.lock
RUN make clean-all
RUN make bootstrap

#Expose ports
EXPOSE 1234

#Running background
CMD ["sh", "/root/nodejs-template-service/pm2.sh", "run"]
