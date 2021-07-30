#!/bin/bash

START_DIR="${START_DIR:-/home/coder/session}"

PREFIX="deploy-code-server"

mkdir -p $START_DIR

# function to clone the git repo or add a user's first file if no repo was specified.
project_init () {
    [ -z "${GIT_REPO}" ] && echo "[$PREFIX] No GIT_REPO specified" && echo "Example file. Have questions? Join us at https://community.coder.com" > $START_DIR/coder.txt || git clone $GIT_REPO $START_DIR
    if [ -f "${START_DIR}/package.json" ]; then
        cd $START_DIR
        npm install
    fi
}

# start the project
project_init

echo "[$PREFIX] Starting code-server..."
# Now we can run code-server with the default entrypoint
set -eu

# We do this first to ensure sudo works below when renaming the user.
# Otherwise the current container UID may not exist in the passwd database.
eval "$(fixuid -q)"

if [ "${DOCKER_USER-}" ]; then
  USER="$DOCKER_USER"
  if [ "$DOCKER_USER" != "$(whoami)" ]; then
    echo "$DOCKER_USER ALL=(ALL) NOPASSWD:ALL" | sudo tee -a /etc/sudoers.d/nopasswd > /dev/null
    # Unfortunately we cannot change $HOME as we cannot move any bind mounts
    # nor can we bind mount $HOME into a new home as that requires a privileged container.
    sudo usermod --login "$DOCKER_USER" coder
    sudo groupmod -n "$DOCKER_USER" coder

    sudo sed -i "/coder/d" /etc/sudoers.d/nopasswd
  fi
fi

if [[ -z "${FIREBASE_REF}" ]]; then
    echo $FIREBASE_REF >> /home/coder/.config/code-server/config.yaml
fi


# Any additional params to pass
ADD_PARAMS=""
if [[ -z "${ADD_PARAMS}" ]]; then
    ADD_PARAMS="${ADD_PARAMS}"
fi

dumb-init /usr/bin/code-server --bind-addr 0.0.0.0:8080 $ADD_PARAMS $START_DIR