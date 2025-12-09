import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-xs sm:text-sm px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-100 shadow-sm"
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
