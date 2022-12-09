import { createColumnHelper } from "@tanstack/react-table";
import { ChevronsDown, ChevronsRight, ChevronsUp } from "react-feather";
import { Button } from "reactstrap";
import { Tooltip } from "views/pages/components/Tooltip";
import { UserI } from "../../columns";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";

export enum GroupEnum {
  NONE = "none",
  GOLOGIN = "Gologin",
}

export interface SubUserGroupI {
  checkbox?: any;
  expanded?: any;
  id: string | number;
  name: string;
  groupType: GroupEnum;
  secretName?: string;
  secretKey?: string;
  userId?: string;
  createdAt: Date;
  actions?: any;
}

export interface IUserGroupProps {
  user: UserI;
  group: SubUserGroupI;
}

const columnHelper = createColumnHelper<SubUserGroupI>();

export const COLUMNS = [
  columnHelper.accessor((row) => row.checkbox, {
    id: "checkbox",
    header: ({ table }) => (
      <>
        <CheckboxTable
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </>
    ),
    cell: ({ row, getValue }) => (
      <div
        style={
          {
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            // paddingLeft: `${row.depth * 2}rem`,
          }
        }
      >
        <>
          <CheckboxTable
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
          {""}
          {row.getCanExpand() ? (
            <span
              {...{
                style: { cursor: "pointer" },
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              {row.getIsExpanded() ? <ChevronsDown /> : <ChevronsRight />}
            </span>
          ) : (
            ""
          )}
        </>
      </div>
    ),
    size: 15,
    minSize: 10,
    maxSize: 20,
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    size: 15,
    minSize: 10,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
    size: 70,
    minSize: 50,
    maxSize: 100,
  }),
  columnHelper.accessor("secretName", {
    header: () => "Secret Name",
    cell: (info) => (
      <Tooltip id={"c" + info.row.id} message={info.getValue() ?? ""} />
    ),
    size: 70,
    minSize: 50,
    maxSize: 100,
  }),
  columnHelper.accessor("secretKey", {
    header: () => <span>Secret Key</span>,
    size: 70,
    minSize: 50,
    maxSize: 100,
  }),
  columnHelper.accessor("createdAt", {
    size: 70,
    minSize: 50,
    maxSize: 100,
  }),
  {
    header: "Actions",
    cell: (info) => {
      return <Action group={info.row.original} />;
    },
    size: 30,
    minSize: 30,
    maxSize: 40,
  },
];
