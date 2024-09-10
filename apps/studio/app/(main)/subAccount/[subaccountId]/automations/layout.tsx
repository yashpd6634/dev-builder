import React from "react";
import Infobar from "@repo/ui/components/infobar/index";
import Sidebar from "@repo/ui/components/sidebar/index";
import BlurPage from "@repo/ui/components/global/blur-page";

type Props = {
  children: React.ReactNode;
  params: {
    subaccountId: string;
  };
};

const Layout = ({ children, params }: Props) => {
  console.log("agencyId signIn");
  return (
    <BlurPage>
      <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20">
        <div className="flex overflow-hidden h-screen">
          <Sidebar subaccountId={params.subaccountId} />
          <div className="w-full">
            {/* <Infobar /> */}
            {children}
          </div>
        </div>
      </div>
    </BlurPage>
  );
};

export default Layout;
