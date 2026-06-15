"""Shared fixtures for PruvaGraph tests."""
from __future__ import annotations

import networkx as nx
import pytest


@pytest.fixture
def sample_extractions() -> list[dict]:
    return [
        {
            "source_file": "auth.py",
            "nodes": [
                {
                    "id": "auth:login",
                    "label": "login",
                    "type": "function",
                    "file": "auth.py",
                    "summary": "Authenticate a user.",
                },
            ],
            "edges": [
                {"source": "auth:login", "target": "external:bcrypt", "relation": "imports"},
            ],
        },
        {
            "source_file": "db.py",
            "nodes": [
                {
                    "id": "db:connect",
                    "label": "connect",
                    "type": "function",
                    "file": "db.py",
                    "summary": "Open a database connection.",
                },
            ],
            "edges": [
                {"source": "auth:login", "target": "db:connect", "relation": "calls"},
            ],
        },
    ]


@pytest.fixture
def sample_graph(sample_extractions) -> nx.MultiDiGraph:
    from pruvagraph.build import build_nx_graph

    return build_nx_graph(sample_extractions)
