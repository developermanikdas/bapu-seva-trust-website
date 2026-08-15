import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import AIChatButton from "@/components/AIChatButton.jsx";
import { Providers } from "./providers.jsx";

export const metadata = {
  title: "Bapu Seva Trust | Building A Progressive & Uplifted Society",
  description: "Empowering women, nurturing children, and transforming futures across Bihar, Navi Mumbai & Delhi.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <AIChatButton />
        </Providers>
      </body>
    </html>
  );
}
