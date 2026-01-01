// Add shortcuts here: typed word -> target URL
const ROUTES = {
  "docs": "https://docs.google.com/",
  "sheets": "https://sheets.google.com/",
  "slides": "https://slides.google.com/",
  "meet": "https://meet.google.com/",
  "mail": "https://mail.google.com/",
  "forms": "https://forms.google.com/",
  "drive": "https://drive.google.com/",
  "where": "https://maps.google.com/",
  "cal": "https://calendar.google.com/",
  "when": "https://calendar.google.com/",
  "yt": "https://www.youtube.com/",
  "sites": "https://sites.google.com/",
  "gh": "https://github.com/",
  "ghp": "https://github.com/jimfangx/", // "github profile"
  "amazon": "https://www.amazon.com/",
  "chat": "https://chatgpt.com/",
  "gemini": "https://gemini.google.com/",
  "archive": "https://arxiv.org/",
  "latex": "https://www.overleaf.com/project",
  "who": "https://www.berkeley.edu/directory/",
};

function normalizeToKey(url) {
  try {
    const u = new URL(url);

    // Only intercept "guessed" navigations
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;

    const host = u.hostname;              // e.g. "docs"
    const path = u.pathname || "/";       // usually "/"

    // Don't touch real domains (anything with a dot)
    if (host.includes(".")) return null;

    // Only match bare host + root path
    if (path !== "/" && path !== "") return null;

    return host;
  } catch {
    return null;
  }
}

browser.webNavigation.onBeforeNavigate.addListener((details) => {
  const key = normalizeToKey(details.url);
  if (!key) return;

  const target = ROUTES[key];
  if (!target) return;

  // Update this tab to the target URL
  browser.tabs.update(details.tabId, { url: target });
});
