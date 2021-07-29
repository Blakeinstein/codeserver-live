FROM codercom/code-server:3.10.2

USER coder

# Apply VS Code settings
COPY configs/settings.json .local/share/code-server/User/settings.json
COPY configs/config.yaml /home/coder/.config/code-server/config.yaml

# Use bash shell
ENV SHELL=/bin/bash

# Install unzip + rclone (support for remote filesystem)
RUN sudo apt-get update && sudo apt-get install unzip -y

# Fix permissions for code-server
RUN sudo chown -R coder:coder /home/coder/.local

# Install VS Code extensions:
RUN code-server --install-extension philfontaine.autolaunch
RUN code-server --install-extension seunlanlege.action-buttons

# Install apt packages:
RUN sudo curl -fsSL https://deb.nodesource.com/setup_14.x | sudo bash -
RUN sudo apt-get install -y nodejs

# Use our custom entrypoint script first
COPY scripts/entrypoint.sh /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]