import { ConnectionsProvider } from "@ui/providers/connections-provider";
import EditorProvider from "@ui/providers/editor-provider";
import React from "react";
import EditorCanvas from "./_components/editor-canvas";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;
