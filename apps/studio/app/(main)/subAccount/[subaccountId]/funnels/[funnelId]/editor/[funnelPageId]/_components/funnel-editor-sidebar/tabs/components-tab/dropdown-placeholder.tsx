import { EditorBtns } from "@repo/ui/lib/constant";
import { AlignCenter } from "lucide-react";
import React from "react";

type Props = {};

const DropdownPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "dropdown")}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <AlignCenter size={40} className="text-muted-foreground" />
    </div>
  );
};

export default DropdownPlaceholder;
