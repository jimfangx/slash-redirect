// Add shortcuts here.
// Key: what you type in the omnibox (without scheme), Value: where to go.
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

// Chrome often turns bare words into http://<word>/ or http://<word>
function normalizeToKey(url) {
  try {
    const u = new URL(url);

    // Only intercept these “guessed” navigations.
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;

    // We only want bare hostnames like docs, meet (no dots),
    // and no path beyond "/" (Chrome sometimes adds "/" automatically).
    const host = u.hostname;        // "docs"
    const path = u.pathname || "/"; // "/"

    if (host.includes(".")) return null;     // ignore real domains like docs.google.com
    if (path !== "/" && path !== "") return null; // ignore http://docs/something

    return host;
  } catch {
    return null;
  }
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const key = normalizeToKey(details.url);
  if (!key) return;

  const target = ROUTES[key];
  if (!target) return;

  // Avoid redirect loops if user already is on the target
  if (details.url === target) return;

  chrome.tabs.update(details.tabId, { url: target });
});
