"use strict";var ke=Object.defineProperty;var tt=(a,e,t)=>e in a?ke(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var s=(a,e)=>ke(a,"name",{value:e,configurable:!0});var L=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var j=(a,e,t)=>tt(a,typeof e!="symbol"?e+"":e,t);var $=L((ta,Be)=>{"use strict";var Ce=require("vscode"),Y;function at(a){Y=a}s(at,"setOutputChannel");function rt(a){if(Y&&typeof Y.appendLine=="function"){Y.appendLine(`[PruvaGraph] ${a}`);return}typeof globalThis<"u"&&Array.isArray(globalThis.__PRUVAGRAPH_TEST_LOG_MESSAGES__)&&globalThis.__PRUVAGRAPH_TEST_LOG_MESSAGES__.push(`[PruvaGraph] ${a}`),console&&typeof console.log=="function"&&console.log(`[PruvaGraph] ${a}`)}s(rt,"log");function nt(){let a="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let t=0;t<32;t++)a+=e.charAt(Math.floor(Math.random()*e.length));return a}s(nt,"getNonce");function ot(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}s(ot,"escapeHtml");function st(){var a,e,t;return((t=(e=(a=Ce.workspace.workspaceFolders)==null?void 0:a[0])==null?void 0:e.uri)==null?void 0:t.fsPath)||null}s(st,"getWorkspaceRoot");function it(){Ce.window.showWarningMessage("PruvaGraph: Please open a folder first.")}s(it,"noWorkspace");Be.exports={setOutputChannel:at,log:rt,getNonce:nt,escapeHtml:ot,getWorkspaceRoot:st,noWorkspace:it}});var W=L((na,X)=>{"use strict";var ce=require("vscode"),P=require("path"),T=require("fs"),{spawn:Se}=require("child_process"),{execSync:lt}=require("child_process"),{log:pe,getWorkspaceRoot:Ee,noWorkspace:ra}=$(),y,J,O,de;function dt({statusBarItem:a,getPanel:e}){y=a,Object.defineProperty(X.exports,"_panel",{get:e,configurable:!0})}s(dt,"initCliRunner");function ct(){let e=require("os").homedir(),r=[...(()=>{try{let n=P.join(e,"AppData","Local","Packages");return T.existsSync(n)?T.readdirSync(n).filter(o=>o.startsWith("PythonSoftwareFoundation.Python")).map(o=>P.join(n,o,"LocalCache","local-packages",...o.match(/Python\.(\d+)/)?[`Python${o.match(/Python\.(\d+)/)[1]}`]:["Python313"],"Scripts","pruvagraph.exe")):[]}catch{return[]}})(),P.join(e,"AppData","Local","Programs","Python","Python313","Scripts","pruvagraph.exe"),P.join(e,"AppData","Local","Programs","Python","Python312","Scripts","pruvagraph.exe"),P.join(e,"AppData","Local","Programs","Python","Python311","Scripts","pruvagraph.exe"),P.join(e,"AppData","Roaming","Python","Python313","Scripts","pruvagraph.exe"),P.join(e,"AppData","Roaming","Python","Python312","Scripts","pruvagraph.exe")];for(let n of r)if(T.existsSync(n))return{command:n,prefix:[]};try{return lt("pruvagraph --help",{stdio:"ignore",timeout:3e3}),{command:"pruvagraph",prefix:[]}}catch{}return{command:"python",prefix:["-m","pruvagraph"]}}s(ct,"resolvePruvaGraph");function Pe(a,e,t){let r={...process.env,PYTHONIOENCODING:"utf-8",PYTHONUTF8:"1",PYTHONLEGACYWINDOWSSTDIO:"0"};if(a!=="pruvagraph")return Se(a,e,{cwd:t,shell:!1,env:r});let{command:n,prefix:o}=ct(),i=[...o,...e];return pe(`[spawnCLI] ${n} ${i.join(" ")}`),Se(n,i,{cwd:t,shell:!1,env:r})}s(Pe,"spawnCLI");function pt(a,e,t,r,n){return new Promise(o=>{var d,c;let i=Pe(a,e,t),g=ce.window.createOutputChannel("PruvaGraph"),u=s(b=>{b.toString().split(`
`).filter(h=>h.trim()).forEach(h=>{pe(h),n(h)})},"handleData");(d=i.stdout)==null||d.on("data",u),(c=i.stderr)==null||c.on("data",u),i.on("error",b=>{let v=`Error running pruvagraph: ${b.message}.
Install: pip install pruvagraph`;pe(v),n(v),r.post("error",{message:v}),o()}),i.on("exit",b=>{b!==0&&n(`pruvagraph exited with code ${b}`),o()})})}s(pt,"runCLI");function _e(a){if(!a)return null;let e=P.join(a,"pruvagraph-out","cost_report.json");if(!T.existsSync(e))return null;try{let t=JSON.parse(T.readFileSync(e,"utf8")),r=Number(t.naive_cost_usd||0),n=Math.round(r*1e6/3),o=Number(t.total_input_tokens||0)+Number(t.total_output_tokens||0),i=Math.max(0,n-o),g=n>0?Math.max(0,Math.round((1-o/n)*100)):0;return{cacheHits:Number(t.cache_hits||0),apiCallsAvoided:Number(t.calls_saved||0),totalFilesProcessed:Number(t.total_files_processed||0),llmCallsMade:Number(t.llm_calls_made||0),totalInputTokens:Number(t.total_input_tokens||0),totalOutputTokens:Number(t.total_output_tokens||0),actualCostUsd:Number(t.actual_cost_usd||0),naiveCostUsd:r,costSavedUsd:Number(t.cost_saved_usd||0),savingsPct:Number(t.savings_pct||0),naiveTokens:n,actualTokens:o,tokensSaved:i,compressionPct:g,runDuration:Number(t.run_duration_seconds||0)}}catch{return null}}s(_e,"loadCostReport");function ue(a){if(!y)return;J&&(clearTimeout(J),J=void 0),O&&(clearTimeout(O),O=void 0);let e=X.exports._panel;if(a&&typeof a.costSavedUsd=="number"&&a.costSavedUsd>0){y.text=`$(graph) PruvaGraph: $${a.costSavedUsd.toFixed(4)} Saved`,y.color=new ce.ThemeColor("charts.green"),y.tooltip="Open the PruvaGraph cost report and savings receipt.",y.backgroundColor=new ce.ThemeColor("statusBarItem.prominentBackground"),y.show(),J=setTimeout(()=>{y&&(y.backgroundColor=void 0)},1200),de={value:1,tooltip:`$${a.costSavedUsd.toFixed(4)} saved`};let t=s(()=>{e&&e.badge!==void 0&&(e.badge=void 0,O=setTimeout(()=>{e&&(e.badge=de),O=setTimeout(t,600)},400))},"updateBadgePulse");e&&(e.badge=de,O=setTimeout(t,800))}else y.text="$(graph) PruvaGraph",y.color=void 0,y.tooltip="Run a build or dry run to populate savings data.",y.backgroundColor=void 0,y.show(),e&&(e.badge=void 0)}s(ue,"updateStatusBar");function ut(a){let e=Ee(),t=e?_e(e):null;a.post("savingsData",{data:t}),ue(t)}s(ut,"sendSavingsReceipt");async function gt(a,e){let t=Ee();if(!t){a.post("status",{graphBuilt:!1,watchMode:e});return}let r=P.join(t,"pruvagraph-out","graph.json"),n=P.join(t,"pruvagraph-out","cost_report.json"),o=T.existsSync(r),i=0,g=0,u=0,d=0;if(o){try{let c=JSON.parse(T.readFileSync(r,"utf8"));i=(c.nodes||[]).length,g=(c.links||c.edges||[]).length}catch{}if(T.existsSync(n))try{let c=JSON.parse(T.readFileSync(n,"utf8"));u=c.savings_pct||0,d=c.cost_saved_usd||0}catch{}}a.post("status",{graphBuilt:o,nodeCount:i,edgeCount:g,savingsPct:u,savedUsd:d,watchMode:e,root:t}),ue(o?{costSavedUsd:d}:null)}s(gt,"sendStatus");X.exports={initCliRunner:dt,spawnCLI:Pe,runCLI:pt,loadCostReport:_e,updateStatusBar:ue,sendSavingsReceipt:ut,sendStatus:gt}});var ze=L((sa,Te)=>{"use strict";var A=require("vscode"),{log:ge}=$(),{spawnCLI:bt}=W(),K;function ht(a){if(!A.workspace.getConfiguration("pruvagraph").get("modules.driftguard.enabled",!1)){ge("[DriftGuard] Disabled via settings.");return}K=A.languages.createDiagnosticCollection("pruvagraph-driftguard"),a.subscriptions.push(K),a.subscriptions.push(A.workspace.onDidSaveTextDocument(r=>{r.languageId!=="python"&&!r.fileName.endsWith(".py")||vt(r)})),ge("[DriftGuard] Enabled \u2014 will validate Python imports on save.")}s(ht,"initDriftGuard");async function vt(a){var i,g,u;if(!K)return;let t=a.getText().split(`
`),r=[],n=((u=(g=(i=A.workspace.workspaceFolders)==null?void 0:i[0])==null?void 0:g.uri)==null?void 0:u.fsPath)||".",o=/^\s*(?:from\s+([\w.]+)\s+import\s+([\w*]+)|import\s+([\w.]+))/;for(let d=0;d<t.length;d++){let c=t[d].match(o);if(!c)continue;let b=c[1]||c[3],v=c[2]||null;if(b&&!b.startsWith("."))try{let h=await mt(b,v,n);if(h&&!h.valid){let w=new A.Range(d,0,d,t[d].length),M=h.suggestion?`DriftGuard: ${b}${v?"."+v:""} \u2014 ${h.suggestion}`:`DriftGuard: ${b}${v?"."+v:""} not found`,oe=new A.Diagnostic(w,M,A.DiagnosticSeverity.Warning);oe.source="PruvaGraph DriftGuard",r.push(oe)}}catch(h){ge(`[DriftGuard] Error validating ${b}: ${h.message}`)}}K.set(a.uri,r)}s(vt,"_runDriftGuardOnFile");function mt(a,e,t){return new Promise(r=>{var u,d;let n=["validate-import",a];e&&e!=="*"&&n.push(e),n.push("--root",t);let o=bt("pruvagraph",n,t),i="",g="";(u=o.stdout)==null||u.on("data",c=>{i+=c.toString()}),(d=o.stderr)==null||d.on("data",c=>{g+=c.toString()}),o.on("error",()=>r(null)),o.on("exit",c=>{if(c===0)r({valid:!0,suggestion:null});else{let b=g.match(/→\s*(.+)/);r({valid:!1,suggestion:b?b[1].trim():g.trim()||null})}})})}s(mt,"_runValidateImport");Te.exports={initDriftGuard:ht}});var te=L((la,Me)=>{"use strict";var p=require("vscode"),V=require("path"),I=require("fs"),{log:_,escapeHtml:Z,getWorkspaceRoot:x,noWorkspace:B}=$(),{runCLI:S,spawnCLI:ft,sendStatus:ee,sendSavingsReceipt:U}=W(),C=!1;function xt(){return C}s(xt,"getWatchMode");async function yt(a){let e=x();if(!e)return B();let t=p.workspace.getConfiguration("pruvagraph"),r=t.get("llmBackend","none"),n=t.get("dedupThreshold",.82);a.post("buildStart",{root:e}),_(`Building graph for ${e} \u2026`);let o=[".","--backend",String(r),"--dedup-threshold",String(n),"--stream"];await S("pruvagraph",o,e,a,i=>{a.post("buildLog",{line:i})}),await ee(a,C),await U(a)}s(yt,"runBuild");async function wt(a){try{let e=await p.commands.executeCommand("vscode.executeDocumentSymbolProvider",a);return e?e.map(t=>({name:t.name,detail:t.detail||"",kind:p.SymbolKind[t.kind]||"Unknown",range:{start:{line:t.range.start.line,character:t.range.start.character},end:{line:t.range.end.line,character:t.range.end.character}}})):[]}catch{return[]}}s(wt,"extractSymbolsViaLSP");async function kt(a){let e=x();if(!e)return B();a.post("buildStart",{root:e}),_(`[N3] Fast Building via LSP for ${e} \u2026`);let t=await p.workspace.findFiles("**/*.{py,js,ts,jsx,tsx,java,go,rs}","**/node_modules/**"),r={};a.post("buildLog",{line:`[N3] Found ${t.length} files. Extracting LSP symbols...`});let n=0;for(let d of t.slice(0,50)){let c=await wt(d);c&&c.length>0&&(r[d.fsPath]=c,n++)}a.post("buildLog",{line:`[N3] Extracted symbols for ${n} files. Passing to pipeline...`});let o=V.join(e,"pruvagraph-out");I.existsSync(o)||I.mkdirSync(o,{recursive:!0});let i=V.join(o,"lsp_extractions.json");I.writeFileSync(i,JSON.stringify(r,null,2),"utf-8");let u=p.workspace.getConfiguration("pruvagraph").get("llmBackend","none");await S("pruvagraph",["build-from-lsp",i,"--backend",String(u),"--stream"],e,a,d=>{a.post("buildLog",{line:d})}),await ee(a,C),await U(a)}s(kt,"runBuildFast");async function Ct(a,e=""){let t=x();if(!t)return B();let r=await p.window.showInputBox({prompt:"Ask your codebase anything",placeHolder:"How does auth connect to the database?",value:e});if(!r)return;a.post("queryStart",{question:r}),_(`Querying: ${r}`);let o=p.workspace.getConfiguration("pruvagraph").get("llmBackend","none");await S("pruvagraph",["query",r,"--backend",String(o)],t,a,i=>{a.post("queryResult",{line:i})}),await U(a)}s(Ct,"runQuery");async function Bt(a){let e=x();if(!e)return B();let t=[];await S("pruvagraph",["cost-report"],e,a,r=>{t.push(r),a.post("logLine",{line:r})}),t.length>0&&a.post("costReport",{text:t.join(`
`)}),await U(a)}s(Bt,"runCostReport");function Le(){let a=p.workspace.getConfiguration("pruvagraph");return["ghostmemory","driftguard","contextlens","taskweaver","budgetgovernor","rulesforge"].filter(t=>a.get(`modules.${t}.enabled`,!0)===!1)}s(Le,"getDisabledModules");async function St(a){let e=x();if(!e)return B();let t=await p.window.showQuickPick(["VS Code + Cursor + Claude Code (All)","VS Code only","Cursor only","Claude Code only"],{placeHolder:"Choose where to install PruvaGraph MCP"});if(!t)return;let n={"VS Code + Cursor + Claude Code (All)":[],"VS Code only":["--vscode"],"Cursor only":["--cursor"],"Claude Code only":["--claude-code"]}[t]||[],o=Le();o.length>0&&(n.push("--disable-modules",o.join(",")),_(`[settings-gating] Disabled modules: ${o.join(", ")}`)),await S("pruvagraph",["install",...n],e,a,i=>{a.post("logLine",{line:i}),_(i)}),p.window.showInformationMessage("\u2713 PruvaGraph MCP installed! Restart your IDE to activate.")}s(St,"runInstallMCP");async function Et(){let a=x();if(!a)return B();let e=V.join(a,"pruvagraph-out","graph.html");if(!I.existsSync(e)){await p.window.showWarningMessage("No graph found. Build one first?","Build Now","Cancel")==="Build Now"&&await p.commands.executeCommand("pruvagraph.build");return}p.env.openExternal(p.Uri.file(e))}s(Et,"openVisualizer");async function Pt(a){let e=x();if(!e)return B();let t=V.join(e,"pruvagraph-out");if(await p.window.showWarningMessage("Clear PruvaGraph cache? The next build will re-extract all files.","Clear Cache","Cancel")==="Clear Cache")try{I.rmSync(t,{recursive:!0,force:!0}),a.post("logLine",{line:"\u2713 Cache cleared."}),p.window.showInformationMessage("PruvaGraph cache cleared."),ee(a,C)}catch(n){a.post("logLine",{line:`\u26A0 Error: ${n.message}`})}}s(Pt,"clearCache");function _t(a){var e,t;if(C=!C,a.post("watchStatus",{active:C}),C){let r=x();if(!r){C=!1;return}_("Watch mode ON"),p.window.showInformationMessage("PruvaGraph watch mode ON \u2014 auto-rebuilds on file save.");let n=ft("pruvagraph",["watch","."],r);a._watchProc=n,(e=n.stdout)==null||e.on("data",o=>{let i=o.toString().trim();i&&a.post("buildLog",{line:i})}),n.on("exit",()=>{C=!1,a.post("watchStatus",{active:!1})})}else _("Watch mode OFF"),(t=a._watchProc)==null||t.kill(),a._watchProc=void 0,p.window.showInformationMessage("PruvaGraph watch mode OFF.")}s(_t,"toggleWatch");async function Tt(a){let e=p.window.activeTextEditor,r=((e==null?void 0:e.document.getText(e.selection))||"").trim()||await p.window.showInputBox({prompt:"Enter function/class name to find callers",placeHolder:"MyClass or myFunction"});if(!r)return;let n=x();n&&(a.post("queryStart",{question:`Callers of: ${r}`}),await S("pruvagraph",["query",`who calls ${r}`,"--backend","none"],n,a,o=>{a.post("queryResult",{line:o})}))}s(Tt,"findCallers");async function zt(a){let e=p.window.activeTextEditor,r=((e==null?void 0:e.document.getText(e.selection))||"").trim()||await p.window.showInputBox({prompt:"Enter module/function to get dependencies",placeHolder:"AuthService or src/auth/index.ts"});if(!r)return;let n=x();n&&(a.post("queryStart",{question:`Dependencies of: ${r}`}),await S("pruvagraph",["query",`dependencies of ${r}`,"--backend","none"],n,a,o=>{a.post("queryResult",{line:o})}))}s(zt,"getDependencies");async function Lt(a){let e=await p.window.showQuickPick([{label:"$(terminal) pip install pruvagraph",description:"Standard pip install",value:"pip"},{label:"$(zap) uvx pruvagraph (faster)",description:"Install via uv \u2014 faster, recommended",value:"uvx"}],{placeHolder:"Choose installation method"});if(!e)return;let t=process.platform==="win32",r=e.value==="uvx"?"uvx":t?"pip":"pip3",n=e.value==="uvx"?["pruvagraph","."]:["install","--upgrade","pruvagraph"];a.post("buildStart",{root:"Installing pruvagraph\u2026"}),_(`Running: ${r} ${n.join(" ")}`),await S(r,n,x()||process.cwd(),a,o=>{a.post("buildLog",{line:o})}),p.window.showInformationMessage("\u2713 pruvagraph installed! Now run Build Graph."),a.post("buildLog",{line:`
\u2713 Installation complete. Click "Build Graph" to start.`})}s(Lt,"runInstallPkg");async function Mt(a){let e=x();if(!e)return B();a.post("buildStart",{root:e}),_("Dry run: estimating cost savings\u2026");let r=p.workspace.getConfiguration("pruvagraph").get("llmBackend","none"),n=[];await S("pruvagraph",[".","--dry-run","--backend",String(r)],e,a,o=>{n.push(o),a.post("buildLog",{line:o})}),n.length>0&&a.post("costReport",{text:n.join(`
`)}),await U(a)}s(Mt,"runDryRun");async function $t(a){let e=x();if(!e)return B();let t=V.join(e,"pruvagraph-out","last_diff.json");if(!I.existsSync(t)){p.window.showInformationMessage("No diff available. Run PruvaGraph build at least twice to see what changed.","Build Now").then(d=>{d==="Build Now"&&p.commands.executeCommand("pruvagraph.build")});return}let r;try{r=JSON.parse(I.readFileSync(t,"utf8"))}catch(d){p.window.showErrorMessage(`Could not read diff: ${d.message}`);return}let n=p.window.createWebviewPanel("pruvagraphDiff","PruvaGraph \u2014 Graph Diff",p.ViewColumn.Beside,{enableScripts:!1}),o=r.git_sha?` [${r.git_sha}]`:"",i=r.timestamp?new Date(r.timestamp*1e3).toLocaleString():"",g=r.diff_summary||"no changes",u=s((d,c,b)=>d.length===0?'<span class="empty">none</span>':d.map(v=>`<div class="item ${b}">${c} ${Z(String(v))}</div>`).join(""),"renderList");n.webview.html=`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<style>
  body { font-family: var(--vscode-font-family, system-ui, sans-serif); font-size:12px;
         background:var(--vscode-editor-background); color:var(--vscode-foreground);
         padding:20px; line-height:1.6; }
  h2 { font-size:15px; margin-bottom:4px; display:flex; align-items:center; gap:8px; }
  .meta { color:var(--vscode-descriptionForeground); font-size:11px; margin-bottom:18px;
          padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); }
  h3 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;
       color:var(--vscode-descriptionForeground); margin:16px 0 6px;
       display:flex; align-items:center; gap:6px; }
  h3::before { content:''; display:inline-block; width:3px; height:11px;
               background:#E53E3E; border-radius:2px; }
  .item { padding:4px 8px; border-radius:5px; margin:3px 0; font-family:monospace;
          font-size:11px; display:flex; align-items:center; gap:6px; }
  .item::before { content:''; display:inline-block; width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .added   { background:rgba(63,185,80,0.1);  color:#3FB950; }
  .added::before { background:#3FB950; }
  .removed { background:rgba(248,81,73,0.1);  color:#F85149; }
  .removed::before { background:#F85149; }
  .changed { background:rgba(210,153,34,0.1); color:#D29922; }
  .changed::before { background:#D29922; }
  .empty   { color:var(--vscode-descriptionForeground); font-style:italic; padding:4px 8px; }
  .badge   { display:inline-block; padding:2px 8px; border-radius:5px; font-size:10px;
             font-weight:700; background:linear-gradient(135deg,#E53E3E,#C53030);
             color:#fff; letter-spacing:0.3px; }
  .count   { font-size:10px; opacity:0.6; font-family:monospace; margin-left:4px; }
</style></head><body>
<h2>Graph Diff${o} <span class="badge">D1</span></h2>
<div class="meta">${i?`Built ${i} \xB7 `:""}${g}</div>
<h3>Added Nodes <span class="count">(${r.added_nodes.length})</span></h3>${u(r.added_nodes,"","added")}
<h3>Removed Nodes <span class="count">(${r.removed_nodes.length})</span></h3>${u(r.removed_nodes,"","removed")}
<h3>Changed Nodes <span class="count">(${r.changed_nodes.length})</span></h3>${u(r.changed_nodes,"","changed")}
<h3>Added Edges <span class="count">(${r.added_edges.length})</span></h3>${u(r.added_edges.map(d=>d.join(" \u2192 ")),"","added")}
<h3>Removed Edges <span class="count">(${r.removed_edges.length})</span></h3>${u(r.removed_edges.map(d=>d.join(" \u2192 ")),"","removed")}
</body></html>`,a.post("diffLoaded",{summary:g,added:r.added_nodes.length,removed:r.removed_nodes.length,changed:r.changed_nodes.length})}s($t,"showDiff");async function At(a){var c;let e=x();if(!e)return B();let t=p.window.activeTextEditor,n=((c=t==null?void 0:t.document.getText(t.selection))==null?void 0:c.trim())||""||await p.window.showInputBox({prompt:"[D2] Enter symbol, class, function or file to analyse",placeHolder:"SessionManager  or  auth.py  or  build_graph"});if(!n)return;let o=await p.window.showQuickPick(["3 (default)","4","5","2 (fast)"],{placeHolder:"BFS depth \u2014 how many hops of dependents to include?"}),i=o?parseInt(o[0]):3,g=p.window.createWebviewPanel("pruvagraphImpact",`Impact: ${n}`,p.ViewColumn.Beside,{enableScripts:!1});g.webview.html=`<!DOCTYPE html><html><body style="font-family:monospace;padding:16px;background:var(--vscode-editor-background);color:var(--vscode-foreground)">
<h2 style="font-size:14px">\u26A0\uFE0F Analyzing impact of <code>${Z(n)}</code>\u2026</h2>
<p style="color:var(--vscode-descriptionForeground);font-size:11px">Running impact analysis (BFS depth ${i})\u2026</p>
</body></html>`;let u=[];await S("pruvagraph",["impact",n,"--depth",String(i),"--format","table"],e,a,b=>{u.push(b)});let d=Z(u.join(`
`));g.webview.html=`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<style>
  body { font-family:var(--vscode-font-family,system-ui,sans-serif); font-size:12px;
         background:var(--vscode-editor-background); color:var(--vscode-foreground);
         padding:20px; line-height:1.6; }
  h2 { font-size:15px; display:flex; align-items:center; gap:8px; margin-bottom:4px; }
  .subtitle { color:var(--vscode-descriptionForeground); font-size:11px; margin-bottom:18px;
              padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); }
  pre { font-family:monospace; font-size:11px; line-height:1.7; white-space:pre-wrap;
        word-break:break-word;
        background:rgba(255,255,255,0.04); padding:14px; border-radius:8px;
        border:1px solid rgba(255,255,255,0.08); }
  .badge { display:inline-block; padding:2px 8px; border-radius:5px;
           font-size:10px; font-weight:700;
           background:linear-gradient(135deg,#D29922,#B7790F);
           color:#fff; letter-spacing:0.3px; }
</style></head><body>
<h2>Impact: <code>${Z(n)}</code> <span class="badge">D2</span></h2>
<div class="subtitle">BFS depth: ${i} &nbsp;\xB7&nbsp; Dependents that would be affected by a change</div>
<pre>${d||`No output received \u2014 is graph built?
Run: Build Graph or Build Fast (LSP) first.`}</pre>
</body></html>`}s(At,"analyzeImpact");async function It(a){let e=x();if(!e)return B();let r=p.workspace.getConfiguration("pruvagraph").get("llmBackend","none");await p.window.showInformationMessage("[M1] Build per-package graphs for the entire monorepo?","Build Monorepo","Cancel")==="Build Monorepo"&&(a.post("buildStart",{root:e}),_("[M1] Building monorepo graph\u2026"),await S("pruvagraph",[".","--monorepo","--no-viz","--backend",String(r)],e,a,o=>{a.post("buildLog",{line:o})}),await ee(a,C),p.window.showInformationMessage("\u2713 Monorepo graph built. See pruvagraph-out/cross_graph.json"))}s(It,"buildMonorepo");Me.exports={runBuild:yt,runBuildFast:kt,runQuery:Ct,runCostReport:Bt,runInstallMCP:St,openVisualizer:Et,clearCache:Pt,toggleWatch:_t,findCallers:Tt,getDependencies:zt,runInstallPkg:Lt,runDryRun:Mt,showDiff:$t,analyzeImpact:At,buildMonorepo:It,getDisabledModules:Le,getWatchMode:xt}});var Ae=L((ca,$e)=>{"use strict";var{getNonce:Dt}=$();function Rt(a,e){let t=Dt();return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; style-src ${a.cspSource} 'unsafe-inline'; script-src 'nonce-${t}';">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PruvaGraph</title>
<style>
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   PRUVALEX PruvaGraph \u2014 Premium Sidebar UI
   Brand-red design system, glassmorphism, micro-animations
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

:root {
  /* VS Code integration */
  --vsc-bg:      var(--vscode-sideBar-background, #0D1117);
  --vsc-surface: var(--vscode-editor-background, #161B22);
  --vsc-border:  var(--vscode-widget-border, #30363D);
  --vsc-text:    var(--vscode-foreground, #E6EDF3);
  --vsc-muted:   var(--vscode-descriptionForeground, #7D8590);
  --vsc-link:    var(--vscode-textLink-foreground, #58A6FF);
  --vsc-font:    var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);

  /* PRUVALEX Brand \u2014 Red System */
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

/* \u2500\u2500 Entrance animation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Tabs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Status Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Progress Bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Section Title \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* Primary \u2014 Brand Red */
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

/* \u2500\u2500 Metric Cards (Cost Tab) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Premium Stats Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Log & Query Boxes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Divider \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 8px 10px;
  opacity: 0.6;
}

/* \u2500\u2500 ContextLens Placeholder \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 SVG Icons (inline CSS-drawn) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

<!-- \u2550\u2550 Header \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="header">
  <div class="logo">
    <!-- PRUVALEX "P" Hexagon Logo \u2014 matching brand icon.png -->
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
  <div class="subtitle">by PRUVALEX \xB7 AI Cost Optimizer \xB7 No server needed</div>
</div>

<!-- \u2550\u2550 Tabs \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
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

<!-- \u2550\u2550 Progress Bar \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="progress-bar" id="progressBar"></div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     TAB 1: EXPLORER
     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
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
      <span class="btn-label">Dry Run \u2014 Estimate Savings</span>
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

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     TAB 2: CONTEXT LENS
     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
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

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     TAB 3: COST DASHBOARD
     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
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

<!-- \u2550\u2550 Footer \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="footer">
  <span>by <a id="link-pruvalex" tabindex="0"
>PRUVALEX</a></span>
  <span class="footer-dot">\xB7</span>
  <a id="link-github" tabindex="0"
>GitHub</a>
  <span class="footer-dot">\xB7</span>
  <span>v1.9.1</span>
</div>

<script nonce="${t}">
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
    const folder = msg.root ? msg.root.split(/[\\/]/).pop() : '';
    const counts = (msg.nodeCount || msg.edgeCount) ? ' \xB7 ' + (msg.nodeCount||0) + ' nodes \xB7 ' + (msg.edgeCount||0) + ' edges' : '';
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
  appendQuery('\u{1F50D} ' + msg.question);
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
  appendLog('\u{1F4CA} ' + (msg.summary || 'No changes'), 'ok');
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
</html>`}s(Rt,"getWebviewHtml");$e.exports={getWebviewHtml:Rt}});var qe=L((ua,Ne)=>{"use strict";var ae=require("vscode"),{sendStatus:Ie,sendSavingsReceipt:De}=W(),{getWatchMode:Re}=te(),be,Fe;function Ft(){return Fe}s(Ft,"getPanel");var re=class re{constructor(e){this._extensionUri=e,this._view=void 0,this._watchProc=void 0}resolveWebviewView(e){this._view=e,Fe=e,be||(be=Ae().getWebviewHtml),e.webview.options={enableScripts:!0,localResourceRoots:[ae.Uri.joinPath(this._extensionUri,"media")]},e.webview.html=be(e.webview,this._extensionUri);let t=te();e.webview.onDidReceiveMessage(r=>{switch(r.command){case"build":return t.runBuild(this);case"buildFast":return t.runBuildFast(this);case"query":return t.runQuery(this,r.text);case"costReport":return t.runCostReport(this);case"refreshSavings":return De(this);case"installMCP":return t.runInstallMCP(this);case"openViz":return t.openVisualizer();case"clearCache":return t.clearCache(this);case"watchToggle":return t.toggleWatch(this);case"showOutput":return ae.commands.executeCommand("workbench.action.output.toggleOutput");case"ready":return Promise.all([Ie(this,Re()),De(this)]);case"installPkg":return t.runInstallPkg(this);case"dryRun":return t.runDryRun(this);case"showDiff":return t.showDiff(this);case"analyzeImpact":return t.analyzeImpact(this);case"buildMonorepo":return t.buildMonorepo(this);case"openExternal":return ae.env.openExternal(ae.Uri.parse(r.url))}}),Ie(this,Re())}post(e,t){this._view&&this._view.webview.postMessage({command:e,...t})}};s(re,"PruvaGraphViewProvider"),j(re,"viewType","pruvagraphPanel");var he=re;Ne.exports={PruvaGraphViewProvider:he,getPanel:Ft}});var je=L((ba,He)=>{"use strict";var E=require("vscode"),Oe=require("path"),me=require("fs"),{spawn:Nt}=require("child_process");function ve(a,e){return new Promise(t=>{var d,c,b,v,h;let r=((b=(c=(d=E.workspace.workspaceFolders)==null?void 0:d[0])==null?void 0:c.uri)==null?void 0:b.fsPath)||".",n=e||r,o=Nt("python",["-m","pruvagraph.cli",...a],{cwd:n,shell:!1,env:{...process.env,PYTHONUTF8:"1"}}),i="",g="",u=setTimeout(()=>{o.kill(),t(JSON.stringify({error:"CLI timeout (15s)"}))},15e3);(v=o.stdout)==null||v.on("data",w=>{i+=w.toString()}),(h=o.stderr)==null||h.on("data",w=>{g+=w.toString()}),o.on("error",w=>{clearTimeout(u),t(JSON.stringify({error:w.message}))}),o.on("exit",()=>{clearTimeout(u),t(i||JSON.stringify({error:g||"no output"}))})})}s(ve,"_runPythonCLI");function Ge(a){try{let e=Oe.join(a,"pruvagraph-out","benchmark_results.jsonl");if(!me.existsSync(e))return null;let t=me.readFileSync(e,"utf-8").trim().split(`
`).filter(Boolean),r=JSON.parse(t[0]),n=t.slice(1).map(o=>JSON.parse(o));return{summary:r,questions:n}}catch{return null}}s(Ge,"_loadBenchmarkData");var k=class k{static createOrShow(e,t="dashboard"){let r=E.window.activeTextEditor?E.window.activeTextEditor.viewColumn:E.ViewColumn.One;if(k.currentPanel){k.currentPanel._panel.reveal(r),k.currentPanel._initialTab=t,k.currentPanel._refresh();return}let n=E.window.createWebviewPanel(k.viewType,"PruvaGraph Analytics",r,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[]});k.currentPanel=new k(n,e,t)}constructor(e,t,r="dashboard"){this._panel=e,this._context=t,this._disposables=[],this._initialTab=r,this._refresh(),this._panel.onDidDispose(()=>this.dispose(),null,this._disposables),this._panel.webview.onDidReceiveMessage(n=>this._handleMessage(n),null,this._disposables)}_handleMessage(e){var r,n,o;let t=((o=(n=(r=E.workspace.workspaceFolders)==null?void 0:r[0])==null?void 0:n.uri)==null?void 0:o.fsPath)||".";if(e.command==="refresh"){this._refresh();return}if(e.command==="setBudget"){E.window.showInputBox({prompt:"Token budget cap (e.g. 50000)",value:"50000"}).then(async i=>{i&&/^\d+$/.test(i)&&(await ve(["budget","set",i],t),this._refresh())});return}if(e.command==="openViz"){let i=Oe.join(t,"pruvagraph-out","graph.html");me.existsSync(i)?E.env.openExternal(E.Uri.file(i)):E.window.showWarningMessage("No graph.html found. Run pruvagraph build first.")}}async _refresh(){var o,i,g;let e=((g=(i=(o=E.workspace.workspaceFolders)==null?void 0:o[0])==null?void 0:i.uri)==null?void 0:g.fsPath)||".",t=Ge(e),r={session_set:!1,cap:0,spent:0,remaining:0,pct_used:0,status:"NO_BUDGET"},n=[];try{r=JSON.parse(await ve(["budget","check","--format","json"],e))}catch{}try{n=JSON.parse(await ve(["task-progress","--all","--format","json"],e))}catch{}this._panel.webview.html=this._buildHtml(t,r,n)}_buildHtml(e,t,r){let n=t&&t.error?t:r&&r.error?r:null;if(n)return`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:20px;color:#ccc;background:#0d1117;}code{background:#21262d;padding:4px;border-radius:4px;}</style></head>
<body><h2>&#9888; PRUVALEX Engine Error</h2><p>Python CLI execution failed. Ensure python is installed and pruvagraph is accessible.</p>
<pre style="background:#21262d;padding:10px;border-radius:4px;white-space:pre-wrap;"><code>${s(m=>String(m).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),"_escErr")(n.error)}</code></pre>
<p>Run: <code>pip install pruvalex-pruvagraph</code> to resolve this.</p></body></html>`;let o=e?e.summary:{},i=+(o.avg_savings_pct||0),g=+(o.avg_tokens_graph||0),u=+(o.avg_tokens_raw||0),d=+(o.question_count||0),c={tier0_cache:0,tier1_deterministic:0,tier2_embedding:0,tier3_subgraph:0,tier_unknown:0};(e?e.questions:[]).forEach(l=>{let m=l.method_used||"tier_unknown";c[m]=(c[m]||0)+1});let b=(e?e.questions:[]).filter(l=>l.savings_pct>0).sort((l,m)=>m.savings_pct-l.savings_pct).slice(0,8),v=Math.min(+(t.pct_used||0),100),h=(v/100*339).toFixed(1),w=t.status==="EXCEEDED"?"#ff4d4d":t.status==="WARNING"?"#f5a623":"#4ecdc4",M={};(Array.isArray(r)?r:[]).forEach(l=>{M[l.task_id]||(M[l.task_id]=[]),M[l.task_id].push(l)});let ye=Object.keys(M),we=[{key:"tier0_cache",label:"Tier 0 \u2014 Cache",color:"#3fb950",desc:"Free: exact match"},{key:"tier1_deterministic",label:"Tier 1 \u2014 Deterministic",color:"#4ecdc4",desc:"Free: graph traversal"},{key:"tier2_embedding",label:"Tier 2 \u2014 Embedding",color:"#58a6ff",desc:"Low: local embed"},{key:"tier3_subgraph",label:"Tier 3 \u2014 LLM Subgraph",color:"#f5a623",desc:"LLM on 2-hop only"},{key:"tier_unknown",label:"Unknown",color:"#8b949e",desc:"Not detected"}],se=Object.values(c).reduce((l,m)=>l+m,0)||1,F=70,N=70,q=50,G=-Math.PI/2,Je=we.map(l=>{let m=c[l.key]||0,z=m/se,ie=z*2*Math.PI,le=F+q*Math.cos(G),Xe=N+q*Math.sin(G);G+=ie;let Ke=F+q*Math.cos(G),Ze=N+q*Math.sin(G),et=z>.5?1:0;return{...l,count:m,pct:(z*100).toFixed(1),path:z>.001?`M ${F} ${N} L ${le.toFixed(2)} ${Xe.toFixed(2)} A ${q} ${q} 0 ${et} 1 ${Ke.toFixed(2)} ${Ze.toFixed(2)} Z`:""}}),H=s(l=>String(l).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),"_esc");return`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PruvaGraph Analytics</title>
<style>
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   PRUVALEX PruvaGraph Analytics Dashboard
   Premium dark UI \u2014 Brand Red design system
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
:root{
  --bg:      var(--vscode-editor-background, #0D1117);
  --surface: var(--vscode-sideBar-background, #161B22);
  --raised:  #1C2128;
  --bdr:     var(--vscode-widget-border, #30363D);
  --bdr-h:   #484F58;
  --txt:     var(--vscode-foreground, #E6EDF3);
  --mut:     var(--vscode-descriptionForeground, #7D8590);
  --brand:   #E53E3E;
  --brand-d: #C53030;
  --brand-l: #FC8181;
  --brand-g: rgba(229,62,62,0.12);
  --grn:     #3FB950;  --grn-g: rgba(63,185,80,0.12);
  --amb:     #D29922;  --amb-g: rgba(210,153,34,0.12);
  --red:     #F85149;  --red-g: rgba(248,81,73,0.12);
  --blu:     #58A6FF;  --blu-g: rgba(88,166,255,0.12);
  --cyn:     #39C5CF;
  --fnt:     var(--vscode-font-family, system-ui, -apple-system, sans-serif);
  --mono:    var(--vscode-editor-font-family, 'Cascadia Code', monospace);
}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes budgetArc{from{stroke-dasharray:0 339.29}}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--txt);font-family:var(--fnt);font-size:13px;padding:0;overflow-x:hidden;-webkit-font-smoothing:antialiased;}

/* Tab Bar */
.tab-bar{display:flex;background:var(--surface);border-bottom:1px solid var(--bdr);position:sticky;top:0;z-index:10;backdrop-filter:blur(8px);}
.tab{flex:1;text-align:center;padding:11px 6px;cursor:pointer;color:var(--mut);font-size:11px;font-weight:600;
  border-bottom:2px solid transparent;transition:color 0.2s,border-color 0.2s;letter-spacing:0.2px;user-select:none;}
.tab:hover{color:var(--txt);}
.tab.active{color:var(--brand);border-bottom-color:var(--brand);}

/* Panels */
.panel{display:none;padding:16px;animation:fadeIn 0.2s ease;}
.panel.active{display:block;}

/* KPI Grid */
.kpi-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.kpi{
  background:linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));
  border:1px solid rgba(255,255,255,0.07);
  border-radius:12px;padding:16px 14px;
  transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s;
  cursor:default;
}
.kpi:hover{border-color:rgba(229,62,62,0.3);transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,0,0,0.35);}
.kpi-label{font-size:10px;color:var(--mut);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:10px;font-weight:600;}
.kpi-value{font-size:24px;font-weight:700;font-family:var(--mono);letter-spacing:-0.5px;}
.kpi-value.g{
  background:linear-gradient(135deg,var(--grn),#56D364);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.kpi-value.t{
  background:linear-gradient(135deg,var(--cyn),#7DCFDA);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.kpi-value.b{
  background:linear-gradient(135deg,var(--blu),#79B8FF);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

/* Cards */
.card{background:var(--surface);border:1px solid var(--bdr);border-radius:12px;padding:16px;margin-bottom:12px;}
.card-title{
  font-size:10px;font-weight:700;text-transform:uppercase;
  color:var(--mut);letter-spacing:0.7px;margin-bottom:14px;
  display:flex;align-items:center;gap:7px;
}
.card-title::before{
  content:'';display:inline-block;width:3px;height:12px;
  background:linear-gradient(180deg,var(--brand),var(--brand-d));
  border-radius:2px;flex-shrink:0;
}

/* Bar Chart */
.bar-chart{display:flex;flex-direction:column;gap:8px;}
.bar-row{display:flex;align-items:center;gap:8px;}
.bar-label{font-size:11px;color:var(--mut);width:130px;min-width:0;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.bar-track{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0;}
.bar-seg{display:flex;align-items:center;gap:5px;height:10px;}
.bar-fill{height:10px;border-radius:5px;transition:width 0.5s cubic-bezier(0.4,0,0.2,1);min-width:2px;}
.bar-fill.g{background:linear-gradient(90deg,var(--grn),#56D364);}
.bar-fill.r{background:linear-gradient(90deg,var(--brand-d),var(--brand));}
.bar-tok{font-size:10px;color:var(--mut);font-family:var(--mono);width:42px;flex-shrink:0;text-align:right;}
.bar-pct{
  font-size:10px;font-weight:700;
  background:var(--grn-g);color:var(--grn);
  border:1px solid rgba(63,185,80,0.25);
  padding:1px 5px;border-radius:3px;
  width:38px;text-align:center;flex-shrink:0;
  font-family:var(--mono);
}

/* Donut / Tier Map */
.donut-wrap{display:flex;align-items:center;gap:24px;flex-wrap:wrap;}
.legend{display:flex;flex-direction:column;gap:9px;}
.legend-row{display:flex;align-items:flex-start;gap:9px;font-size:12px;}
.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:2px;}

/* Timeline */
.timeline{display:flex;flex-direction:column;gap:14px;}
.timeline-task{
  border-left:2px solid var(--brand);
  padding-left:14px;
  position:relative;
}
.timeline-task::before{
  content:'';position:absolute;left:-5px;top:0;
  width:8px;height:8px;border-radius:50%;
  background:var(--brand);border:2px solid var(--bg);
}
.t-task-id{font-size:11px;font-weight:700;color:var(--brand-l);margin-bottom:8px;}
.t-track{display:flex;flex-direction:column;gap:6px;}
.t-item{
  background:var(--raised);border:1px solid var(--bdr);
  border-radius:8px;padding:9px 12px;
  transition:border-color 0.2s;
}
.t-item:hover{border-color:var(--bdr-h);}
.t-item.done{border-left:3px solid var(--grn);}
.t-item.pending{border-left:3px solid var(--amb);}
.t-item.failed{border-left:3px solid var(--red);}
.t-desc{font-size:12px;margin-bottom:4px;color:var(--txt);}
.t-meta{font-size:10px;color:var(--mut);font-family:var(--mono);}
.sbadge{display:inline-block;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700;margin-left:5px;}
.sbadge.done{background:var(--grn-g);color:var(--grn);border:1px solid rgba(63,185,80,0.25);}
.sbadge.pending{background:var(--amb-g);color:var(--amb);border:1px solid rgba(210,153,34,0.25);}
.sbadge.failed{background:var(--red-g);color:var(--red);border:1px solid rgba(248,81,73,0.25);}
.sha{font-family:var(--mono);font-size:10px;background:rgba(255,255,255,0.06);padding:1px 5px;border-radius:3px;}

/* Budget Meter */
.budget-wrap{display:flex;align-items:center;gap:28px;flex-wrap:wrap;}
.budget-details{display:flex;flex-direction:column;gap:6px;flex:1;min-width:140px;}
.b-row{display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.b-row:last-child{border:none;}
.b-row .val{font-weight:700;font-family:var(--mono);}
.bstatus{font-size:10px;font-weight:700;text-align:center;margin-top:5px;text-transform:uppercase;letter-spacing:0.6px;}
.bstatus.OK{color:var(--cyn);} .bstatus.WARNING{color:var(--amb);} .bstatus.EXCEEDED{color:var(--red);} .bstatus.NO_BUDGET{color:var(--mut);}

/* Buttons */
.btn{
  display:inline-flex;align-items:center;gap:7px;
  background:linear-gradient(135deg,var(--brand),var(--brand-d));
  color:#fff;border:none;border-radius:8px;
  padding:8px 16px;font-size:12px;font-weight:600;
  cursor:pointer;transition:opacity 0.15s,transform 0.15s,box-shadow 0.15s;
  font-family:var(--fnt);
}
.btn:hover{opacity:0.9;transform:translateY(-1px);box-shadow:0 3px 12px rgba(229,62,62,0.3);}
.btn:active{transform:translateY(0);box-shadow:none;}
.btn.ghost{
  background:transparent;color:var(--mut);
  border:1px solid var(--bdr);box-shadow:none;
}
.btn.ghost:hover{color:var(--txt);border-color:var(--bdr-h);box-shadow:none;transform:translateY(-1px);}
.btn-row{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}

/* Empty state */
.empty{
  color:var(--mut);font-size:12px;padding:28px 20px;
  text-align:center;border:1px dashed rgba(229,62,62,0.2);
  border-radius:10px;background:var(--brand-g);line-height:1.7;
}

/* Misc */
code{font-family:var(--mono);background:rgba(255,255,255,0.06);padding:1px 5px;border-radius:3px;font-size:11px;}
table{width:100%;border-collapse:collapse;font-size:12px;}
th{text-align:left;padding:8px 10px;color:var(--mut);border-bottom:1px solid var(--bdr);font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;}
td{padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.04);}
tr:last-child td{border:none;}
td:first-child{font-weight:600;}
.truth-card{font-size:11px;color:var(--mut);line-height:1.8;}
.truth-card strong{color:var(--txt);}
</style></head><body>

<div class="tab-bar">
  <div class="tab ${this._initialTab==="dashboard"?"active":""}"  id="tab-dashboard" onclick="sw('dashboard')">Cost Dashboard</div>
  <div class="tab ${this._initialTab==="tiermap"?"active":""}"   id="tab-tiermap"   onclick="sw('tiermap')">Tier Map</div>
  <div class="tab ${this._initialTab==="timeline"?"active":""}"  id="tab-timeline"  onclick="sw('timeline')">Timeline</div>
  <div class="tab ${this._initialTab==="budget"?"active":""}"    id="tab-budget"    onclick="sw('budget')">Budget</div>
</div>

<!-- PANEL 1 \u2014 Cost Savings Dashboard -->
<div id="dashboard" class="panel ${this._initialTab==="dashboard"?"active":""}">
  <div class="btn-row">
    <button class="btn" onclick="post('refresh')">&#8635; Refresh</button>
    <button class="btn ghost" onclick="post('openViz')">Open Graph Viz</button>
  </div>
  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-label">Avg Token Savings</div>
      <div class="kpi-value g">${i.toFixed(1)}%</div></div>
    <div class="kpi"><div class="kpi-label">Avg Tokens \u2014 Graph</div>
      <div class="kpi-value t">${Math.round(g).toLocaleString()}</div></div>
    <div class="kpi"><div class="kpi-label">Avg Tokens \u2014 Raw</div>
      <div class="kpi-value b">${Math.round(u).toLocaleString()}</div></div>
    <div class="kpi"><div class="kpi-label">Questions Benchmarked</div>
      <div class="kpi-value">${d}</div></div>
  </div>
  <div class="card">
    <div class="card-title">Top 8 Questions by Savings (&#9646; Graph &nbsp; &#9646; Raw)</div>
    ${b.length>0?`<div class="bar-chart">${b.map(l=>{let m=Math.max(l.tokens_raw,l.tokens_graph,1),z=(l.tokens_graph/m*100).toFixed(1),ie=(l.tokens_raw/m*100).toFixed(1),le=H(l.question.length>42?l.question.slice(0,40)+"\u2026":l.question);return`<div class="bar-row" title="${H(l.question)}">
        <div class="bar-label">${le}</div>
        <div class="bar-track">
          <div class="bar-seg"><div class="bar-fill g" style="width:${z}%"></div><span class="bar-tok">${l.tokens_graph}</span></div>
          <div class="bar-seg"><div class="bar-fill r" style="width:${ie}%"></div><span class="bar-tok">${l.tokens_raw}</span></div>
        </div>
        <div class="bar-pct">${l.savings_pct.toFixed(0)}%</div>
      </div>`}).join("")}</div>`:'<div class="empty">No benchmark data. Run: <code>pruvagraph benchmark-suite</code></div>'}
  </div>
  <div class="card" style="font-size:11px;color:var(--mut);">
    <strong style="color:var(--txt);">Truth Machine</strong> &mdash;
    Numbers from <code>benchmark_results.jsonl</code> (real run, 84 questions on this repo).
    Regenerate: <code>pruvagraph benchmark-suite</code>
  </div>
</div>

<!-- PANEL 2 \u2014 Cascade Tier Map -->
<div id="tiermap" class="panel ${this._initialTab==="tiermap"?"active":""}">
  <div class="btn-row"><button class="btn" onclick="post('refresh')">&#8635; Refresh</button></div>
  <div class="card">
    <div class="card-title">Query Tier Distribution</div>
    ${d>0?`<div class="donut-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        ${Je.filter(l=>l.path).map(l=>`<path d="${l.path}" fill="${l.color}" opacity="0.88"/>`).join("")}
        <circle cx="${F}" cy="${N}" r="36" fill="var(--bg)"/>
        <text x="${F}" y="${N-5}" text-anchor="middle" font-size="20"
              font-family="var(--mono)" fill="var(--txt)" font-weight="700">${se}</text>
        <text x="${F}" y="${N+14}" text-anchor="middle" font-size="9"
              font-family="var(--fnt)" fill="var(--mut)">queries</text>
      </svg>
      <div class="legend">${we.filter(l=>c[l.key]>0).map(l=>`
        <div class="legend-row">
          <div class="dot" style="background:${l.color}"></div>
          <div>
            <div style="font-size:12px;">${l.label} <strong style="font-family:var(--mono)">${c[l.key]}</strong> <span style="color:var(--mut);font-size:11px;">(${(c[l.key]/se*100).toFixed(1)}%)</span></div>
            <div style="font-size:10px;color:var(--mut);margin-top:1px;">${l.desc}</div>
          </div>
        </div>`).join("")}</div>
    </div>`:'<div class="empty">No benchmark data.<br>Run: <code>pruvagraph benchmark-suite</code></div>'}
  </div>
  <div class="card">
    <div class="card-title">Tier Cost Reference</div>
    <table>
      <tr><th>Tier</th><th>Cost/Query</th><th>Mechanism</th></tr>
      <tr><td style="color:#3fb950;">0 \u2014 Cache</td><td style="font-family:var(--mono);">$0.000</td><td style="color:var(--mut);">Exact query cache hit</td></tr>
      <tr><td style="color:#39C5CF;">1 \u2014 Deterministic</td><td style="font-family:var(--mono);">$0.000</td><td style="color:var(--mut);">Graph traversal, no LLM</td></tr>
      <tr><td style="color:#58a6ff;">2 \u2014 Embedding</td><td style="font-family:var(--mono);">~$0.00001</td><td style="color:var(--mut);">Local BAAI embed, no API</td></tr>
      <tr><td style="color:#D29922;">3 \u2014 LLM Subgraph</td><td style="font-family:var(--mono);">~$0.0001</td><td style="color:var(--mut);">LLM on 2-hop graph (~450 tokens avg)</td></tr>
    </table>
  </div>
</div>

<!-- PANEL 3 \u2014 Agent Run Timeline -->
<div id="timeline" class="panel ${this._initialTab==="timeline"?"active":""}">
  <div class="btn-row"><button class="btn" onclick="post('refresh')">&#8635; Refresh</button></div>
  <div class="card">
    <div class="card-title">TaskWeaver \u2014 Agent Checkpoints</div>
    ${ye.length>0?`<div class="timeline">${ye.map(l=>`
      <div class="timeline-task">
        <div class="t-task-id">Task: ${H(l)}</div>
        <div class="t-track">${M[l].map((m,z)=>`
          <div class="t-item ${m.status}">
            <div class="t-desc">${z+1}. ${H(m.description)}
              &nbsp;<span class="sbadge ${m.status}">${m.status}</span></div>
            <div class="t-meta">
              ${m.git_sha?`<span class="sha">${m.git_sha.slice(0,8)}</span>&nbsp;&nbsp;`:""}
              ${H((m.created_at||"").replace("T"," ").replace("Z",""))}</div>
          </div>`).join("")}
        </div>
      </div>`).join("")}</div>`:'<div class="empty">No checkpoints yet.<br><br>Use the MCP tool <code>create_checkpoint</code> or CLI:<br><code>pruvagraph checkpoint --task my-task --description "..."</code></div>'}
  </div>
</div>

<!-- PANEL 4 \u2014 Token Budget Meter -->
<div id="budget" class="panel ${this._initialTab==="budget"?"active":""}">
  <div class="btn-row">
    <button class="btn" onclick="post('setBudget')">+ Set Budget</button>
    <button class="btn ghost" onclick="post('refresh')">&#8635; Refresh</button>
  </div>
  <div class="card">
    <div class="card-title">Session Token Budget</div>
    <div class="budget-wrap">
      <div style="flex-shrink:0;">
        <svg width="128" height="128" viewBox="0 0 128 128">
          <!-- Track -->
          <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="13"/>
          <!-- Arc -->
          <circle cx="64" cy="64" r="54" fill="none" stroke="${w}" stroke-width="13"
            stroke-dasharray="${h} 339.29" stroke-linecap="round"
            transform="rotate(-90 64 64)"
            style="transition:stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1);filter:drop-shadow(0 0 6px ${w});"/>
          <!-- Center text -->
          <text x="64" y="59" text-anchor="middle" font-family="var(--mono)"
            font-size="22" font-weight="700" fill="${w}">${v.toFixed(0)}%</text>
          <text x="64" y="76" text-anchor="middle" font-family="var(--fnt)"
            font-size="10" fill="var(--mut)">token usage</text>
        </svg>
        <div class="bstatus ${t.status}" style="margin-top:6px;">${t.status==="NO_BUDGET"?"Not Set":t.status}</div>
      </div>
      <div class="budget-details">
        ${t.session_set?`
        <div class="b-row"><span>Budget Cap</span><span class="val">${(t.cap||0).toLocaleString()} tok</span></div>
        <div class="b-row"><span>Spent</span><span class="val">${(t.spent||0).toLocaleString()} (${v.toFixed(1)}%)</span></div>
        <div class="b-row"><span>Remaining</span><span class="val" style="color:${w}">${(t.remaining||0).toLocaleString()}</span></div>
        <div class="b-row"><span>Status</span><span class="val" style="color:${w}">${t.status}</span></div>
        `:`<div style="color:var(--mut);font-size:12px;line-height:1.7;">
          No budget configured.<br><br>
          Click <strong style="color:var(--txt);">+ Set Budget</strong> to set a token cap.
          Auto-tracked via <code>_dispatch()</code> on every MCP call.
        </div>`}
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">How Budget Tracking Works</div>
    <div style="font-size:12px;color:var(--mut);line-height:1.8;">
      Every MCP tool call flows through <code>_dispatch()</code>, which estimates tokens
      as <code>len(result) // 4</code> and records spend automatically &mdash; zero agent effort.<br><br>
      Thresholds:&nbsp;
      <span style="color:var(--cyn);">OK</span> (&lt;80%)&nbsp;&nbsp;
      <span style="color:var(--amb);">WARNING</span> (80&ndash;99%)&nbsp;&nbsp;
      <span style="color:var(--red);">EXCEEDED</span> (&ge;100%)
    </div>
  </div>
</div>

<script>
const vscode = acquireVsCodeApi();
function post(cmd) { vscode.postMessage({ command: cmd }); }
function sw(name) {
  ['dashboard','tiermap','timeline','budget'].forEach((id, i) => {
    document.getElementById(id).classList.toggle('active', id === name);
    document.querySelectorAll('.tab')[i].classList.toggle('active', id === name);
  });
}
</script>
</body></html>`}dispose(){k.currentPanel=void 0,this._panel.dispose(),this._disposables.forEach(e=>e.dispose()),this._disposables=[]}};s(k,"PruvaGraphDashboard"),j(k,"currentPanel"),j(k,"viewType","pruvagraphDashboard");var fe=k;He.exports={PruvaGraphDashboard:fe,_loadBenchmarkData:Ge}});var Qe=L((va,Ue)=>{"use strict";var xe=require("vscode"),D;function qt(a){D=a,We()&&Ve("pruvagraph.telemetry.activations")}s(qt,"initTelemetry");function Ot(a){We()&&Ve(`pruvagraph.telemetry.cmd.${a}`)}s(Ot,"trackCommand");function Gt(){if(!D)return{};let a={},e=D.globalState.keys().filter(t=>t.startsWith("pruvagraph.telemetry."));for(let t of e)a[t]=D.globalState.get(t,0);return a}s(Gt,"getTelemetrySummary");function We(){return typeof xe.env.isTelemetryEnabled=="boolean"?xe.env.isTelemetryEnabled:xe.workspace.getConfiguration("telemetry").get("enableTelemetry",!0)}s(We,"_isEnabled");function Ve(a){if(!D)return;let e=D.globalState.get(a,0);D.globalState.update(a,e+1)}s(Ve,"_increment");Ue.exports={initTelemetry:qt,trackCommand:Ot,getTelemetrySummary:Gt}});var R=require("vscode"),{setOutputChannel:Ht,log:Q}=$(),{initCliRunner:jt,spawnCLI:Wt,sendStatus:Vt,sendSavingsReceipt:Ut}=W(),{initDriftGuard:Ye}=ze(),{PruvaGraphViewProvider:Qt,getPanel:Yt}=qe(),{PruvaGraphDashboard:ne}=je(),{initTelemetry:Jt,trackCommand:Xt}=Qe(),f=te();function Kt(a){let e=R.window.createOutputChannel("PruvaGraph");Ht(e);let t=R.window.createStatusBarItem(R.StatusBarAlignment.Right,100);t.command="pruvagraph.costReport",t.text="$(graph) PruvaGraph",t.tooltip="Open PruvaGraph Cost Report",t.show(),a.subscriptions.push(t),jt({statusBarItem:t,getPanel:Yt});let r=new Qt(a.extensionUri);a.subscriptions.push(R.window.registerWebviewViewProvider("pruvagraphPanel",r)),[["pruvagraph.build",()=>f.runBuild(r)],["pruvagraph.buildFast",()=>f.runBuildFast(r)],["pruvagraph.query",()=>f.runQuery(r)],["pruvagraph.costReport",()=>f.runCostReport(r)],["pruvagraph.installMCP",()=>f.runInstallMCP(r)],["pruvagraph.openViz",()=>f.openVisualizer()],["pruvagraph.clearCache",()=>f.clearCache(r)],["pruvagraph.watchToggle",()=>f.toggleWatch(r)],["pruvagraph.findCallers",()=>f.findCallers(r)],["pruvagraph.getDeps",()=>f.getDependencies(r)],["pruvagraph.installPkg",()=>f.runInstallPkg(r)],["pruvagraph.dryRun",()=>f.runDryRun(r)],["pruvagraph.showDiff",()=>f.showDiff(r)],["pruvagraph.analyzeImpact",()=>f.analyzeImpact(r)],["pruvagraph.buildMonorepo",()=>f.buildMonorepo(r)],["pruvagraph.showDashboard",()=>ne.createOrShow(a)],["pruvagraph.showTierMap",()=>ne.createOrShow(a,"tiermap")],["pruvagraph.showTimeline",()=>ne.createOrShow(a,"timeline")],["pruvagraph.showBudget",()=>ne.createOrShow(a,"budget")]].forEach(([o,i])=>{a.subscriptions.push(R.commands.registerCommand(o,()=>(Xt(o),i())))}),Ye(a),Jt(a),a.subscriptions.push(R.workspace.onDidChangeConfiguration(o=>{if(!["pruvagraph.modules.driftguard.enabled","pruvagraph.modules.contextlens.enabled","pruvagraph.modules.ghostmemory.enabled","pruvagraph.modules.taskweaver.enabled","pruvagraph.modules.budgetgovernor.enabled","pruvagraph.modules.rulesforge.enabled"].some(h=>o.affectsConfiguration(h)))return;let{getWorkspaceRoot:g}=$(),u=g();if(!u)return;let d=f.getDisabledModules(),c=d.length>0?d.join(","):"(none)";Q(`[settings-gating] Module toggle changed \u2014 re-writing MCP configs. Disabled: ${c}`);let b=["install"];d.length>0&&b.push("--disable-modules",d.join(","));let v=Wt("pruvagraph",b,u);v.on("exit",h=>{h===0?(Q("[settings-gating] MCP config files updated \u2713 \u2014 restart MCP server to apply."),R.window.showInformationMessage(`PruvaGraph: MCP config updated (disabled: ${c}). Restart MCP server to apply.`)):Q(`[settings-gating] pruvagraph install exited ${h} \u2014 MCP config may be stale.`)}),v.on("error",h=>{Q(`[settings-gating] Could not update MCP config: ${h.message}`)})})),Q("PRUVALEX PruvaGraph activated \u2713")}s(Kt,"activate");function Zt(){}s(Zt,"deactivate");module.exports={activate:Kt,deactivate:Zt,initDriftGuard:Ye,sendStatus:Vt,sendSavingsReceipt:Ut};
