FROM mcr.microsoft.com/devcontainers/base:ubuntu
RUN apt update -y && apt install -y curl jq git unzip build-essential tar

# Install Kubectl
RUN  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Install Tilt
RUN curl -fsSL https://github.com/tilt-dev/tilt/releases/download/v0.32.4/tilt.0.32.4.linux.x86_64.tar.gz | tar -xzv tilt && \
  sudo mv tilt /usr/local/bin/tilt

USER vscode

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash


