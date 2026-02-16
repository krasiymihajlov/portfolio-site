import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/presentation/components/Header";
import Footer from "@/presentation/components/Footer";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { ThemeProvider } from "@/presentation/contexts/ThemeContext";
import { DIProvider } from "@/infrastructure/di/DIProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Професионално портфолио и CV генератор",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-900 transition-colors`}
      >
        <DIProvider>
          <ThemeProvider>
            <AuthProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </DIProvider>
      </body>
    </html>
  );
}
