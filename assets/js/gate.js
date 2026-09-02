// Simple client-side password gate for the portfolio/case-study page.
// NOTE: this is a light deterrent, not real security — the page content
// still ships in the HTML. It's meant to keep casual visitors and search
// engines out of a case study that shouldn't be publicly indexed, not to
// protect sensitive data.
(function () {
  var CORRECT_HASH = "d524632f279be5a4018391979be9e66bda71a5bce8a1b0f987fbfabb63d43bdb";
  var STORAGE_KEY = "pf_unlocked_v1";

  var gate = document.getElementById("gate");
  var content = document.getElementById("case-content");
  var form = document.getElementById("gate-form");
  var input = document.getElementById("gate-password");
  var error = document.getElementById("gate-error");

  function sha256Hex(text) {
    var enc = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", enc).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, "0");
        })
        .join("");
    });
  }

  function unlock() {
    gate.classList.add("hidden");
    content.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  // Already unlocked earlier in this browser tab/session?
  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    unlock();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    error.textContent = "";
    sha256Hex(input.value.trim()).then(function (hash) {
      if (hash === CORRECT_HASH) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        unlock();
      } else {
        error.textContent = "That password isn't right — try again.";
        input.value = "";
        input.focus();
      }
    });
  });
})();
