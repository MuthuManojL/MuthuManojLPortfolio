import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { tokens } = useTheme();

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className={cn("min-h-screen flex items-center justify-center", isDarkMode ? "bg-tech-darker" : "bg-slate-50")}>
      <div className="text-center px-4">
        <h1 className="text-6xl sm:text-8xl font-bold mb-4" style={{ color: tokens.primary }}>404</h1>
        <p className="text-xl sm:text-2xl mb-6" style={{ color: tokens.text_secondary }}>Oops! Page not found</p>
        <a href="/">
          <Button size="lg">
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
