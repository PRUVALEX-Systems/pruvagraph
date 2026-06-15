# Contributing to PruvaGraph

Thank you for helping improve PruvaGraph. This guide covers local setup, testing, and where to make changes.

## Prerequisites

- Python 3.11, 3.12, or 3.13
- Node.js 20+ (for VS Code extension packaging only)
- Git

## Local setup

```bash
git clone https://github.com/PRUVALEX-Systems/pruvagraph
cd pruvagraph/python
pip install -e ".[dev,graph]"
```

On Windows, if `pruvagraph` is not on PATH after install, run via:

```bash
python -m pruvagraph.cli .
```

## Running tests

```bash
cd python
python -m pytest tests/ -v
python -m ruff check pruvagraph/ --select F,I
```

## Building a graph locally

```bash
# From repo root — zero LLM cost for code-only rebuild
cd python
python -m pruvagraph.cli .. --backend none --no-viz

# Dry run (estimate cost, no API calls)
python -m pruvagraph.cli .. --dry-run --no-viz
```

Outputs land in `pruvagraph-out/` at the project root.

## VS Code extension

```bash
npm install -g @vscode/vsce
vsce package --no-dependencies
```

Load the generated `.vsix` in VS Code or Cursor via **Extensions → Install from VSIX**.

## Where to contribute

| Area | Location |
|------|----------|
| Language extractors | `python/pruvagraph/extract.py` |
| Semantic dedup | `python/pruvagraph/dedup.py` |
| LLM backends | `python/pruvagraph/llm_extract.py`, `python/pruvagraph/router.py` |
| Cost tracking | `python/pruvagraph/cost.py` |
| Query engine | `python/pruvagraph/query.py`, `deterministic_router.py` |
| MCP server | `python/pruvagraph/mcp_server.py` |
| VS Code UI | `extension.js`, `package.json` |
| CI | `.github/workflows/ci.yml` |

## Pull request checklist

1. Tests pass: `python -m pytest tests/ -v`
2. Lint passes: `ruff check pruvagraph/ --select F,I`
3. Focused diff — one feature or fix per PR
4. Update `CHANGELOG.md` for user-visible changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
