const $ = (sel) => document.querySelector(sel);
const out = $("#out");

function show(obj) {
  out.textContent = JSON.stringify(obj, null, 2);
}

$("#pingBtn").addEventListener("click", async () => {
  try {
    const r = await fetch("/api/ping");
    show(await r.json());
  } catch (e) {
    show({ error: String(e) });
  }
});

$("#rollBtn").addEventListener("click", async () => {
  const faces = $("#faces").value || 6;
  const count = $("#count").value || 5;
  try {
    const r = await fetch(`/api/roll?faces=${faces}&count=${count}`);
    show(await r.json());
  } catch (e) {
    show({ error: String(e) });
  }
});

$("#rollNoCorsBtn").addEventListener("click", async () => {
  const faces = $("#faces").value || 6;
  const count = $("#count").value || 5;
  try {
    const r = await fetch(`/api/roll-no-cors?faces=${faces}&count=${count}`);
    show(await r.json());
  } catch (e) {
    show({ error: String(e) });
  }
});
