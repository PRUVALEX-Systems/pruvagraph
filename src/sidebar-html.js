// @ts-check
'use strict';
/**
 * @module sidebar-html
 * Returns the full HTML string for the PruvaGraph sidebar webview.
 * Pure function — no side effects, no VS Code API calls beyond URI joining.
 *
 * Depends on: utils (getNonce only)
 */

const { getNonce } = require('./utils');

/**
 * Build the sidebar HTML with embedded CSS and JS for the PruvaGraph panel.
 * @param {import('vscode').Webview} webview
 * @param {import('vscode').Uri}     extensionUri
 * @returns {string}
 */
function getWebviewHtml(webview, extensionUri) {
  const nonce = getNonce();
  const csp   = webview.cspSource;

  // NOTE: The nonce in the <script> tag below MUST use literal string
  // concatenation (not a template expression inside the HTML string)
  // because the outer template literal already uses ${nonce} for the CSP header.

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; style-src ${csp} 'unsafe-inline'; script-src 'nonce-${nonce}';">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PruvaGraph</title>
<style>
/* ═══════════════════════════════════════════════════════
   PRUVALEX PruvaGraph — Premium Sidebar UI
   Brand-red design system, glassmorphism, micro-animations
   ═══════════════════════════════════════════════════════ */

:root {
  /* VS Code integration */
  --vsc-bg:      var(--vscode-sideBar-background, #0D1117);
  --vsc-surface: var(--vscode-editor-background, #161B22);
  --vsc-border:  var(--vscode-widget-border, #30363D);
  --vsc-text:    var(--vscode-foreground, #E6EDF3);
  --vsc-muted:   var(--vscode-descriptionForeground, #7D8590);
  --vsc-link:    var(--vscode-textLink-foreground, #58A6FF);
  --vsc-font:    var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);

  /* PRUVALEX Brand — Red System */
  --brand:       #E53E3E;
  --brand-deep:  #C53030;
  --brand-light: #FC8181;
  --brand-glow:  rgba(229, 62, 62, 0.18);
  --brand-glow2: rgba(229, 62, 62, 0.08);

  /* Semantic Colors */
  --green:       #3FB950;
  --green-glow:  rgba(63, 185, 80, 0.15);
  --amber:       #D29922;
  --amber-glow:  rgba(210, 153, 34, 0.15);
  --cyan:        #39C5CF;
  --blue:        #58A6FF;
  --red-alert:   #F85149;

  /* Surface Layers */
  --bg:          var(--vsc-bg);
  --surface:     var(--vsc-surface);
  --raised:      color-mix(in srgb, var(--vsc-surface) 60%, var(--vsc-bg));
  --border:      var(--vsc-border);
  --border-hover:#484F58;
  --text:        var(--vsc-text);
  --muted:       var(--vsc-muted);
  --link:        var(--vsc-link);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--vsc-font);
  font-size: 12px;
  padding: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Entrance animation ──────────────────────────────── */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-red {
  0%, 100% { box-shadow: 0 0 0 0 var(--brand-glow); }
  50%       { box-shadow: 0 0 0 4px var(--brand-glow); }
}
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 var(--green-glow); }
  50%       { box-shadow: 0 0 0 4px var(--green-glow); }
}
@keyframes pulse-amber {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes progress-sweep {
  0%   { left: -40%; width: 40%; }
  60%  { left: 60%;  width: 40%; }
  100% { left: 110%; width: 10%; }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Header ──────────────────────────────────────────── */
.header {
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, color-mix(in srgb, var(--brand) 4%, var(--bg)) 0%, var(--bg) 100%);
  animation: fadeSlideIn 0.3s ease;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}
.logo-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(229,62,62,0.4));
  transition: filter 0.2s;
}
.logo-icon:hover { filter: drop-shadow(0 0 7px rgba(229,62,62,0.65)); }
.logo-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.2px;
  line-height: 1;
}
.logo-name span {
  color: var(--brand);
}
.logo-badge {
  font-size: 9px;
  font-weight: 700;
  background: var(--brand-glow);
  color: var(--brand-light);
  border: 1px solid rgba(229,62,62,0.3);
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  margin-left: auto;
  text-transform: uppercase;
}
.subtitle {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.4;
  padding-left: 30px;
}

/* ── Tabs ────────────────────────────────────────────── */
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  position: sticky;
  top: 0;
  z-index: 10;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 9px 4px;
  cursor: pointer;
  color: var(--muted);
  font-weight: 600;
  font-size: 11px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}
.tab:hover { color: var(--text); }
.tab.active {
  color: var(--brand);
  border-bottom-color: var(--brand);
}
.tab-content { display: none; padding-bottom: 24px; }
.tab-content.active {
  display: block;
  animation: fadeSlideIn 0.2s ease;
}

/* ── Status Card ─────────────────────────────────────── */
.status-card {
  margin: 10px 10px 6px;
  padding: 11px 13px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.status-card:hover { border-color: var(--border-hover); }
.status-row-basic {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}
.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.3s, box-shadow 0.3s;
}
.status-dot.empty { background: var(--muted); opacity: 0.5; }
.status-dot.built {
  background: var(--green);
  animation: pulse-green 2.5s ease-in-out infinite;
}
.status-dot.watch {
  background: var(--amber);
  animation: pulse-amber 1.6s ease-in-out infinite;
}
.status-label-basic {
  font-weight: 600;
  font-size: 12px;
  flex: 1;
  color: var(--text);
}
.status-meta {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

/* ── Progress Bar ────────────────────────────────────── */
.progress-bar {
  height: 2px;
  background: var(--border);
  margin: 0 10px 4px;
  border-radius: 2px;
  overflow: hidden;
  display: none;
  position: relative;
}
.progress-bar.active { display: block; }
.progress-bar.active::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  background: linear-gradient(90deg, transparent, var(--brand), transparent);
  animation: progress-sweep 1.6s ease-in-out infinite;
}

/* ── Section Title ───────────────────────────────────── */
.section-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.9px;
  padding: 10px 14px 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.section-title::before {
  content: '';
  display: inline-block;
  width: 2px;
  height: 10px;
  background: var(--brand);
  border-radius: 1px;
  flex-shrink: 0;
}

/* ── Buttons ─────────────────────────────────────────── */
.btn-group {
  margin: 4px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 11px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--vsc-font);
  width: 100%;
  text-align: left;
  transition: border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s;
  position: relative;
  overflow: hidden;
}
.btn:hover {
  border-color: var(--border-hover);
  background: rgba(230,237,243,0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
.btn:active { transform: translateY(0); box-shadow: none; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

/* Primary — Brand Red */
.btn.primary {
  background: linear-gradient(135deg, var(--brand), var(--brand-deep));
  border-color: var(--brand-deep);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 0 0 0 var(--brand-glow);
}
.btn.primary:hover {
  background: linear-gradient(135deg, #F05252, var(--brand));
  border-color: var(--brand);
  box-shadow: 0 2px 12px var(--brand-glow), 0 0 0 0 transparent;
  transform: translateY(-1px);
}

/* Danger */
.btn.danger { border-color: rgba(248,81,73,0.4); color: var(--red-alert); }
.btn.danger:hover {
  background: rgba(248,81,73,0.08);
  border-color: var(--red-alert);
}

/* Active / Watch */
.btn.active { border-color: rgba(210,153,34,0.5); color: var(--amber); }
.btn.active .icon-svg { opacity: 1; color: var(--amber); }
.btn.active:hover {
  background: rgba(210,153,34,0.08);
  border-color: var(--amber);
}

/* Ghost accent hover */
.btn:not(.primary):not(.danger):not(.active):hover {
  border-color: rgba(229,62,62,0.35);
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-label { flex: 1; line-height: 1; }
.btn-shortcut {
  font-size: 9px;
  opacity: 0.55;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.btn-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.btn-badge.red   { background: var(--brand-glow); color: var(--brand-light); border: 1px solid rgba(229,62,62,0.3); }
.btn-badge.green { background: var(--green-glow); color: var(--green); border: 1px solid rgba(63,185,80,0.3); }
.btn-badge.cyan  { background: rgba(57,197,207,0.12); color: var(--cyan); border: 1px solid rgba(57,197,207,0.3); }
.btn-badge.amber { background: var(--amber-glow); color: var(--amber); border: 1px solid rgba(210,153,34,0.3); }
.btn-badge.free  { background: var(--green-glow); color: var(--green); border: 1px solid rgba(63,185,80,0.3); }

/* Accessibility: focus indicators (WCAG 2.1 AA) */
.btn:focus-visible, .tab:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: 6px;
}
*:focus { outline: none; }

/* ── Metric Cards (Cost Tab) ─────────────────────────── */
.metric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 10px;
}
.metric-card {
  border-radius: 10px;
  padding: 13px 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
  border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: default;
}
.metric-card:hover {
  border-color: rgba(229,62,62,0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.metric-label {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 9px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}
.metric-value {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 7px;
  letter-spacing: -0.5px;
}
.metric-value.savings {
  background: linear-gradient(135deg, #3FB950, #56D364);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.metric-value.tokens {
  background: linear-gradient(135deg, #D29922, #F0B429);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.metric-value.hits {
  background: linear-gradient(135deg, var(--brand), var(--brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.metric-value.baseline { color: var(--muted); font-size: 18px; }
.metric-secondary { font-size: 10px; color: var(--muted); line-height: 1.4; }

/* ── Premium Stats Card ──────────────────────────────── */
.premium-card {
  border-radius: 10px;
  padding: 14px;
  margin: 2px 10px 10px;
  background: linear-gradient(135deg, rgba(229,62,62,0.06), rgba(229,62,62,0.02));
  border: 1px solid rgba(229,62,62,0.15);
}
.premium-card h3 {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.premium-card h3::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 12px;
  background: linear-gradient(180deg, var(--brand), var(--brand-deep));
  border-radius: 2px;
  flex-shrink: 0;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.stat-row:last-child { border-bottom: none; }
.stat-label { font-size: 12px; color: rgba(255,255,255,0.65); }
.stat-value { font-weight: 700; font-size: 12px; color: var(--text); }

/* ── Log & Query Boxes ───────────────────────────────── */
.section-title-inline {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.8px;
  padding: 8px 14px 3px;
  display: none;
}
.log-box {
  margin: 0 10px 8px;
  padding: 10px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  font-family: var(--vscode-editor-font-family, 'Cascadia Code', 'Fira Code', monospace);
  font-size: 10.5px;
  color: var(--muted);
  display: none;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.log-box.visible { display: block; }
.log-line { line-height: 1.6; white-space: pre-wrap; word-break: break-all; }
.log-line.ok   { color: var(--green); }
.log-line.warn { color: var(--amber); }
.log-line.err  { color: var(--red-alert); }

.query-box {
  margin: 0 10px 8px;
  padding: 10px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  max-height: 220px;
  overflow-y: auto;
  font-size: 11px;
  line-height: 1.65;
  display: none;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.query-box.visible { display: block; }

/* ── Divider ─────────────────────────────────────────── */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 8px 10px;
  opacity: 0.6;
}

/* ── ContextLens Placeholder ─────────────────────────── */
.context-lens-box {
  margin: 12px 10px;
  padding: 20px 16px;
  border: 1px dashed rgba(229,62,62,0.25);
  border-radius: 10px;
  text-align: center;
  color: var(--muted);
  background: var(--brand-glow2);
}
.context-lens-box h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}
.context-lens-icon {
  width: 18px; height: 18px;
  color: var(--brand);
}
.context-lens-box p {
  font-size: 11px;
  line-height: 1.6;
  margin-bottom: 14px;
  color: var(--muted);
}

/* ── Footer ──────────────────────────────────────────── */
.footer {
  padding: 8px 14px 10px;
  color: var(--muted);
  font-size: 10px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}
.footer a {
  color: var(--link);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}
.footer a:hover { color: var(--brand-light); }
.footer-dot { opacity: 0.4; }

/* ── SVG Icons (inline CSS-drawn) ───────────────────── */
.icon-svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  opacity: 0.75;
  transition: opacity 0.15s;
}
.btn:hover .icon-svg { opacity: 1; }
.btn.primary .icon-svg { opacity: 0.9; }
</style>
</head>
<body>

<!-- ══ Header ══════════════════════════════════════════ -->
<div class="header">
  <div class="logo">
    <!-- PRUVALEX "P" Hexagon Logo — matching brand icon.png -->
    <svg class="logo-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 2 L40 11.5 L40 32.5 L22 42 L4 32.5 L4 11.5 Z"
            fill="#C53030" stroke="#E53E3E" stroke-width="0.5"/>
      <path d="M22 2 L40 11.5 L40 32.5 L22 42 L4 32.5 L4 11.5 Z"
            fill="url(#hex-grad)"/>
      <defs>
        <linearGradient id="hex-grad" x1="4" y1="2" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#E53E3E"/>
          <stop offset="100%" stop-color="#9B2C2C"/>
        </linearGradient>
      </defs>
      <!-- "P" letterform -->
      <text x="14" y="30" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
            font-size="22" font-weight="800" fill="white" letter-spacing="-1">P</text>
      <!-- "+" accent mark -->
      <rect x="29" y="27" width="5" height="1.5" fill="white" opacity="0.85" rx="0.75"/>
      <rect x="30.75" y="25.25" width="1.5" height="5" fill="white" opacity="0.85" rx="0.75"/>
    </svg>
    <div class="logo-name">Pruva<span>Graph</span></div>
    <span class="logo-badge">FREE</span>
  </div>
  <div class="subtitle">by PRUVALEX · AI Cost Optimizer · No server needed</div>
</div>

<!-- ══ Tabs ════════════════════════════════════════════ -->
<div class="tabs" role="tablist" aria-label="PruvaGraph panels">
  <div class="tab active" role="tab" tabindex="0" data-tab="explorer"
       aria-selected="true" aria-controls="tab-explorer" id="tab-btn-explorer"
      >Explorer</div>
  <div class="tab" role="tab" tabindex="-1" data-tab="context"
       aria-selected="false" aria-controls="tab-context" id="tab-btn-context"
      >Context</div>
  <div class="tab" role="tab" tabindex="-1" data-tab="cost"
       aria-selected="false" aria-controls="tab-cost" id="tab-btn-cost"
      >Costs</div>
</div>

<!-- ══ Progress Bar ════════════════════════════════════ -->
<div class="progress-bar" id="progressBar"></div>

<!-- ══════════════════════════════════════════════════════
     TAB 1: EXPLORER
     ══════════════════════════════════════════════════════ -->
<div id="tab-explorer" class="tab-content active" role="tabpanel" aria-labelledby="tab-btn-explorer">

  <!-- Status Card -->
  <div class="status-card" id="statusCard" role="status" aria-live="polite" aria-label="Graph build status">
    <div class="status-row-basic">
      <div class="status-dot empty" id="statusDot" aria-hidden="true"></div>
      <div class="status-label-basic" id="statusLabel">No graph built yet</div>
    </div>
    <div class="status-meta" id="statusMeta">Run "Build Graph" to analyse your codebase</div>
  </div>

  <!-- Primary Actions -->
  <div class="btn-group">
    <button class="btn primary" aria-label="Build Graph (Ctrl+Shift+G)" id="btn-build">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M7.5 1.5a.5.5 0 0 1 .894-.316l5 6a.5.5 0 0 1-.394.816H10v5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V8H3a.5.5 0 0 1-.394-.816l5-6z"/>
      </svg>
      <span class="btn-label">Build Graph</span>
      <span class="btn-shortcut" aria-hidden="true">Ctrl+Shift+G</span>
    </button>
    <button class="btn" aria-label="Build Fast using LSP" id="btn-buildFast">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM6 5.75l4.5 2.25L6 10.25V5.75z"/>
      </svg>
      <span class="btn-label">Build Fast (LSP)</span>
      <span class="btn-badge green" aria-hidden="true">N3</span>
    </button>
    <button class="btn" aria-label="Query Codebase (Ctrl+Shift+/)" id="btn-query">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M6.5 1a5.5 5.5 0 0 1 4.383 8.823l3.647 3.647a.75.75 0 0 1-1.06 1.06l-3.647-3.647A5.5 5.5 0 1 1 6.5 1zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
      </svg>
      <span class="btn-label">Query Codebase</span>
      <span class="btn-shortcut" aria-hidden="true">Ctrl+Shift+/</span>
    </button>
    <button class="btn" aria-label="Open Graph Visualizer in browser" id="btn-openViz">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M3 3.5A.5.5 0 0 1 3.5 3h9a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9zM2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9zM6 7.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 7.25z"/>
      </svg>
      <span class="btn-label">Open Graph Visualizer</span>
    </button>
  </div>

  <hr class="divider" role="separator">

  <!-- Secondary Actions -->
  <div class="btn-group">
    <button class="btn" aria-label="Install MCP server for Claude Code and Cursor" id="btn-installMCP">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-3.5a.75.75 0 0 1 .75.75v3.25h1.5a.75.75 0 0 1 0 1.5h-2.25A.75.75 0 0 1 7.25 9.25V5.25A.75.75 0 0 1 8 4.5z"/>
      </svg>
      <span class="btn-label">Install MCP (Claude / Cursor)</span>
    </button>
    <button class="btn" id="watchBtn" aria-label="Toggle Watch Mode" aria-pressed="false">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 3C4.5 3 1.5 5.5 1.5 8S4.5 13 8 13s6.5-2.5 6.5-5S11.5 3 8 3zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
      <span class="btn-label">Enable Watch Mode</span>
    </button>
    <button class="btn" aria-label="Dry Run to estimate savings (free)" id="btn-dryRun">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M5 2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2.5a.5.5 0 0 1 0 1H13v9.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V4H2.5a.5.5 0 0 1 0-1H5V2zM6 2v1h4V2H6zm-1 3v8h6V5H5z"/>
      </svg>
      <span class="btn-label">Dry Run — Estimate Savings</span>
      <span class="btn-badge free" aria-label="Free feature">FREE</span>
    </button>
  </div>

  <hr class="divider" role="separator">

  <!-- Diff & Impact -->
  <div class="section-title" role="heading" aria-level="3">Diff &amp; Impact</div>
  <div class="btn-group">
    <button class="btn" aria-label="Show Graph Diff between builds" id="btn-showDiff">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M5 1a1 1 0 0 0-1 1v3H1.5a.5.5 0 0 0 0 1H4v4H1.5a.5.5 0 0 0 0 1H4v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3h2.5a.5.5 0 0 0 0-1H12V6h2.5a.5.5 0 0 0 0-1H12V2a1 1 0 0 0-1-1H5zm0 1h6v12H5V2z"/>
      </svg>
      <span class="btn-label">Show Graph Diff</span>
      <span class="btn-badge cyan" aria-hidden="true">D1</span>
    </button>
    <button class="btn" aria-label="Analyze Change Impact on dependent modules" id="btn-analyzeImpact">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.5a.75.75 0 0 1 1.5 0v3.75a.75.75 0 0 1-1.5 0V4.5zm.75 7.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
      <span class="btn-label">Analyze Change Impact</span>
      <span class="btn-badge amber" aria-hidden="true">D2</span>
    </button>
    <button class="btn" aria-label="Build Monorepo Graph across all packages" id="btn-buildMonorepo">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M1.5 2A1.5 1.5 0 0 1 3 .5h10A1.5 1.5 0 0 1 14.5 2v12A1.5 1.5 0 0 1 13 15.5H3A1.5 1.5 0 0 1 1.5 14V2zM3 2v12h10V2H3zm2 2h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 3h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 3h4a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
      </svg>
      <span class="btn-label">Build Monorepo Graph</span>
      <span class="btn-badge green" aria-hidden="true">M1</span>
    </button>
  </div>

  <hr class="divider" role="separator">

  <!-- Setup -->
  <div class="section-title" role="heading" aria-level="3">Setup</div>
  <div class="btn-group">
    <button class="btn" aria-label="Install Python package via pip" id="btn-installPkg">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M7.47 1.04a.5.5 0 0 1 1.06 0l.33 2.3a4.5 4.5 0 0 1 2.78 1.14l2.16-.87a.5.5 0 0 1 .64.72l-1.2 2.03a4.5 4.5 0 0 1 .49 3.07l2.05 1.16a.5.5 0 0 1-.25.93H13a4.5 4.5 0 0 1-2.28 2.15l.33 2.3a.5.5 0 0 1-1.06 0l-.33-2.3A4.5 4.5 0 0 1 7 13.1l-2.15.87a.5.5 0 0 1-.64-.72l1.2-2.03a4.5 4.5 0 0 1-.49-3.07L2.88 7a.5.5 0 0 1 .25-.93H5a4.5 4.5 0 0 1 2.28-2.14L7 1.04zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
      </svg>
      <span class="btn-label">Install Python Package</span>
      <span class="btn-shortcut" aria-hidden="true">pip install pruvagraph</span>
    </button>
  </div>

  <hr class="divider" role="separator">

  <!-- Query / Log Output -->
  <div class="section-title-inline" id="queryTitle" role="heading" aria-level="3">Query Result</div>
  <div class="query-box" id="queryBox" aria-live="polite" aria-label="Query result output"></div>
  <div class="section-title-inline" id="logTitle" role="heading" aria-level="3">Output</div>
  <div class="log-box" id="logBox" aria-live="polite" aria-label="Build log output"></div>

  <hr class="divider" role="separator">
  <div class="btn-group">
    <button class="btn danger" aria-label="Clear graph cache" id="btn-clearCache">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5zM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.058l-.5-8.5a.5.5 0 1 0-.998.058zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528zM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5z"/>
      </svg>
      <span class="btn-label">Clear Cache</span>
    </button>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     TAB 2: CONTEXT LENS
     ══════════════════════════════════════════════════════ -->
<div id="tab-context" class="tab-content" role="tabpanel" aria-labelledby="tab-btn-context">
  <div class="context-lens-box">
    <h3>
      <svg class="context-lens-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M6.5 1a5.5 5.5 0 0 1 4.383 8.823l3.647 3.647a.75.75 0 0 1-1.06 1.06l-3.647-3.647A5.5 5.5 0 1 1 6.5 1zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
      </svg>
      ContextLens
    </h3>
    <p>Inline symbol relationships and semantic hints appear here when you select code in the editor.</p>
    <button class="btn primary" style="display:inline-flex; width:auto; margin: 0 auto;"
            aria-label="Analyze selected code for impact" id="btn-analyzeSelected">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.5a.75.75 0 0 1 1.5 0v3.75a.75.75 0 0 1-1.5 0V4.5zm.75 7.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
      Analyze Selected Code
    </button>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     TAB 3: COST DASHBOARD
     ══════════════════════════════════════════════════════ -->
<div id="tab-cost" class="tab-content" role="tabpanel" aria-labelledby="tab-btn-cost">
  <div class="metric-grid" role="list" aria-label="Cost metrics">
    <div class="metric-card" role="listitem">
      <div class="metric-label" id="lbl-savings">Estimated Savings</div>
      <p class="metric-value savings" aria-labelledby="lbl-savings">$<span id="savings">0.00</span></p>
      <div class="metric-secondary">vs. baseline cost</div>
    </div>
    <div class="metric-card" role="listitem">
      <div class="metric-label" id="lbl-tokens">Tokens Saved</div>
      <p class="metric-value tokens" aria-labelledby="lbl-tokens"><span id="tokensSaved">0</span></p>
      <div class="metric-secondary">total reduction</div>
    </div>
    <div class="metric-card" role="listitem">
      <div class="metric-label" id="lbl-cache">Cache Hits</div>
      <p class="metric-value hits" aria-labelledby="lbl-cache"><span id="cacheHits">0</span></p>
      <div class="metric-secondary"><span id="cacheRate">0</span>% compression</div>
    </div>
    <div class="metric-card" role="listitem">
      <div class="metric-label" id="lbl-baseline">Baseline Cost</div>
      <p class="metric-value baseline" aria-labelledby="lbl-baseline">$<span id="dedupProjected">0.00</span></p>
      <div class="metric-secondary">without PruvaGraph</div>
    </div>
  </div>

  <div class="premium-card" role="region" aria-label="Token usage breakdown">
    <h3>Token Usage Breakdown</h3>
    <div class="stat-row">
      <span class="stat-label" id="lbl-tokensIn">Total Input Tokens</span>
      <span class="stat-value" aria-labelledby="lbl-tokensIn"><span id="tokensIn">0</span></span>
    </div>
    <div class="stat-row">
      <span class="stat-label" id="lbl-tokensOut">Total Output Tokens</span>
      <span class="stat-value" aria-labelledby="lbl-tokensOut"><span id="tokensOut">0</span></span>
    </div>
    <div class="stat-row">
      <span class="stat-label" id="lbl-apiAvoided">API Calls Avoided</span>
      <span class="stat-value" aria-labelledby="lbl-apiAvoided"><span id="apiAvoided">0</span> calls</span>
    </div>
  </div>

  <div class="btn-group">
    <button class="btn" aria-label="Refresh cost metrics" id="btn-refreshSavings">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9zm4.966-7a7 7 0 0 0-6.94 6.01.75.75 0 1 0 1.49.17A5.5 5.5 0 0 1 5.5 2.5a.75.75 0 0 0 0-1.5zm5.034 13a7 7 0 0 0 6.94-6.01.75.75 0 0 0-1.49-.17 5.5 5.5 0 0 1-5.45 5.68.75.75 0 1 0 0 1.5z"/>
      </svg>
      <span class="btn-label">Refresh Metrics</span>
    </button>
    <button class="btn" aria-label="View raw JSON cost report" id="btn-costReport">
      <svg class="icon-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M5 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.414a1 1 0 0 0-.293-.707L9.293 1.293A1 1 0 0 0 8.586 1H5zm0 1h3.586L11 4.414V14H5V2zm1 4h4v1H6V6zm0 2h4v1H6V8zm0 2h3v1H6v-1z"/>
      </svg>
      <span class="btn-label">View Raw JSON Report</span>
    </button>
  </div>
</div>

<!-- ══ Footer ══════════════════════════════════════════ -->
<div class="footer">
  <span>by <a id="link-pruvalex" tabindex="0"
>PRUVALEX</a></span>
  <span class="footer-dot">·</span>
  <a id="link-github" tabindex="0"
>GitHub</a>
  <span class="footer-dot">·</span>
  <span>v1.9.0</span>
</div>

<script nonce="${nonce}">
const vscode = acquireVsCodeApi();

function send(command, extra = {}) {
  vscode.postMessage({ command, ...extra });
}

const TAB_ORDER = ['explorer', 'context', 'cost'];

const attachTab = (id, tabName) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', () => switchTab(tabName));
    el.addEventListener('keydown', (e) => handleTabKey(e, tabName));
  }
};
attachTab('tab-btn-explorer', 'explorer');
attachTab('tab-btn-context', 'context');
attachTab('tab-btn-cost', 'cost');

const attachBtn = (id, command) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => send(command));
};
attachBtn('btn-build', 'build');
attachBtn('btn-buildFast', 'buildFast');
attachBtn('btn-query', 'query');
attachBtn('btn-openViz', 'openViz');
attachBtn('btn-installMCP', 'installMCP');
attachBtn('watchBtn', 'watchToggle');
attachBtn('btn-dryRun', 'dryRun');
attachBtn('btn-showDiff', 'showDiff');
attachBtn('btn-analyzeImpact', 'analyzeImpact');
attachBtn('btn-buildMonorepo', 'buildMonorepo');
attachBtn('btn-installPkg', 'installPkg');
attachBtn('btn-clearCache', 'clearCache');
attachBtn('btn-analyzeSelected', 'analyzeImpact');
attachBtn('btn-refreshSavings', 'refreshSavings');
attachBtn('btn-costReport', 'costReport');

const attachLink = (id, url) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', () => send('openExternal', { url }));
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') send('openExternal', { url }); });
  }
};
attachLink('link-pruvalex', 'https://pruvalex.eu');
attachLink('link-github', 'https://github.com/pruvalex/pruvagraph');


function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => {
    const isActive = t.getAttribute('data-tab') === tabId;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    t.setAttribute('tabindex', isActive ? '0' : '-1');
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const activeContent = document.getElementById('tab-' + tabId);
  if (activeContent) activeContent.classList.add('active');
}

function handleTabKey(event, tabId) {
  const idx = TAB_ORDER.indexOf(tabId);
  let next = -1;
  if (event.key === 'ArrowRight') next = (idx + 1) % TAB_ORDER.length;
  else if (event.key === 'ArrowLeft') next = (idx - 1 + TAB_ORDER.length) % TAB_ORDER.length;
  else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); switchTab(tabId); return; }
  if (next >= 0) {
    event.preventDefault();
    const nextBtn = document.getElementById('tab-btn-' + TAB_ORDER[next]);
    if (nextBtn) { switchTab(TAB_ORDER[next]); nextBtn.focus(); }
  }
}

let building = false;
let queryLines = [];
let logLines = [];

window.addEventListener('message', (event) => {
  const msg = event.data;
  switch (msg.command) {
    case 'status':      return onStatus(msg);
    case 'buildStart':  return onBuildStart(msg);
    case 'buildLog':    return onBuildLog(msg);
    case 'queryStart':  return onQueryStart(msg);
    case 'queryResult': return onQueryResult(msg);
    case 'costReport':  return onCostReport(msg);
    case 'savingsData': return onSavingsData(msg);
    case 'logLine':     return onLogLine(msg);
    case 'watchStatus': return onWatchStatus(msg);
    case 'diffLoaded':  return onDiffLoaded(msg);
    case 'error':       return onError(msg);
  }
});

function onStatus(msg) {
  const dot = document.getElementById('statusDot');
  const lbl = document.getElementById('statusLabel');
  const meta = document.getElementById('statusMeta');
  if (msg.watchMode) dot.className = 'status-dot watch';
  else if (msg.graphBuilt) dot.className = 'status-dot built';
  else dot.className = 'status-dot empty';

  if (msg.graphBuilt) {
    lbl.textContent = 'Graph ready';
    const folder = msg.root ? msg.root.split(/[\\\/]/).pop() : '';
    const counts = (msg.nodeCount || msg.edgeCount) ? ' · ' + (msg.nodeCount||0) + ' nodes · ' + (msg.edgeCount||0) + ' edges' : '';
    meta.textContent = folder + counts;
  } else {
    lbl.textContent = 'No graph built yet';
    meta.textContent = 'Run "Build Graph" to analyse your codebase';
  }

  const watchBtn = document.getElementById('watchBtn');
  if (msg.watchMode) {
    watchBtn.className = 'btn active';
    watchBtn.querySelector('.btn-label').textContent = 'Disable Watch Mode';
    watchBtn.setAttribute('aria-pressed', 'true');
    watchBtn.setAttribute('aria-label', 'Disable Watch Mode');
  } else {
    watchBtn.className = 'btn';
    watchBtn.querySelector('.btn-label').textContent = 'Enable Watch Mode';
    watchBtn.setAttribute('aria-pressed', 'false');
    watchBtn.setAttribute('aria-label', 'Enable Watch Mode');
  }
}

function onBuildStart(msg) {
  building = true; logLines = [];
  switchTab('explorer');
  const lt = document.getElementById('logTitle');
  lt.style.display = 'flex'; lt.textContent = 'Output';
  const lb = document.getElementById('logBox');
  lb.innerHTML = ''; lb.classList.add('visible');
  document.getElementById('progressBar').classList.add('active');
  // Disable build buttons during build
  const buildBtn = document.getElementById('btn-build');
  const fastBtn  = document.getElementById('btn-buildFast');
  if (buildBtn) buildBtn.disabled = true;
  if (fastBtn)  fastBtn.disabled  = true;
  appendLog('Building graph\u2026', 'ok');
}

function onBuildLog(msg) {
  appendLog(msg.line);
  const line = msg.line || '';
  if (line.includes('\u2713') || line.includes('Graph:') || line.includes('complete') ||
      line.includes('Error') || line.includes('error') || line.includes('exited with code')) {
    document.getElementById('progressBar').classList.remove('active');
    building = false;
    // Re-enable build buttons
    const buildBtn = document.getElementById('btn-build');
    const fastBtn  = document.getElementById('btn-buildFast');
    if (buildBtn) buildBtn.disabled = false;
    if (fastBtn)  fastBtn.disabled  = false;
  }
}

function onQueryStart(msg) {
  queryLines = [];
  switchTab('explorer');
  const qt = document.getElementById('queryTitle');
  qt.style.display = 'flex'; qt.textContent = 'Query Result';
  const qb = document.getElementById('queryBox');
  qb.innerHTML = ''; qb.classList.add('visible');
  appendQuery('\uD83D\uDD0D ' + msg.question);
  appendQuery('');
}

function onQueryResult(msg) { appendQuery(msg.line); }

function onCostReport(msg) {
  switchTab('explorer');
  const qt = document.getElementById('queryTitle');
  qt.style.display = 'flex'; qt.textContent = 'Raw Cost Report';
  const qb = document.getElementById('queryBox');
  qb.innerHTML = '<pre style="white-space:pre-wrap;font-size:10px;font-family:monospace">' + escHtml(msg.text) + '</pre>';
  qb.classList.add('visible');
}

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
}

function onSavingsData(msg) {
  const data = msg.data;
  if (!data) return;
  const safeNum = (v, digits = 2) => (typeof v === 'number' && isFinite(v)) ? v.toFixed(digits) : '0.' + '0'.repeat(digits);
  document.getElementById('savings').textContent = safeNum(data.costSavedUsd);
  document.getElementById('tokensSaved').textContent = formatNumber(data.tokensSaved || 0);
  document.getElementById('cacheHits').textContent = formatNumber(data.cacheHits || 0);
  document.getElementById('cacheRate').textContent = data.compressionPct != null ? data.compressionPct : 0;
  document.getElementById('dedupProjected').textContent = safeNum(data.naiveCostUsd);
  document.getElementById('tokensIn').textContent = formatNumber(data.totalInputTokens || 0);
  document.getElementById('tokensOut').textContent = formatNumber(data.totalOutputTokens || 0);
  document.getElementById('apiAvoided').textContent = formatNumber(data.apiCallsAvoided || 0);
}

function onLogLine(msg) {
  const lt = document.getElementById('logTitle');
  lt.style.display = 'flex';
  document.getElementById('logBox').classList.add('visible');
  appendLog(msg.line);
}

function onWatchStatus(msg) {
  const dot = document.getElementById('statusDot');
  const watchBtn = document.getElementById('watchBtn');
  if (msg.active) {
    dot.className = 'status-dot watch';
    watchBtn.className = 'btn active';
    watchBtn.querySelector('.btn-label').textContent = 'Disable Watch Mode';
    watchBtn.setAttribute('aria-pressed', 'true');
    watchBtn.setAttribute('aria-label', 'Disable Watch Mode');
  } else {
    const lbl = document.getElementById('statusLabel');
    dot.className = (lbl && lbl.textContent === 'Graph ready') ? 'status-dot built' : 'status-dot empty';
    watchBtn.className = 'btn';
    watchBtn.querySelector('.btn-label').textContent = 'Enable Watch Mode';
    watchBtn.setAttribute('aria-pressed', 'false');
    watchBtn.setAttribute('aria-label', 'Enable Watch Mode');
  }
}

function onDiffLoaded(msg) {
  const lt = document.getElementById('logTitle');
  lt.style.display = 'flex'; lt.textContent = 'Graph Diff';
  document.getElementById('logBox').classList.add('visible');
  appendLog('\uD83D\uDCCA ' + (msg.summary || 'No changes'), 'ok');
  if (msg.added)   appendLog('  \u2795 ' + msg.added   + ' added',   'ok');
  if (msg.removed) appendLog('  \u2796 ' + msg.removed + ' removed', 'err');
  if (msg.changed) appendLog('  \u270F\uFE0F ' + msg.changed + ' changed', 'warn');
}

function onError(msg) {
  const lt = document.getElementById('logTitle');
  lt.style.display = 'flex';
  document.getElementById('logBox').classList.add('visible');
  appendLog('\u26A0 ' + msg.message, 'err');
  appendLog('Install: pip install pruvagraph', 'warn');
  document.getElementById('progressBar').classList.remove('active');
}

function appendLog(text, cls = '') {
  const lb = document.getElementById('logBox');
  const line = document.createElement('div');
  line.className = 'log-line ' + cls;
  line.textContent = text;
  lb.appendChild(line);
  lb.scrollTop = lb.scrollHeight;
}

function appendQuery(text) {
  const qb = document.getElementById('queryBox');
  const line = document.createElement('div');
  line.style.cssText = 'margin-bottom:4px';
  line.textContent = text;
  qb.appendChild(line);
  qb.scrollTop = qb.scrollHeight;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

send('ready');
</script>
</body>
</html>`;
}

module.exports = { getWebviewHtml };
