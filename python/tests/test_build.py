"""Tests for pruvagraph.build."""
from __future__ import annotations

from pruvagraph.build import build_nx_graph


def test_build_nx_graph_merges_nodes_and_edges(sample_extractions) -> None:
    G = build_nx_graph(sample_extractions)

    assert G.number_of_nodes() == 3
    assert G.has_node("auth:login")
    assert G.has_node("db:connect")
    assert G.has_node("external:bcrypt")
    assert G.nodes["external:bcrypt"]["type"] == "external"
    assert G.has_edge("auth:login", "db:connect")
    assert G.has_edge("auth:login", "external:bcrypt")


def test_stub_node_for_missing_edge_target() -> None:
    extractions = [
        {
            "nodes": [{"id": "a:main", "label": "main", "type": "function"}],
            "edges": [{"source": "a:main", "target": "missing:pkg", "relation": "imports"}],
        }
    ]
    G = build_nx_graph(extractions)

    assert G.has_node("missing:pkg")
    assert G.nodes["missing:pkg"]["label"] == "missing:pkg"
    assert G.nodes["missing:pkg"]["type"] == "external"


def test_parallel_edges_deduped() -> None:
    extractions = [
        {
            "nodes": [
                {"id": "x", "label": "x", "type": "function"},
                {"id": "y", "label": "y", "type": "function"},
            ],
            "edges": [
                {"source": "x", "target": "y", "relation": "calls"},
                {"source": "x", "target": "y", "relation": "calls"},
            ],
        }
    ]
    G = build_nx_graph(extractions)
    assert G.number_of_edges() == 1
