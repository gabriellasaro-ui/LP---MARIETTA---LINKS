(function () {
  window.dataLayer = window.dataLayer || [];

  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function getUtms() {
    var params = new URLSearchParams(window.location.search);
    var utms = {};
    UTM_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) utms[key] = value;
    });
    return utms;
  }

  function push(event, payload) {
    window.dataLayer.push(Object.assign({ event: event }, getUtms(), payload || {}));
  }

  // Texto visivel do botao, sem a seta nem os icones decorativos
  function labelOf(el) {
    var clone = el.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll("[aria-hidden='true']"), function (node) {
      node.parentNode.removeChild(node);
    });
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  // As chaves gtm.element* fazem as variaveis nativas de clique do GTM
  // (Click ID, Click Text, Click URL...) resolverem neste evento personalizado.
  window.trackCTA = function (el) {
    if (!el) return;
    push("click_cta", {
      "gtm.element": el,
      "gtm.elementId": el.id || "",
      "gtm.elementClasses": el.className || "",
      "gtm.elementTarget": el.target || "",
      "gtm.elementUrl": el.href || "",
      "gtm.elementText": labelOf(el),
      cta_id: el.id || "",
      cta_action: el.dataset.action || "cta",
      cta_unit: el.dataset.unit || "",
      cta_text: labelOf(el),
      cta_url: el.href || ""
    });
  };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("a.btn[data-action]");
    if (!el) return;
    window.trackCTA(el);
  });

  push("page_view", { page_path: window.location.pathname });
})();
