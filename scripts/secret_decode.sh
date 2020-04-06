#!/usr/bin/env bash

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
CONFIG_DIR="$SCRIPT_DIR/../config"

if [[ -z "${AUTH_CONFIG}" ]]; then
  echo "No firebase config found..."
else
  rm -rf "$CONFIG_DIR"
  mkdir "$CONFIG_DIR"
  echo "Firebase config found, decoding configuration..."
  echo "${AUTH_CONFIG}" | base64 --decode >"$CONFIG_DIR/spawn-platform.json"
fi