"use client";
import Workflowform from "@ui/components/forms/workflow-form";
import CustomModal from "@ui/components/global/custom-modal";
import { Button } from "@ui/components/ui/button";
import { useBilling } from "@ui/providers/billing-provider";
import { useModal } from "@ui/providers/modal-provider";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const WorkflowButton = (props: Props) => {
  const { setOpen, setClose } = useModal();
  const { credits } = useBilling();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>,
    );
  };

  return (
    <Button
      size={"icon"}
      {...(credits !== "0"
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
  );
};

export default WorkflowButton;
