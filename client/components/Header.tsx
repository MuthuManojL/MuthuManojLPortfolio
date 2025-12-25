import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsSunMoonToggle } from "@/bits/BitsSunMoonToggle";
import { Menu, X, Download, ArrowDown } from "lucide-react";

export default function Header() {
  const { tokens } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [avatarColorIndex, setAvatarColorIndex] = useState(0);

  // Array of colors for the avatar
  const avatarColors = [
    tokens.primary,      // primary blue/purple
    tokens.secondary,    // magenta/pink
    tokens.accent,       // cyan
    tokens.neon_violet,  // violet
  ];

  // Cycle through avatar colors - disco fast
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setAvatarColorIndex((prev) => (prev + 1) % avatarColors.length);
    }, 400); // Change color every 400ms - disco style

    return () => clearInterval(colorInterval);
  }, [avatarColors.length]);

  // Show arrow for 5 seconds after theme toggle
  const handleThemeToggleArrow = () => {
    setShowArrow(true);
    const timer = setTimeout(() => {
      setShowArrow(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  const navigation = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Internship", href: "/internship" },
    { label: "TechScreen", href: "/techscreen" },
    { label: "Contact", href: "/contact" },
    { label: "Resume", href: "/resume" },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume";
    link.target = "_blank";
    link.click();
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md"
      style={{
        borderColor: tokens.border,
        backgroundColor: `rgba(${tokens.surface === "#ffffff" ? "255, 255, 255" : "26, 31, 58"}, 0.95)`,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border"
            style={{
              borderColor: avatarColors[avatarColorIndex],
              backgroundColor: `rgba(99, 102, 241, 0.1)`,
              color: avatarColors[avatarColorIndex],
            }}
            animate={{
              borderColor: avatarColors[avatarColorIndex],
              color: avatarColors[avatarColorIndex],
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 20px ${avatarColors[avatarColorIndex]}40`,
            }}
          >
            M
          </motion.div>
          <div>
            <h1 className="font-bold text-lg hidden sm:block" style={{ color: tokens.text_primary }}>
              Muthu Manoj
            </h1>
            <p className="text-xs hidden sm:block" style={{ color: tokens.text_tertiary }}>
              Biomedical Engineer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item, idx) => (
            <motion.div
              key={item.href}
              variants={navItemVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group"
                style={{ color: tokens.text_secondary }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                  style={{ backgroundColor: tokens.primary }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative">
          {/* Download Resume Button */}
          <motion.button
            onClick={handleDownloadResume}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all"
            style={{
              borderColor: tokens.primary,
              color: tokens.primary,
              backgroundColor: `rgba(99, 102, 241, 0.1)`,
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: `rgba(99, 102, 241, 0.15)`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            <span className="text-sm">Resume</span>
          </motion.button>

          {/* Theme Toggle with Arrow Indicator */}
          <div className="relative inline-block">
            <BitsSunMoonToggle onToggle={handleThemeToggleArrow} />
            
            {/* Always Visible Arrow Above Theme Button - indicates it's clickable */}
            {showArrow && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full -mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  style={{ color: tokens.accent }}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown size={20} strokeWidth={2.5} className="rotate-180" />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border"
            style={{
              borderColor: tokens.border,
              color: tokens.text_primary,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden"
        style={{
          borderTop: `1px solid ${tokens.border}`,
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium transition-all border"
              style={{
                borderColor: tokens.border,
                backgroundColor: `rgba(99, 102, 241, 0.05)`,
                color: tokens.text_secondary,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
