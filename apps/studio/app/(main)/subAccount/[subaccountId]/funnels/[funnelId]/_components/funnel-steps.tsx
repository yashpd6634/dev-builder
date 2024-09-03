"use client";

import { FunnelsForSubAccount } from "@repo/ui/lib/types";
import { FunnelPage } from "@prisma/client";
import React, { useState } from "react";
import { useModal } from "@repo/ui/providers/modal-provider";

type Props = {
  funnel: FunnelsForSubAccount;
  subaccountId: string;
  pages: FunnelPage[];
  funnelId: string;
};

const FunnelSteps = ({ funnel, funnelId, pages, subaccountId }: Props) => {
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(
    pages[0],
  );
  const { setOpen } = useModal();
  const [pagesState, setPagesState] = useState(pages);

  return <div>FunnelSteps</div>;
};

export default FunnelSteps;
