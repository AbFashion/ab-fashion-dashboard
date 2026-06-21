/* AB Fashion brand overlay — recolors the dashboard to the emerald/copper theme
   and swaps the "AB" logo box for the AB emblem. Loaded by index.html. */
(function () {
  // 1) Brand palette: redefine CSS variables + hardcoded KPI gradients
  var css = ''
    + ':root{'
    + '--purple:#0e7c66;--purple-d:#0a5d4b;--blue:#15a085;--blue-d:#0c6657;'
    + '--teal:#16b39a;--teal-d:#0e7c66;--green:#b9772f;--green-d:#9a6024;'
    + '--orange:#c8923f;--pink:#caa45f;--bg:#f4f2ec;--text:#1e2620;--muted:#7c857d;--border:#e7e3d8;}'
    + '.k2{background:linear-gradient(135deg,#16b39a,var(--blue-d))!important;}'
    + '.k5{background:linear-gradient(135deg,#15a085,#0a5d4b)!important;}'
    + '.k6{background:linear-gradient(135deg,#c8923f,#a8682a)!important;}'
    + '.k7{background:linear-gradient(135deg,#caa45f,#8a6d1f)!important;}'
    + '.k8{background:linear-gradient(135deg,#0e7c66,#0a4a3d)!important;}'
    + 'header .brand .logo,#lockscreen .lock-card .logo{background:#072019!important;border:1px solid rgba(216,154,85,.6);padding:4px;}'
    + 'header .brand .logo svg,#lockscreen .lock-card .logo svg{width:100%;height:100%;display:block;}'
    + '.pill.retail{background:#e4f3ef!important;color:#0e7c66!important;}'
    + '.pill.wholesale{background:#f6ecdc!important;color:#a8682a!important;}'
    + '.section-title .dot{background:#0e7c66!important;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // 2) AB emblem logo
  var LOGO = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'
    + '<circle cx="50" cy="50" r="47" fill="none" stroke="#15a085" stroke-width="3"/>'
    + '<circle cx="50" cy="50" r="42" fill="none" stroke="#15a085" stroke-width="1.4"/>'
    + '<circle cx="50" cy="50" r="37" fill="none" stroke="#c4863f" stroke-width="2.2" stroke-dasharray="1.5 4.4"/>'
    + '<circle cx="50" cy="50" r="30" fill="none" stroke="#15a085" stroke-width="1.4"/>'
    + '<text x="37" y="60" font-family="Brush Script MT,Segoe Script,cursive" font-size="34" fill="#ffffff" font-style="italic">A</text>'
    + '<text x="51" y="62" font-family="Brush Script MT,Segoe Script,cursive" font-size="34" fill="#c4863f" font-style="italic">B</text>'
    + '<text x="50" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#15a085">Fashion</text></svg>';
  function setLogos() {
    document.querySelectorAll('.logo').forEach(function (el) {
      if (!el.querySelector('svg')) el.innerHTML = LOGO;
    });
  }

  // 3) Recolor existing charts (map old palette -> brand)
  var MAP = {'#7c5cf0':'#0e7c66','#6c4ed9':'#0a5d4b','#4f7df0':'#15a085','#3d63d8':'#0c6657',
    '#1fc8c8':'#16b39a','#15a8a8':'#0e7c66','#3ecf8e':'#b9772f','#2db97a':'#9a6024',
    '#ff9f5a':'#c8923f','#f97c2c':'#a8682a','#ff6f9f':'#caa45f','#ee4a82':'#8a6d1f',
    '#5b6ef0':'#16b39a','#9b6cf0':'#15a085','#7c4ed9':'#0a5d4b','#2c4fd0':'#0a4a3d'};
  function mc(v) {
    if (typeof v === 'string') { var o = v; for (var k in MAP) { o = o.split(k).join(MAP[k]); o = o.split(k.toUpperCase()).join(MAP[k]); } return o; }
    if (Array.isArray(v)) return v.map(mc);
    return v;
  }
  function recolor() {
    try {
      if (!window.Chart || !Chart.instances) return;
      Object.keys(Chart.instances).forEach(function (id) {
        var c = Chart.instances[id];
        (c.data.datasets || []).forEach(function (ds) {
          ['backgroundColor','borderColor','hoverBackgroundColor','pointBackgroundColor','pointBorderColor'].forEach(function (p) {
            if (ds[p] != null) ds[p] = mc(ds[p]);
          });
        });
        c.update('none');
      });
    } catch (e) {}
  }
  function run() { setLogos(); recolor(); }
  document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 400); });
  window.addEventListener('load', function () { setTimeout(run, 300); setTimeout(run, 1200); });
})();
