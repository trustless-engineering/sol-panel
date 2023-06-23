FROM mcr.microsoft.com/devcontainers/base:ubuntu
RUN apt update -y && apt install -y curl jq git unzip build-essential tar

RUN curl -fsSL https://github.com/tilt-dev/tilt/releases/download/v0.32.4/tilt.0.32.4.linux.x86_64.tar.gz | tar -xzv tilt && \
  sudo mv tilt /usr/local/bin/tilt