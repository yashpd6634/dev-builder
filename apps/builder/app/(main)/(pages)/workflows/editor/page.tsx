import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  redirect("/workflows");

  return <div>WorkFlow Editoer</div>;
};

export default Page;
