"""Tests for pruvagraph.dedup."""
from __future__ import annotations

from pathlib import Path

from pruvagraph.dedup import deduplicate


def test_deduplicate_groups_near_identical_files(tmp_path: Path) -> None:
    base = "export function Card({ title }) { return <div>{title}</div>; }\n"
    f1 = tmp_path / "UserCard.tsx"
    f2 = tmp_path / "ProductCard.tsx"
    f3 = tmp_path / "unique.py"
    f1.write_text(base.replace("User", "User"), encoding="utf-8")
    f2.write_text(base.replace("User", "Product"), encoding="utf-8")
    f3.write_text("def totally_different_logic():\n    return 42\n", encoding="utf-8")

    result = deduplicate([f1, f2, f3], threshold=0.5)

    assert result.total_files == 3
    assert result.llm_calls_needed <= 2
    assert result.calls_saved >= 1
