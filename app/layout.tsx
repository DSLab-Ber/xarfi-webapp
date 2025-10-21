import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/providers/language-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Head from "next/head";
import QueryProvider from "@/providers/query-provider";
import Toast from "@/lib/Toast";
import { LocationProvider } from "@/lib/LocationProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xarfi: Salon Booking App in Berlin for Easy Beauty Booking",
  description: "Salon Booking App in Berlin for Easy Beauty Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body
        className={`${urbanist.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>
              <LocationProvider>
                <Toast />
                {children}
              </LocationProvider>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
