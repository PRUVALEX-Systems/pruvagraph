"""Tests for pruvagraph.deterministic_router."""
from __future__ import annotations

from pruvagraph.deterministic_router import try_deterministic_answer


def test_find_callers(sample_graph) -> None:
    answer = try_deterministic_answer("who calls login?", sample_graph)
    assert answer is not None
    assert "login" in answer.lower()


def test_get_dependencies(sample_graph) -> None:
    answer = try_deterministic_answer("what does login depend on?", sample_graph)
    assert answer is not None
    assert "connect" in answer.lower() or "bcrypt" in answer.lower()


def test_god_nodes(sample_graph) -> None:
    answer = try_deterministic_answer("top god nodes", sample_graph)
    assert answer is not None
    assert "login" in answer.lower() or "connect" in answer.lower()
