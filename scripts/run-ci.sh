#!/usr/bin/env bash
set -euo pipefail

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

echo "Triggering CI for branch: $BRANCH ($REPO)"

gh workflow run ci.yml \
  --repo "$REPO" \
  --ref "$BRANCH"

echo "Workflow dispatched. Watching run..."
sleep 3

gh run list \
  --repo "$REPO" \
  --workflow ci.yml \
  --branch "$BRANCH" \
  --limit 1
