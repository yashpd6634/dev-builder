import { currentUser } from "@clerk/nextjs";
import Sidebar from "@repo/ui/components/sidebar-2.tsx/index";
import Unauthorized from "@repo/ui/components/unauthorized/index";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@repo/ui/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const Layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/agency");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />;

  let allNotication: any = [];

  const notications = await getNotificationAndUser(agencyId);
  if (notications) allNotication = notications;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]"></div>
    </div>
  );
};

export default Layout;