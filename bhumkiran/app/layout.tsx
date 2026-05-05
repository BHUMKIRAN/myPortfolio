import type { Metadata } from "next";
import Providers from "@/providers/QueryProvider"
import "./globals.css";

const siteName = "Bhum Kiran";
const siteTitle = "Bhum Bikram Silwal kiran";
const siteDescription =
  "Portfolio of Bhum Bikram Silwal, a software engineer from Nepal building modern web experiences with thoughtful design and reliable engineering.";
const siteUrl = "https://bhumkiran.com.np";
const ogImage = `${siteUrl}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitle} | Software Engineer`,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: `${siteUrl}`,
  },
  authors: [{ name: siteTitle, url: siteUrl }],
  creator: siteTitle,
  publisher: siteTitle,
  category: "portfolio",
  keywords: [
    "Bhum Bikram Silwal",
    "Bhum Kiran",
    "Kiran khatri",
    "bhumkiran.com.np",
    "Software Engineer Nepal",
    "Full Stack Developer Nepal",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
    "Nepal",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en-NP",
    url: siteUrl,
    siteName,
    title: `${siteTitle} | Software Engineer`,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteTitle} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | Software Engineer`,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.png",
  },
  themeColor: "#f8005f",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NP" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)] text-[var(--foreground)]">
        <Providers>
           <div className="flex min-h-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
