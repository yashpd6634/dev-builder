"use client";

import MediaComponent from "@repo/ui/components/media/index";
import { getMedia } from "@repo/ui/lib/queries";
import { GetMediaFiles } from "@repo/ui/lib/types";
import React, { useEffect, useState } from "react";

type Props = {
  subaccountId: string;
};

const MediaBucketTab = ({ subaccountId }: Props) => {
  const [data, setdata] = useState<GetMediaFiles>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(subaccountId);
      setdata(response);
    };
    fetchData();
  }, [subaccountId]);

  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaComponent data={data} subAccountId={subaccountId} />
    </div>
  );
};

export default MediaBucketTab;
