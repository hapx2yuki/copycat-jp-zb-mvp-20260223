#!/usr/bin/env bash
set -euo pipefail

RUN_MANIFEST="${1:?run_manifest is required}"
RUN_DIR="${2:?run_dir is required}"
REPO_DIR="${3:-.}"

python3 scripts/pipeline_entry.py \
  --run-manifest "$RUN_MANIFEST" \
  --run-dir "$RUN_DIR" \
  --repo-dir "$REPO_DIR"
