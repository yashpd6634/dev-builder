"use client";
import { EditorCanvasTypes, AutomationEditorNodeType } from "@ui/lib/types";
import { useNodeConnections } from "@ui/providers/connections-provider";
import { useAutomationEditor } from "@ui/providers/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs";

import React, { useEffect } from "react";
import { Separator } from "@ui/components/ui/separator";
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from "@ui/lib/constant";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import {
  fetchBotSlackChannels,
  onConnections,
  onDragStart,
} from "@ui/lib/editor-utils";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import RenderConnectionAccordion from "./render-connection-accordian";
import RenderOutputAccordion from "./render-output-accordian";
import { useAutomationStore } from "@repo/store/automation/automation-store";

type Props = {
  nodes: AutomationEditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useAutomationEditor();
  const { nodeConnection } = useNodeConnections();
  const { googleFile, setSlackChannels } = useAutomationStore();
  useEffect(() => {
    if (state) {
      onConnections(nodeConnection, state, googleFile);
    }
  }, [state]);

  useEffect(() => {
    if (nodeConnection.slackNode.slackAccessToken) {
      fetchBotSlackChannels(
        nodeConnection.slackNode.slackAccessToken,
        setSlackChannels,
      );
    }
  }, [nodeConnection]);

  return (
    <aside>
      <Tabs defaultValue="actions" className="h-screen overflow-scroll pb-24">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action"),
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings" className="-mt-6">
          <div className="px-2 py-4 text-center text-xl font-bold">
            {state.editor.selectedNode.data.title}
          </div>

          <Accordion type="multiple">
            <AccordionItem value="Options" className="border-y-[1px] px-2">
              <AccordionTrigger className="!no-underline">
                Account
              </AccordionTrigger>
              <AccordionContent>
                {CONNECTIONS.map((connection) => (
                  <RenderConnectionAccordion
                    key={connection.title}
                    state={state}
                    connection={connection}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Expected Output" className="px-2">
              <AccordionTrigger className="!no-underline">
                Action
              </AccordionTrigger>
              <RenderOutputAccordion
                state={state}
                nodeConnection={nodeConnection}
              />
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
