#!/usr/bin/env bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
exec node "$(dirname "$0")/../node_modules/next/dist/bin/next" dev --port 3000
