(function () {
  function isExternal(link) {
    try {
      const url = new URL(link.href, window.location.href);
      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  function shouldSkip(link) {
    const href = link.getAttribute("href") || "";
    return (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.hasAttribute("target") // don't override if you explicitly set it
    );
  }

  function setTargets() {
    document.querySelectorAll("a[href]").forEach((link) => {
      if (shouldSkip(link)) return;
      if (!isExternal(link)) return;

      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setTargets);
  } else {
    setTargets();
  }
})();
