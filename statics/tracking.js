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

  window.trackCTA = function (action, unit) {
    push("click_cta", { cta_action: action || "cta", cta_unit: unit || null });
  };

  push("page_view", { page_path: window.location.pathname });
})();
