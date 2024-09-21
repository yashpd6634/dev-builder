import { EditorBtns } from "@repo/ui/lib/constant";

const dropdownRoles = [
  "dropdown-menu-trigger",
  "dropdown-menu-content",
  "dropdown-menu-label",
  "dropdown-menu-separator",
  "dropdown-menu-group",
  "dropdown-menu-item",
  "dropdown-menu-sub",
  "dropdown-menu-sub-trigger",
  "dropdown-menu-sub-content",
  "dropdown-menu-sub-item",
];

const linkRoles = ["link"];

export function getRoles(type: EditorBtns): string[] {
  if (type === "dropdown") {
    return dropdownRoles;
  } else if (type === "link") {
    return linkRoles;
  }

  return [];
}
