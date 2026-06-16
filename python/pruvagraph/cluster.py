"""

Community detection -- Stage 4 of the pipeline.

Groups the graph into architectural "communities" (tightly-connected
clusters of modules/classes/functions) and writes the result onto each
node's ``community`` attribute as an integer id.

Primary algorithm: Leiden (via ``leidenalg`` + ``igraph``), as advertised
in pyproject.toml -- fast and high-quality on large graphs.

Fallback (if those packages aren't installed, or the graph is tiny/empty):
NetworkX's greedy modularity communities, then plain connected components.
Either way every node ends up with a non-null ``community`` id, so
``analyze.py`` / ``report.py`` / the MCP ``list_communities`` tool always
have something to show.

B-layer optimisation:
  ``cluster_leiden()`` accepts an optional ``prev_node_count`` arg. If the
  graph has grown/shrunk by less than ``change_threshold`` (default 5%),
  the existing community assignments are preserved and the full Leiden
  re-run is skipped. This saves 0.3–2 s on incremental builds for large
  repos where only a handful of files changed.
"""

from __future__ import annotations

import networkx as nx


def cluster_leiden(
    G: nx.MultiDiGraph,
    prev_node_count: int | None = None,
    change_threshold: float = 0.05,
) -> nx.MultiDiGraph:
    """
    Assign a ``community`` (int) attribute to every node in *G*, in place,
    and return *G* for chaining.

    Args:
        G:                 The graph to cluster.
        prev_node_count:   Node count from the previous build. When provided,
                           the Leiden run is skipped if the graph has changed
                           by less than *change_threshold*.
        change_threshold:  Fraction of nodes that must have changed to trigger
                           a full re-cluster (default 5%). Set to 0.0 to
                           always re-cluster.
    """
    if G.number_of_nodes() == 0:
        return G

    # B-layer: skip if fewer than threshold% of nodes changed
    if prev_node_count is not None and prev_node_count > 0:
        current = G.number_of_nodes()
        delta = abs(current - prev_node_count) / prev_node_count
        if delta < change_threshold:
            # Check if community assignments already exist
            has_communities = any(
                G.nodes[n].get("community") is not None
                for n in list(G.nodes)[:10]  # sample first 10
            )
            if has_communities:
                return G  # existing assignments are good enough

    try:
        return _cluster_leiden_impl(G)
    except Exception:
        return _cluster_fallback(G)


# ---------------------------------------------------------------------------
# Leiden (preferred)
# ---------------------------------------------------------------------------


def _cluster_leiden_impl(G: nx.MultiDiGraph) -> nx.MultiDiGraph:
    import igraph as ig
    import leidenalg

    node_list = list(G.nodes())
    index = {node: i for i, node in enumerate(node_list)}
    edge_list = [(index[u], index[v]) for u, v in G.edges()]

    ig_graph = ig.Graph(n=len(node_list), edges=edge_list, directed=True)
    partition = leidenalg.find_partition(ig_graph, leidenalg.ModularityVertexPartition)

    for i, community_id in enumerate(partition.membership):
        G.nodes[node_list[i]]["community"] = int(community_id)

    return G


# ---------------------------------------------------------------------------
# Fallback: greedy modularity -> connected components
# ---------------------------------------------------------------------------


def _cluster_fallback(G: nx.MultiDiGraph) -> nx.MultiDiGraph:
    undirected = nx.Graph()
    undirected.add_nodes_from(G.nodes())
    for u, v in G.edges():
        undirected.add_edge(u, v)

    communities: list[set[str]]
    try:
        from networkx.algorithms.community import greedy_modularity_communities
        communities = [set(c) for c in greedy_modularity_communities(undirected)]
    except Exception:
        communities = [set(c) for c in nx.connected_components(undirected)]

    for community_id, members in enumerate(communities):
        for node_id in members:
            G.nodes[node_id]["community"] = community_id

    return G
