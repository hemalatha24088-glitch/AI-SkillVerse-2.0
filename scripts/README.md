# /scripts — Utility & Generator Scripts

These are one-off developer scripts used to generate content and PDFs for the platform.
**Do not run these in production.** They are only needed when you want to regenerate content locally.

## Scripts Overview

| Script | Command | Description |
|---|---|---|
| `generate_pdfs.cjs` | `npm run generate:pdfs` | Generates rich, in-memory Python learning PDFs with code, explanations, and problems. The primary PDF generator. |
| `generate_pdfs.js` | `npm run generate:pdfs:basic` | A simpler, shell-command-based PDF generator. Use as a fallback. |
| `generate_cpp_deep.cjs` | `npm run generate:cpp` | Generates advanced C++ notes PDFs for the Notes section. |
| `add_pdf_links.cjs` | `npm run update:pdf-links` | Post-processes generated PDFs to add navigation links. Run after `generate:pdfs`. |
| `update_cpp_notes.cjs` | `npm run update:cpp` | Regenerates C++ notes data file (`src/data/cpp_notes.js`). |
| `update_primary_dsa.cjs` | `npm run update:dsa:primary` | Regenerates primary DSA notes data file. |
| `update_secondary_dsa.cjs` | `npm run update:dsa:secondary` | Regenerates secondary DSA notes data file. |
| `update_advanced_dsa.cjs` | `npm run update:dsa:advanced` | Regenerates advanced DSA notes data file. |
| `update_sql_notes.cjs` | `npm run update:sql` | Regenerates SQL notes data file. |
| `test_gemini.js` | *(not in npm scripts)* | Dev-only script used to test the AI API connection. Not for production use. |

## How to Run

All scripts are run from the **project root** using npm scripts:

```bash
# Regenerate Python PDFs (primary)
npm run generate:pdfs

# Regenerate all DSA data files
npm run update:dsa:primary
npm run update:dsa:secondary
npm run update:dsa:advanced
```

## Prerequisites

- `puppeteer` or `wkhtmltopdf` must be installed locally for PDF generation scripts to work.
- Run `npm install` from the project root before running any script.
