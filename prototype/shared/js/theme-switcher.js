/**
 * THEME SWITCHER & ROLE SIMULATOR BAR (Apple HIG)
 * Mengontrol 8 tema visual standar Pemkot Yogyakarta dan bar simulasi peran.
 */

const THEMES = [
  { id: "default", name: "Yogyakarta Classic Navy", color: "#1E3A8A", dark: false },
  { id: "emerald", name: "Emerald Teal (SDI)", color: "#0D9488", dark: false },
  { id: "royal", name: "Royal Modern Blue", color: "#2563EB", dark: false },
  { id: "kraton", name: "Kraton Heritage Gold", color: "#B45309", dark: false },
  { id: "dark-midnight", name: "Dark Midnight Pro", color: "#3B82F6", dark: true },
  { id: "dark-slate", name: "Dark Slate Dev", color: "#10B981", dark: true }
];

class ThemeManager {
  static init() {
    const savedTheme = localStorage.getItem("MPSI_THEME") || "default";
    this.applyTheme(savedTheme);
    this.renderFloatingControl();
  }

  static applyTheme(themeId) {
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
    localStorage.setItem("MPSI_THEME", themeId);
  }

  static renderFloatingControl() {
    // Avoid double render
    if (document.getElementById("appleThemeFab")) return;

    const fab = document.createElement("div");
    fab.id = "appleThemeFab";
    fab.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-glass-card, rgba(255, 255, 255, 0.9));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-subtle, #E2E8F0);
      padding: 6px 12px;
      border-radius: 9999px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-main, #0F172A);
      transition: all 0.2s ease;
    `;

    fab.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px; cursor:default;">
        <span style="width:10px; height:10px; border-radius:50%; background:var(--primary, #1E3A8A); display:inline-block;"></span>
        Tema:
      </span>
      <select id="themeSelectDropdown" style="
        background: transparent;
        border: none;
        font-size: 12px;
        font-weight: 600;
        color: inherit;
        outline: none;
        cursor: pointer;
        padding-right: 4px;
      ">
        ${THEMES.map(t => `<option value="${t.id}">${t.name}</option>`).join("")}
      </select>
    `;

    document.body.appendChild(fab);

    const select = fab.querySelector("#themeSelectDropdown");
    const currentTheme = localStorage.getItem("MPSI_THEME") || "default";
    select.value = currentTheme;

    select.addEventListener("change", (e) => {
      this.applyTheme(e.target.value);
    });
  }
}

// Auto init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
});

window.ThemeManager = ThemeManager;
