const out = document.getElementById("out");
const api = (p) => fetch(p).then((r) => r.json());

document.getElementById("pingBtn").addEventListener("click", async () => {
  try {
    out.textContent = JSON.stringify(await api("/api/ping"), null, 2);
  } catch (e) {
    out.textContent = String(e);
  }
});

document.getElementById("rollBtn").addEventListener("click", async () => {
  const f = document.getElementById("faces").value || 6;
  const c = document.getElementById("count").value || 5;
  try {
    out.textContent = JSON.stringify(
      await api(`/api/roll?faces=${f}&count=${c}`),
      null,
      2
    );
  } catch (e) {
    out.textContent = String(e);
  }
});

document.getElementById("noCorsBtn").addEventListener("click", async () => {
  const f = document.getElementById("faces").value || 6;
  const c = document.getElementById("count").value || 5;
  try {
    // This will work here (same origin). It will fail from your static site (CORS demo).
    out.textContent = JSON.stringify(
      await api(`/api/roll-no-cors?faces=${f}&count=${c}`),
      null,
      2
    );
  } catch (e) {
    out.textContent = String(e);
  }
});
