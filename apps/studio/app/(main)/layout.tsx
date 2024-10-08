import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{ baseTheme: shadesOfPurple }}
    >
      {props.children}
    </ClerkProvider>
  );
};

export default Layout;
