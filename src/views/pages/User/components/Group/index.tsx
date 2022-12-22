import React from "react";
import BaseTable from "./components/BaseTable";
import { UserI } from "../columns";

interface Props {
  user: UserI;
}
const Group = ({ user }: Props) => {
  return (
    <div className="mt-2 mb-2">
      <BaseTable user={user} />
    </div>
  );
};

export default Group;
