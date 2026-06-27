# PruvaGraph — Codebase Knowledge Graph

This project uses **PRUVALEX PruvaGraph** to maintain a pre-built knowledge graph
(`pruvagraph-out/graph.json`). This graph encodes the full structure of the codebase
at a fraction of the token cost of reading raw files.

---

## MANDATORY: Use Graph Tools Before Reading Files

> **Before opening any source file, reading any directory listing, or using `grep`
> for any question about codebase structure, call one of the MCP tools below.**
>
> The graph already contains: imports, dependencies, callers, community clusters,
> type signatures, and architectural summaries — fully offline, no API cost.
>
> **Reading raw files when the graph has the answer wastes 5×–71× more tokens.**

| If you want to know… | Use this tool FIRST |
|---|---|
| How module X connects to Y | `query_graph "how does X connect to Y?"` |
| What a class/function does | `get_summary "ClassName"` |
| What file A imports | `get_dependencies "path/to/file.py"` |
| Who calls function F | `find_callers "function_name"` |
| Architectural overview | `list_communities` |
| What changed structurally | `get_graph_diff` |
| What breaks if X changes | `analyze_impact "SymbolName"` |
| Monorepo packages | `list_packages` |
| Cost savings so far | `cost_report` |

Only open a raw file if:
1. The graph tool returns "not found" for the specific symbol, OR
2. You need to edit the file (structure info still comes from graph first), OR
3. The question is about the content of a specific function body (not its connections).

---

## Rebuild the Graph

```bash
pruvagraph .            # Full rebuild
pruvagraph . --update   # Incremental (changed files only)
pruvagraph . --dry-run  # Estimate cost first
pruvagraph . --force    # Force full rebuild, ignore cache
```

## Output Files

- `pruvagraph-out/graph.json`       — Full knowledge graph (MCP server reads this)
- `pruvagraph-out/graph.html`       — Interactive visualiser (open in browser)
- `pruvagraph-out/GRAPH_REPORT.md`  — Architectural summary + god nodes
- `pruvagraph-out/cost_report.json` — Cost analytics + query benchmarks

<!-- pruvagraph:preinjection:start -->
## Auto-Injected Context (PruvaGraph Arch5 — regenerated on every build, do not edit by hand)

_Graph: **1,742 nodes · 2,346 edges · 108 architectural communities**.  Top 133 highest-connectivity nodes + one representative per community below — loads at session start, no tool call needed._

### Landmarks (highest-connectivity nodes)

- **__future__** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/__init__.py` (external, degree 80) — External package: __future__ [git: 7 commits, has bug fixes, recently changed]
- **pathlib** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/ast_diff.py` (external, degree 69) — External package: pathlib [git: 1 commits, recently changed]
- **json** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/.github/workflows/ci.yml` (external, degree 50) — External package: json | sig: (): Promise<unknown> [git: 8 commits, has bug fixes, recently changed]
- **test_privacy_adversarial** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_privacy_adversarial.py` (module, degree 38) — python module: test_privacy_adversarial [git: 2 commits, recently changed]
- **cli** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/cli.py` (module, degree 37) — python module: cli [git: 15 commits, has bug fixes, recently changed]
- **mcp_server** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/mcp_server.py` (module, degree 37) — python module: mcp_server [git: 8 commits, has bug fixes, recently changed]
- **test_mcp_server** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_mcp_server.py` (module, degree 37) — python module: test_mcp_server [git: 1 commits, recently changed]
- **driftguard.bench** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/benchmarks/driftguard.bench.ts` (module, degree 30) — typescript module: driftguard.bench [git: 1 commits, recently changed]
- **typing** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/analyze.py` (external, degree 30) — External package: typing [git: 1 commits, has bug fixes, recently changed]
- **extension** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/extension/src/extension.ts` (module, degree 28) — typescript module: extension [git: 1 commits, recently changed]
- **pipeline** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/pipeline.py` (module, degree 26 ⚑ high-risk) — python module: pipeline [git: 17 commits, has bug fixes, recently changed]
- **commands** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/src/commands.js` (module, degree 26) — javascript module: commands [git: 1 commits, recently changed]
- **sidebar-html** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/src/sidebar-html.js` (module, degree 26) — javascript module: sidebar-html [git: 1 commits, recently changed]
- **monorepo** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/monorepo.py` (module, degree 25) — python module: monorepo [git: 3 commits, has bug fixes, recently changed]
- **costReportRepository** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/extension/src/costReportRepository.ts` (module, degree 22) — typescript module: costReportRepository [git: 1 commits, recently changed]
- **query** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/query.py` (module, degree 22) — python module: query | sig: (source: string): Query [git: 8 commits, has bug fixes, recently changed]
- **ghostmemory.bench** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/benchmarks/ghostmemory.bench.ts` (module, degree 21) — typescript module: ghostmemory.bench [git: 1 commits, recently changed]
- **networkx** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/analyze.py` (external, degree 21) — External package: networkx [git: 1 commits, has bug fixes, recently changed]
- **installer** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/installer.py` (module, degree 21) — python module: installer [git: 7 commits, has bug fixes, recently changed]
- **README** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\legacy\PruvaGraph\extension-standalone\README.md` (doc, degree 21 ⚑ high-risk) — ﻿Bilkul! Yeh ek complete step-by-step guide hai — har phase ke liye exactly kya karna hai, kaise karna hai, aur agar kuch kaam na kare toh kya check karein. [git: 23 commits, has bug fixes, recently changed]
- **README** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\legacy\PruvaGraph\extension\README.md` (doc, degree 21 ⚑ high-risk) — ﻿Bilkul! Yeh ek complete step-by-step guide hai — har phase ke liye exactly kya karna hai, kaise karna hai, aur agar kuch kaam na kare toh kya check karein. [git: 23 commits, has bug fixes, recently changed]
- **re** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/ast_diff.py` (external, degree 20) — External package: re [git: 1 commits, recently changed]
- **compress** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/compress.py` (module, degree 20) — python module: compress [git: 2 commits, has bug fixes, recently changed]
- **[1.9.0] — 2026-06-21** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\CHANGELOG.md` (concept, degree 20) — Section: [1.9.0] — 2026-06-21 [git: 9 commits, has bug fixes, recently changed]
- **path** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/PruvaGraph/omnimcp/scripts/assert-perf-contracts.js` (external, degree 19) — External package: path [git: 1 commits, recently changed]
- **vscode** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/extension-savings-receipt.js` (external, degree 19) — External package: vscode [git: 1 commits, recently changed]
- **test_monorepo** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_monorepo.py` (module, degree 19) — python module: test_monorepo [git: 1 commits, recently changed]
- **task_weaver** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/task_weaver.py` (module, degree 18) — python module: task_weaver [git: 1 commits, recently changed]
- **test_pipeline_core** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_pipeline_core.py` (module, degree 18) — python module: test_pipeline_core [git: 1 commits, recently changed]
- **deterministic_router** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/deterministic_router.py` (module, degree 17) — python module: deterministic_router [git: 1 commits, recently changed]
- **docstring_extractor** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/docstring_extractor.py` (module, degree 17) — python module: docstring_extractor [git: 1 commits, recently changed]
- **pytest** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/conftest.py` (external, degree 17) — External package: pytest [git: 2 commits, recently changed]
- **costDashboardProvider** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/extension/src/costDashboardProvider.ts` (module, degree 16) — typescript module: costDashboardProvider [git: 1 commits, recently changed]
- **config_parser** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/config_parser.py` (module, degree 16) — python module: config_parser [git: 1 commits, recently changed]
- **llm_extract** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/llm_extract.py` (module, degree 16) — python module: llm_extract [git: 3 commits, has bug fixes, recently changed]
- **activation.bench** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/legacy/PruvaGraph/benchmarks/activation.bench.ts` (module, degree 15) — typescript module: activation.bench [git: 1 commits, recently changed]
- **dedup** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/dedup.py` (module, degree 15) — python module: dedup [git: 2 commits, has bug fixes, recently changed]
- **schema_parser** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/schema_parser.py` (module, degree 15) — python module: schema_parser [git: 1 commits, recently changed]
- **click** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/cli.py` (external, degree 14) — External package: click [git: 15 commits, has bug fixes, recently changed]
- **test_context_lens** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_context_lens.py` (module, degree 14) — python module: test_context_lens [git: 1 commits, recently changed]
- **test_impact_analyzer** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_impact_analyzer.py` (module, degree 14) — python module: test_impact_analyzer [git: 1 commits, recently changed]
- **hooks** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/hooks.py` (module, degree 13) — python module: hooks [git: 3 commits, has bug fixes, recently changed]
- **free_doc_parser** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/free_doc_parser.py` (module, degree 12) — python module: free_doc_parser [git: 1 commits, recently changed]
- **importance_scorer** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/importance_scorer.py` (module, degree 12) — python module: importance_scorer [git: 1 commits, recently changed]
- **test_dead_layers** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_dead_layers.py` (module, degree 12) — python module: test_dead_layers [git: 1 commits, has bug fixes, recently changed]
- **bug_report** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\.github\ISSUE_TEMPLATE\bug_report.md` (doc, degree 12) — ﻿--- name: Bug Report about: Something is broken or behaving unexpectedly title: "[BUG] " labels: ["bug", "needs-triage"] assignees: "" --- [git: 1 commits, recently changed]
- **PRUVALEX PruvaGraph — Project Status Report** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\PROJECT_STATUS.md` (concept, degree 12) — Section: PRUVALEX PruvaGraph — Project Status Report [git: 1 commits, recently changed]
- **Initialize as a workspace package** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\legacy\PruvaGraph\docs\module-development-guide.md` (concept, degree 12) — Section: Initialize as a workspace package [git: 1 commits, recently changed]
- **embedder** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/embedder.py` (module, degree 11) — python module: embedder [git: 2 commits, recently changed]
- **test_driftguard** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/tests/test_driftguard.py` (module, degree 11) — python module: test_driftguard [git: 1 commits, recently changed]
- **BENCHMARKS** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\BENCHMARKS.md` (doc, degree 11) — **Last Updated:** 2026-06-21 | **Version:** 1.9.0 [git: 2 commits, recently changed]
- **Clean Commit Graph Setup for PruvaGraph** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\CLEAN_COMMIT_GRAPH_SETUP.md` (concept, degree 11) — Section: Clean Commit Graph Setup for PruvaGraph [git: 1 commits, recently changed]
- **CONTRIBUTING** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\CONTRIBUTING.md` (doc, degree 11) — ﻿# Contributing to PRUVALEX PruvaGraph [git: 2 commits, recently changed]
- **json** (external, degree 11) — Programming language: json | sig: (): Promise<unknown>
- **2.2 Active Workspace Packages** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\PROJECT_STATUS_COMPLETE.md` (concept, degree 11) — Section: 2.2 Active Workspace Packages [git: 1 commits, recently changed]
- **STEP 6 — Final Validation Report** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\STEP_6_FINAL_VALIDATION.md` (concept, degree 11) — Section: STEP 6 — Final Validation Report [git: 1 commits, recently changed]
- **PUBLISHING** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\legacy\PruvaGraph\PUBLISHING.md` (doc, degree 11) — ﻿# PRUVALEX PruvaGraph — VS Code Marketplace Publishing Guide [git: 1 commits, recently changed]
- **batch** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/batch.py` (module, degree 10) — python module: batch [git: 4 commits, has bug fixes, recently changed]
- **subgraph** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/subgraph.py` (module, degree 10) — python module: subgraph [git: 4 commits, has bug fixes, recently changed]
- **📋 Deployment Steps** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\DEPLOYMENT_CHECKLIST.md` (concept, degree 10) — Section: 📋 Deployment Steps [git: 1 commits, recently changed]
- **→ pruvagraph-out/benchmark_results.jsonl** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\README.md` (concept, degree 10 ⚑ high-risk) — Section: → pruvagraph-out/benchmark_results.jsonl [git: 23 commits, has bug fixes, recently changed]
- **enterprise-compliance-brief** `C:\Users\affan\Downloads\PRUVALEX Graph optimise LLM cost tool\legacy\PruvaGraph\docs\enterprise-compliance-brief.md` (doc, degree 10) — ﻿# PRUVALEX Enterprise [git: 1 commits, recently changed]
- **detect** `C:/Users/affan/Downloads/PRUVALEX Graph optimise LLM cost tool/python/pruvagraph/detect.py` (module, degree 9) — python module: detect [git: 1 commits, has bug fixes, recently changed]

<!-- pruvagraph:preinjection:end -->
