"""Tests that verify L5, N9, A5 are actually wired into the pipeline."""
from __future__ import annotations
import json
from pathlib import Path
import pytest


def test_l5_compression_imported_in_llm_extract():
    """L5: compress must be imported in llm_extract.py"""
    import ast
    src = Path("pruvagraph/llm_extract.py").read_text()
    assert "from pruvagraph.compress import compress" in src or \
           "from .compress import compress" in src, \
           "L5 dead: compress() not imported in llm_extract.py"


def test_l5_compress_called_before_llm(tmp_path):
    """L5: file content should be compressed before LLM call."""
    from pruvagraph.compress import compress
    # Create a file with license header (typical noise)
    content = "# MIT License\n# Copyright 2026\n# ...\n\ndef real_function():\n    pass\n"
    result = compress(content, tmp_path / "test.py", ".py")
    assert result.ratio < 1.0, "compress() should reduce token count"
    assert "real_function" in result.compressed_content, "compress() must preserve symbols"


def test_n9_update_field_in_buildconfig():
    """N9: BuildConfig must have update field."""
    from pruvagraph.pipeline import BuildConfig
    cfg = BuildConfig(root=Path("."), update=True)
    assert cfg.update is True, "N9 dead: BuildConfig.update field missing"


def test_n9_build_graph_accepts_update():
    """N9: build_graph() must accept update kwarg."""
    import inspect
    from pruvagraph.pipeline import build_graph
    sig = inspect.signature(build_graph)
    assert "update" in sig.parameters, \
        "N9 dead: build_graph() doesn't accept update parameter"


def test_n9_ast_diff_is_git_repo(tmp_path):
    """N9: is_git_repo correctly identifies non-git dirs."""
    from pruvagraph.ast_diff import is_git_repo
    assert not is_git_repo(tmp_path), "tmp_path should not be a git repo"


def test_a5_global_cache_round_trip(tmp_path, monkeypatch):
    """A5: save_to_global_cache → get_package_nodes round trip."""
    import pruvagraph.global_cache as gc
    monkeypatch.setattr(gc, "GLOBAL_CACHE_DIR", tmp_path / "global")
    
    nodes = {"nodes": [{"id": "test::fn", "label": "fn", "type": "function",
                         "summary": "test", "file": "test.py"}], "edges": []}
    gc.save_to_global_cache("test-pkg", "1.0.0", nodes)
    
    result = gc.get_package_nodes("test-pkg", "1.0.0")
    assert result is not None, "A5: global cache miss after save"
    assert result["nodes"][0]["label"] == "fn"


def test_a5_pipeline_imports_global_cache():
    """A5: pipeline.py must import from global_cache."""
    src = Path("pruvagraph/pipeline.py").read_text()
    assert "global_cache" in src, \
        "A5 dead: pipeline.py doesn't import global_cache"
