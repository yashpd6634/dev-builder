import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { EditorBtns } from "@repo/ui/lib/constant";
import { Label } from "@ui/components/ui/label";
import React, { useState } from "react";
import { getRoles } from "./component-roles";

type Props = {
  onSaveStyles: (role: string, css: string) => void;
  type: EditorBtns;
};

const RoleBasedStyleEditor = ({ onSaveStyles, type }: Props) => {
  const availableRoles = getRoles(type);
  const [selectedRole, setSelectedRole] = useState(availableRoles[0] || "");
  const [css, setCss] = useState("");

  const handleSave = () => {
    onSaveStyles(selectedRole, css);
  };

  return (
    <div className="role-editor flex flex-col gap-4">
      <div>
        <Label>Select Role:</Label>
        <Select value={selectedRole} onValueChange={(e) => setSelectedRole(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={css}
        onChange={(e) => setCss(e.target.value)}
        placeholder={`Enter CSS for ${selectedRole}`}
        className="css-input"
      />
      <Button onClick={handleSave}>Save Styles</Button>
    </div>
  );
};

export default RoleBasedStyleEditor;
