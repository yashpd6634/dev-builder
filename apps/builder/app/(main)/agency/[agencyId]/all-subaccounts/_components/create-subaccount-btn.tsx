"use client";

import React from "react";
import { Agency, AgencySidebarOption, SubAccount, User } from "@prisma/client";
import { useModal } from "@repo/ui/providers/modal-provider";
import { twMerge } from "tailwind-merge";
import { Button } from "@repo/ui/components/ui/button";
import { CustomModal2 } from "@repo/ui/components/global/custom-modal";
import SubAccountDetails from "@repo/ui/components/forms/subaccount-details";
import { PlusCircleIcon } from "lucide-react";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

const CreateSubaccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4", className)}
      onClick={() => {
        <CustomModal2
          title="Create a Subaccount"
          subheading="You can switch between"
        >
          <SubAccountDetails
            agencyDetails={agencyDetails}
            userId={user.id}
            userName={user.name as string}
          />
        </CustomModal2>;
      }}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  );
};

export default CreateSubaccountButton;
