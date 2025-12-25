import { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useTheme } from "@/theme/ThemeProvider";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { tokens } = useTheme();

  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: tokens.background,
        color: tokens.text_primary,
      }}
    >
      <Header />

      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
