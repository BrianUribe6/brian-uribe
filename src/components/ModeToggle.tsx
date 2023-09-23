import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme";

const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

export function ModeToggle() {
  useEffect(() => {
    const handleSystemThemeChange = () => {
      const theme = getStoredTheme();
      if (theme === "system") {
        setTheme("system");
      }
    };
    const media = window.matchMedia(PREFERS_DARK_QUERY);
    media.addEventListener("change", handleSystemThemeChange);
    return () => {
      media.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 motion-safe:duration-500 motion-safe:origin-[center_96px]" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all motion-safe:duration-500 dark:rotate-0 dark:scale-100 motion-safe:origin-[center_96px]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getStoredTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    if (theme) {
      return theme as Theme;
    }
  }
  return "system";
}

function getSystemTheme(e?: MediaQueryListEvent | MediaQueryList) {
  e ??= window.matchMedia(PREFERS_DARK_QUERY);
  return e.matches ? "dark" : "light";
}

function setTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    theme = getSystemTheme();
  }
  root.classList.add(theme);
}
