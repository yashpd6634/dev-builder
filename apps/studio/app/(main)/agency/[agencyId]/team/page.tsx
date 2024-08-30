import React from "react";
import db from "@repo/db/client";
import DataTable from "@repo/ui/components/table/data-table";
import { Plus } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { columns } from "@repo/ui/components/table/columns";
import SendInvitation from "@repo/ui/components/forms/send-invitation";

type Props = {
  params: { agencyId: string };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      data={teamMembers}
      columns={columns}
    />
  );
};

export default TeamPage;
