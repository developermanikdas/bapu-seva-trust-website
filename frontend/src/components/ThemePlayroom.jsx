'use client';

import { useState, useEffect } from "react";
import { Palette, RotateCcw, Check, Sparkles } from "lucide-react";

export const THEME_PRESETS = [
  {
    name: "User Ocean Blue (Original 4-Shade)",
    id: "user-blue-4shade",
    colors: {
      lightBg: "#E3F2FD",
      softBlue: "#90CAF9",
      vibrantBlue: "#2196F3",
      deepNavy: "#0D47A1",
    },
    hslValues: {
      primary: "207 90% 54%",          // #2196F3
      primaryForeground: "0 0% 100%",
      secondary: "217 85% 34%",        // #0D47A1
      accent: "207 89% 77%",           // #90CAF9
      background: "204 89% 97%",       // Light tint from #E3F2FD
      foreground: "217 85% 15%",
      card: "0 0% 100%",
      cardForeground: "217 85% 15%",
      muted: "204 89% 94%",            // #E3F2FD
      sidebarBackground: "217 85% 34%",
    },
  },
  {
    name: "Deep Midnight Navy & Cyan",
    id: "midnight-cyan",
    colors: {
      lightBg: "#E0F7FA",
      softBlue: "#80DEEA",
      vibrantBlue: "#00ACC1",
      deepNavy: "#0A192F",
    },
    hslValues: {
      primary: "187 100% 38%",         // #00ACC1
      primaryForeground: "0 0% 100%",
      secondary: "217 65% 11%",        // #0A192F
      accent: "187 52% 71%",           // #80DEEA
      background: "187 60% 97%",       // #E0F7FA tint
      foreground: "217 65% 10%",
      card: "0 0% 100%",
      cardForeground: "217 65% 10%",
      muted: "187 60% 93%",
      sidebarBackground: "217 65% 11%",
    },
  },
  {
    name: "Royal Sapphire & Ice Blue",
    id: "royal-sapphire",
    colors: {
      lightBg: "#F0F4FE",
      softBlue: "#93C5FD",
      vibrantBlue: "#2563EB",
      deepNavy: "#1E3A8A",
    },
    hslValues: {
      primary: "221 83% 53%",          // #2563EB
      primaryForeground: "0 0% 100%",
      secondary: "224 64% 33%",        // #1E3A8A
      accent: "213 94% 78%",           // #93C5FD
      background: "223 80% 97%",
      foreground: "224 64% 12%",
      card: "0 0% 100%",
      cardForeground: "224 64% 12%",
      muted: "223 80% 93%",
      sidebarBackground: "224 64% 33%",
    },
  },
  {
    name: "Electric Cyan & Sky Blue",
    id: "electric-sky",
    colors: {
      lightBg: "#E0F2FE",
      softBlue: "#7DD3FC",
      vibrantBlue: "#0284C7",
      deepNavy: "#0C4A6E",
    },
    hslValues: {
      primary: "199 98% 39%",          // #0284C7
      primaryForeground: "0 0% 100%",
      secondary: "201 80% 24%",        // #0C4A6E
      accent: "199 95% 74%",           // #7DD3FC
      background: "204 94% 97%",
      foreground: "201 80% 10%",
      card: "0 0% 100%",
      cardForeground: "201 80% 10%",
      muted: "204 94% 93%",
      sidebarBackground: "201 80% 24%",
    },
  },
  {
    name: "Tech Cobalt & Steel Blue",
    id: "cobalt-steel",
    colors: {
      lightBg: "#EFF6FF",
      softBlue: "#BFDBFE",
      vibrantBlue: "#3B82F6",
      deepNavy: "#172554",
    },
    hslValues: {
      primary: "217 91% 60%",          // #3B82F6
      primaryForeground: "0 0% 100%",
      secondary: "226 57% 21%",        // #172554
      accent: "214 95% 87%",           // #BFDBFE
      background: "214 100% 97%",
      foreground: "226 57% 10%",
      card: "0 0% 100%",
      cardForeground: "226 57% 10%",
      muted: "214 100% 93%",
      sidebarBackground: "226 57% 21%",
    },
  },
  {
    name: "Nordic Slate & Pacific Navy",
    id: "nordic-pacific",
    colors: {
      lightBg: "#F1F5F9",
      softBlue: "#94A3B8",
      vibrantBlue: "#334155",
      deepNavy: "#0F172A",
    },
    hslValues: {
      primary: "215 25% 27%",          // #334155
      primaryForeground: "0 0% 100%",
      secondary: "222 47% 11%",        // #0F172A
      accent: "215 20% 65%",           // #94A3B8
      background: "210 40% 96%",
      foreground: "222 47% 10%",
      card: "0 0% 100%",
      cardForeground: "222 47% 10%",
      muted: "210 40% 91%",
      sidebarBackground: "222 47% 11%",
    },
  },
];

export default function ThemePlayroom() {
  const [activePreset, setActivePreset] = useState("cobalt-steel");
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = (presetId) => {
    const target = THEME_PRESETS.find((p) => p.id === presetId) || THEME_PRESETS[4];
    setActivePreset(target.id);

    const root = document.documentElement;
    Object.entries(target.hslValues).forEach(([key, val]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVar, val);
    });

    try {
      localStorage.setItem("bst_active_theme_preset", target.id);
    } catch (e) {
      console.error("Theme storage notice:", e);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bst_active_theme_preset");
      if (saved) {
        applyTheme(saved);
      } else {
        applyTheme("cobalt-steel");
      }
    } catch (e) {
      applyTheme("cobalt-steel");
    }
  }, []);

  return (
    <div className="border-t border-white/10 pt-6 mt-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        
        {/* Header Toggle */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Palette className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              Live Blue Theme Variations <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full border border-blue-400/30">6 Shades Integrated</span>
            </h4>
            <p className="text-[11px] text-gray-400">Switch between 6 distinct blue color variations to test your ideal look live.</p>
          </div>
        </div>

        {/* Action Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 font-semibold text-xs px-3.5 py-1.5 rounded-xl border border-blue-400/30 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          {isOpen ? "Hide Blue Color Variations" : "Explore Blue Color Variations"}
        </button>
      </div>

      {/* Expanded Palette Switcher Controls */}
      {isOpen && (
        <div className="mt-4 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4 animate-in fade-in zoom-in duration-150">
          <p className="text-xs font-semibold text-gray-300">Select any blue shade variation to test live across the website:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THEME_PRESETS.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyTheme(preset.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isActive
                      ? "bg-white/15 border-blue-400 ring-2 ring-blue-400/50 shadow-lg"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate pr-2">{preset.name}</span>
                    {isActive && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                  </div>

                  {/* 4 Color Swatches Display */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
                      style={{ backgroundColor: preset.colors.lightBg }}
                      title={`Light: ${preset.colors.lightBg}`}
                    />
                    <span
                      className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
                      style={{ backgroundColor: preset.colors.softBlue }}
                      title={`Soft: ${preset.colors.softBlue}`}
                    />
                    <span
                      className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
                      style={{ backgroundColor: preset.colors.vibrantBlue }}
                      title={`Vibrant: ${preset.colors.vibrantBlue}`}
                    />
                    <span
                      className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
                      style={{ backgroundColor: preset.colors.deepNavy }}
                      title={`Deep Navy: ${preset.colors.deepNavy}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* User Requested Colors Summary Display */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-gray-400 flex-wrap gap-2">
            <span>
              <strong>Active Palette:</strong> {THEME_PRESETS.find((p) => p.id === activePreset)?.name}
            </span>

            <button
              onClick={() => applyTheme("cobalt-steel")}
              className="text-blue-300 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset to Tech Cobalt & Steel Blue Palette (#EFF6FF, #BFDBFE, #3B82F6, #172554)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
