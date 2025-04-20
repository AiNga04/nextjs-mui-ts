import { Metadata } from "next";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";

// Define metadata for better SEO
export const metadata: Metadata = {
  title: "Music Streaming App",
  description:
    "A modern music streaming application built with Next.js and Material UI",
  icons: {
    icon: "/favicon.ico",
  },
};

// Define viewport separately
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <div className="app-container">
              <main>{children}</main>
            </div>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
