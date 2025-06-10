// src/components/Header.tsx
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <header className="flex items-center justify-between p-4  mb-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-300">
          Bee
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button
          variant="outline"
          className="rounded-full px-4 py-2 text-sm transition-colors"
        >
          Connected
        </Button>

        <Avatar>
          <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
