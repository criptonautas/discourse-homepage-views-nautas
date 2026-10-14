import { apiInitializer } from "discourse/lib/api";
import launchedFromApp from "../lib/launched-from-app";

// Inside the app, links to our own subdomains (setting `app_subdomains`) open in the
// same window with ?volver=<this page>, so the button each subdomain serves through
// nginx can bring people straight back. Outside the app links behave as usual, and
// hosts not in the list (the CDN, auth, anything new) are never touched.
export default apiInitializer(() => {
  const hosts = new Set(
    (settings.app_subdomains || "")
      .split("|")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean)
  );
  if (!hosts.size || !launchedFromApp()) {
    return;
  }

  // Capture phase on document runs before Discourse's link click tracking, which
  // would otherwise open the link in a new tab.
  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download")) {
        return;
      }

      let url;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (
        url.protocol !== "https:" ||
        !hosts.has(url.hostname) ||
        url.hostname === window.location.hostname
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const here =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      url.searchParams.set("volver", here);

      // Most apps lose ?volver on the way in (a login redirect, their own router), so
      // the return page also travels in a short cookie on the domain both hosts share,
      // naming its target so other hosts (e.g. the login page) leave it alone.
      const ours = window.location.hostname.split(".").reverse();
      const theirs = url.hostname.split(".").reverse();
      let shared = 0;
      while (shared < ours.length && ours[shared] === theirs[shared]) {
        shared++;
      }
      if (shared >= 2) {
        const domain = ours.slice(0, shared).reverse().join(".");
        const value = encodeURIComponent(
          JSON.stringify({ to: url.hostname, back: here })
        );
        document.cookie = `comunidad_volver=${value}; domain=${domain}; path=/; max-age=600; secure; samesite=lax`;
      }

      window.location.assign(url.href);
    },
    true
  );
});
