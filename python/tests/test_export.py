"""Tests for pruvagraph.export."""
from __future__ import annotations

import json
from pathlib import Path

from pruvagraph.export import export_format, export_graph


def test_export_graph_writes_json_and_html(tmp_path: Path, sample_graph) -> None:
    graph_json, html_path = export_graph(sample_graph, tmp_path, no_viz=False)

    assert graph_json.exists()
    assert html_path is not None
    assert html_path.exists()
    data = json.loads(graph_json.read_text(encoding="utf-8"))
    assert "nodes" in data
    assert len(data["nodes"]) == sample_graph.number_of_nodes()


def test_export_format_graphml_and_cypher(tmp_path: Path, sample_graph) -> None:
    graph_json, _ = export_graph(sample_graph, tmp_path, no_viz=True)

    graphml = export_format(graph_json, "graphml")
    cypher = export_format(graph_json, "cypher")

    assert graphml.exists()
    assert cypher.exists()
    assert "MERGE" in cypher.read_text(encoding="utf-8")
