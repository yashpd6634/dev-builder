import db from "@repo/db/client";
import { getDomainContent } from "@repo/ui/lib/queries";
import EditorProvider from "@repo/ui/providers/editor/editor-provider";
import { notFound } from "next/navigation";
import React from "react";
import FunnelEditor from "../(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor";

const Page = async ({ params }: { params: { domain: string } }) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1));
  if (!domainData) return notFound();

  const pageData = domainData.FunnelPages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  await db.funnelPage.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default Page;
