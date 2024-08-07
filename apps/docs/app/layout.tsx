import { ClerkProvider } from "@clerk/nextjs";
import "@repo/ui/globals.css";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Builder.",
  description: "Automate Your Work With Dev Builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
