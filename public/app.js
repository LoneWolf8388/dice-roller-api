(function () {
  const out = document.getElementById("out");
  const facesEl = document.getElementById("faces");
  const countEl = document.getElementById("count");

  const setOut = (obj) => {
    try {
      out.textContent =
        typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
    } catch {
      out.textContent = String(obj);
    }
  };

  const getNums = () => {
    const faces = parseInt(facesEl.value, 10) || 6;
    const count = parseInt(countEl.value, 10) || 1;
    return { faces, count };
  };

  document.getElementById("pingBtn").addEventListener("click", async () => {
    setOut("…pinging");
    try {
      const res = await fetch("/api/ping");
      setOut(await res.json());
    } catch (e) {
      setOut(`Ping error: ${e}`);
    }
  });

  document.getElementById("rollBtn").addEventListener("click", async () => {
    const { faces, count } = getNums();
    setOut("…rolling");
    try {
      const res = await fetch(`/api/roll?faces=${faces}&count=${count}`);
      setOut(await res.json());
    } catch (e) {
      setOut(`Roll error: ${e}`);
    }
  });

  document
    .getElementById("rollNoCorsBtn")
    .addEventListener("click", async () => {
      const { faces, count } = getNums();
      setOut("…rolling (no CORS)");
      try {
        const res = await fetch(
          `/api/roll-no-cors?faces=${faces}&count=${count}`
        );
        setOut(await res.json());
      } catch (e) {
        // When called from your Static Web App, this should fail due to CORS.
        setOut(`Expected CORS error (from static site): ${e}`);
      }
    });
})();
