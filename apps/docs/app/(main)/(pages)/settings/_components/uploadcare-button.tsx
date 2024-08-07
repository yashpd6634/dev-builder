"use client";
import React, { useEffect, useRef } from "react";
import * as UC from "@uploadcare/file-uploader";
import { useRouter } from "next/navigation";
import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css";

UC.defineComponents(UC);

type Props = {
  onUpload: (e: string) => any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    typeof UC.UploadCtxProvider.prototype & UC.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      console.log(e);
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };

    ctxProviderRef.current?.addEventListener(
      "file-upload-success",
      handleUpload,
    );
  }, []);

  return (
    <div>
      <uc-config
        ctx-name="my-uploader"
        pubkey="43202cfc9dbd7721351f"
      ></uc-config>

      <uc-file-uploader-regular
        ctx-name="my-uploader"
        class="uc-light"
      ></uc-file-uploader-regular>

      <uc-upload-ctx-provider
        ctx-name="my-uploader"
        id="my-uploader-provider"
        ref={ctxProviderRef}
      ></uc-upload-ctx-provider>
    </div>
  );
};

export default UploadCareButton;
