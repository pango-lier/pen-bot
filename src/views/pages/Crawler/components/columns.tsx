import { createColumnHelper } from "@tanstack/react-table";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";

interface Crawler {
  checkbox?: any;
  id: string | number;
  change_level: string;
  change_type: string;
  from: string;
  to: string;
  date_and_time: any;
  actions?: any;
}

const columnHelper = createColumnHelper<Crawler>();

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
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <>
          <CheckboxTable
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </>
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.change_level, {
    id: "changechange_level_type",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("change_type", {
    header: () => "change_type",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("from", {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor("to", {
    header: "to",
  }),
  columnHelper.accessor("date_and_time", {
    header: "date and time",
  }),
  {
    header: "Actions",
    cell: (info) => {
      return <Action />;
    },
  },
];
