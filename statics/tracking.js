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

  // Texto visível do botão, sem a seta decorativa
  function labelOf(el) {
    if (!el) return null;
    var clone = el.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll("[aria-hidden='true']"), function (node) {
      node.parentNode.removeChild(node);
    });
    return (clone.textContent || "").replace(/\s+/g, " ").trim() || null;
  }

  // As variáveis nativas Click ID / Click URL / Click Classes do GTM só existem
  // nos eventos gtm.click / gtm.linkClick. Como este é um evento customizado,
  // os mesmos dados vão no push como cta_id, cta_url, cta_classes e cta_text.
  window.trackCTA = function (action, unit, el) {
    push("click_cta", {
      cta_action: action || "cta",
      cta_unit: unit || null,
      cta_id: (el && el.id) || null,
      cta_url: (el && el.href) || null,
      cta_text: labelOf(el),
      cta_classes: (el && el.className) || null
    });
  };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("a[data-action]");
    if (!el) return;
    window.trackCTA(el.dataset.action, el.dataset.unit, el);
  });

  push("page_view", { page_path: window.location.pathname });
})();
