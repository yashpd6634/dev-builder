import { ClerkProvider } from "@clerk/nextjs";
import Infobar from "@repo/ui/components/infobar/index";
import Sidebar from "@repo/ui/components/sidebar/index";
import { dark } from "@clerk/themes";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
    >
      {/* <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="w-full">
          <Infobar /> */}
          {props.children}
        {/* </div>
      </div> */}
    </ClerkProvider>
  );
};

export default Layout;
