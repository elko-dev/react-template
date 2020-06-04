#!/usr/bin/env bash

set -euo pipefail

# The postinstall does not seem to be firing when in batect container
npm ci && npm run postinstall && npm test