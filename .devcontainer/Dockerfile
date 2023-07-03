FROM mcr.microsoft.com/devcontainers/base:ubuntu@sha256:3cb26c96497bfc785273ed8f2aa6983a68f26138dbf119b4444421d434037700
RUN curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
RUN apt update -y && apt install -y curl jq git unzip build-essential tar apt-transport-https

# Add external package keys

RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list

# Add more
RUN apt-get update -y && apt-get -y install helm

# Install Kubectl
RUN  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl

# Install ctlptl
ENV CTLPTL_VERSION="0.8.20"
RUN curl -fsSL https://github.com/tilt-dev/ctlptl/releases/download/v$CTLPTL_VERSION/ctlptl.$CTLPTL_VERSION.linux.x86_64.tar.gz | tar -xzv -C /usr/local/bin ctlptl

# Install kind
RUN curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
RUN chmod +x ./kind
RUN mv ./kind /usr/local/bin/kind

# Install Tilt
RUN curl -fsSL https://github.com/tilt-dev/tilt/releases/download/v0.32.4/tilt.0.32.4.linux.x86_64.tar.gz | tar -xzv tilt && \
  sudo mv tilt /usr/local/bin/tilt

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash