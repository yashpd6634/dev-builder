import { currentUser } from "@clerk/nextjs";
import db from "@repo/db/client";
import SubAccountDetails from "@repo/ui/components/forms/subaccount-details";
import UserDetails from "@repo/ui/components/forms/user-details";
import BlurPage from "@repo/ui/components/global/blur-page";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const SubaccountSettingPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0]?.emailAddress,
    },
  });
  if (!userDetails) return;

  const subAccount = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });
  if (!subAccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: { id: subAccount.agencyId },
    include: { SubAccount: true },
  });

  if (!agencyDetails) return;
  const subAccounts = agencyDetails.SubAccount;

  return (
    <BlurPage>
      {""}
      <div className="flex lg:!flex-row flex-col gap-2">
        <SubAccountDetails
          agencyDetails={agencyDetails}
          details={subAccount}
          userId={userDetails.id}
          userName={userDetails.name as string}
        />
        <UserDetails
          type="subaccount"
          id={params.subaccountId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </BlurPage>
  );
};

export default SubaccountSettingPage;
