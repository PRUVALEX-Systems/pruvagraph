"""Tests for pruvagraph.prewarm."""
from __future__ import annotations

from pruvagraph.prewarm import predict_queries


def test_predict_queries_includes_basics() -> None:
    queries = predict_queries("auth.py")
    assert any("auth" in q for q in queries)


def test_predict_queries_auth_stems() -> None:
    queries = predict_queries("src/authentication/login.py")
    assert "how does authentication work?" in queries


def test_predict_queries_test_file() -> None:
    queries = predict_queries("test_user_service.py")
    assert queries[0] == "what does user_service do?"
