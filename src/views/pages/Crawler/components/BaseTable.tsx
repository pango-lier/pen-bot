import React, { useMemo } from "react";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "reactstrap";
const BaseTable = () => {
  const table = useReactTable({
    data: useMemo(() => MOCK_DATA, []),
    columns: useMemo(() => COLUMNS, []),
    getCoreRowModel: getCoreRowModel(),
  });
  const rerender = React.useReducer(() => ({}), {})[1];
  return (
    <>
      <div className="p-2 custom-rt">
        <Table striped className="rt-table">
          <thead className="table-dark rt-thead .-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="rt-tr">
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      key: header.id,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                    className="rt-th"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="rt-tbody">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="rt-tr">
                {row.getVisibleCells().map((cell) => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      },
                    }}
                    className="rt-td"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </Table>
        <div className="h-4" />
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>
      </div>
    </>
  );
};
export default BaseTable;
