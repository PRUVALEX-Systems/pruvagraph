"""Tests for pruvagraph.detect."""
from __future__ import annotations

from pathlib import Path

from pruvagraph.detect import FileType, classify, collect_files


def test_classify_code_and_docs() -> None:
    assert classify(Path("main.py")) == FileType.CODE
    assert classify(Path("README.md")) == FileType.DOCUMENT
    assert classify(Path("paper.pdf")) == FileType.PAPER
    assert classify(Path("logo.png")) == FileType.IMAGE
    assert classify(Path("archive.zip")) == FileType.OTHER


def test_collect_files_skips_excluded_dirs(tmp_path: Path) -> None:
    (tmp_path / "app.py").write_text("print('hi')\n", encoding="utf-8")
    (tmp_path / "notes.md").write_text("# Notes\n", encoding="utf-8")
    node_modules = tmp_path / "node_modules"
    node_modules.mkdir()
    (node_modules / "ignored.js").write_text("export {}\n", encoding="utf-8")

    found = collect_files(tmp_path)
    paths = {p.name for p, _ in found}

    assert "app.py" in paths
    assert "notes.md" in paths
    assert "ignored.js" not in paths
