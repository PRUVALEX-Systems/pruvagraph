"""Tests for pruvagraph.streaming."""
from __future__ import annotations

import json
from pathlib import Path

from pruvagraph.streaming import StreamStatus, get_build_status


def test_stream_status_writes_progress(tmp_path: Path) -> None:
    status = StreamStatus(tmp_path, files_total=10)
    status.update(5, "Halfway")
    status.complete()

    data = get_build_status(tmp_path)
    assert data["status"] == "complete"
    assert data["files_total"] == 10
    assert (tmp_path / "build_status.json").exists()
    payload = json.loads((tmp_path / "build_status.json").read_text(encoding="utf-8"))
    assert payload["percent"] == 100
