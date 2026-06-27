"""pruvagraph __main__.py — enables `python -m pruvagraph` execution."""
import sys
# Ensure UTF-8 output on Windows to prevent UnicodeEncodeError
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from pruvagraph.cli import main

if __name__ == "__main__":
    main()
