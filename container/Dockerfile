FROM debian:10

RUN apt-get update \
 && apt-get install -y \
    curl \
    dumb-init \
    zsh \
    htop \
    locales \
    man \
    nano \
    git \
    procps \
    openssh-client \
    sudo \
    vim.tiny \
    lsb-release \
  && rm -rf /var/lib/apt/lists/*

# https://wiki.debian.org/Locale#Manually
RUN sed -i "s/# en_US.UTF-8/en_US.UTF-8/" /etc/locale.gen \
  && locale-gen
ENV LANG=en_US.UTF-8

RUN adduser --gecos '' --disabled-password coder && \
  echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/nopasswd

RUN ARCH="$(dpkg --print-architecture)" && \
    curl -fsSL "https://github.com/boxboat/fixuid/releases/download/v0.5/fixuid-0.5-linux-$ARCH.tar.gz" | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    printf "user: coder\ngroup: coder\n" > /etc/fixuid/config.yml

# COPY release-packages/code-server*.deb /tmp/

# RUN dpkg -i /tmp/code-server*$(dpkg --print-architecture).deb && rm /tmp/code-server*.deb

# Download vscode-live
RUN curl -L https://github.com/coderpair/vscode-live/releases/download/v1.1.0/vscode_live_1.1.0_amd64.deb > /tmp/codeserver.deb

RUN dpkg -i /tmp/codeserver.deb && rm /tmp/codeserver.deb

EXPOSE 8080
# This way, if someone sets $DOCKER_USER, docker-exec will still work as
# the uid will remain the same. note: only relevant if -u isn't passed to
# docker-run.
USER 1000
ENV USER=coder
WORKDIR /home/coder
USER coder

# Apply VS Code settings
COPY configs/settings.json .local/share/code-server/User/settings.json
COPY --chown=coder configs/config.yaml /home/coder/.config/code-server/config.yaml

# Use bash shell
ENV SHELL=/bin/bash

# Install unzip + rclone (support for remote filesystem)
RUN sudo apt-get update && sudo apt-get install unzip -y

# Fix permissions for code-server
RUN sudo chown -R coder:coder /home/coder/.local

# Install VS Code extensions:
RUN code-server --install-extension seunlanlege.action-buttons

# Install apt packages:
RUN sudo curl -fsSL https://deb.nodesource.com/setup_14.x | sudo bash -
RUN sudo apt-get install -y nodejs

# Use our custom entrypoint script first
COPY scripts/entrypoint.sh /usr/bin/entrypoint.sh
RUN sudo chown -R coder:coder /home/coder/.local
ENTRYPOINT ["/usr/bin/entrypoint.sh"]