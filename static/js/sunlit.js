function sunlitToggle() {
  const body = document.body;
  body.classList.add("sunlit-animation-ready");
  body.classList.toggle("sunlit-dark");
}

function sunlitSetEnabled(enabled) {
  const body = document.body;
  if (enabled) {
    body.classList.add("sunlit-on");
  } else {
    body.classList.remove("sunlit-on", "sunlit-animation-ready", "sunlit-dark");
  }
  try {
    localStorage.setItem("sunlit-enabled", enabled ? "1" : "0");
  } catch {}
}

function sunlitIsEnabled() {
  try {
    return localStorage.getItem("sunlit-enabled") === "1";
  } catch {
    return false;
  }
}

function initSunlit() {
  const enabled = sunlitIsEnabled();
  if (enabled) sunlitSetEnabled(true);

  const btn = document.getElementById("sunlit-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const isOn = document.body.classList.contains("sunlit-on");
      sunlitSetEnabled(!isOn);
      if (!isOn) sunlitToggle(); // start with a visible state
    });
  }

  document.addEventListener("keydown", (event) => {
    // Space toggles the sun overlay on/off (like the demo)
    if (event.code === "Space") {
      event.preventDefault();
      const isOn = document.body.classList.contains("sunlit-on");
      sunlitSetEnabled(!isOn);
      if (!isOn) sunlitToggle();
      return;
    }
    // When overlay is enabled, allow "S" to toggle day/night feel (optional)
    if (!document.body.classList.contains("sunlit-on")) return;
    if (event.key.toLowerCase() === "s") {
      sunlitToggle();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSunlit);
} else {
  initSunlit();
}

