import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS, SubUserGroupI } from "./columns";
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardBody, Table } from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_GROUP } from "api/grapth/group/getUserGroups";
import { notifyError } from "utility/notify";
import { IUserGroupProps } from "../../columns";
import { GET_ACCOUNTS } from "api/grapth/account/getAccounts";

const BaseTable = ({ user, group }: IUserGroupProps) => {
  const [data, setData] = useState<SubUserGroupI[]>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [getAccounts] = useLazyQuery(GET_ACCOUNTS, {
    variables: {
      paging: { limit: perPage, offset: (currentPage - 1) * perPage },
      filter: { groupId: { in: [group.id] } },
    },
    fetchPolicy: "network-only",
    onError: (error) => {
      notifyError(error);
    },
  });
  const fetchData = async () => {
    try {
      const response = await getAccounts({
        variables: {
          paging: { limit: 100, offset: 0 },
          filter: {
            groupId: {
              in: [group.id],
            },
          },
        },
      });
      setData(response.data.accountDtos.nodes);
    } catch (error) {
      notifyError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns: useMemo(() => COLUMNS, []),
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });
  const rerender = React.useReducer(() => ({}), {})[1];
  return (
    <>
      <div>
        <Table borderless size="sm" hover>
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      key: header.id,
                      style: {
                        width: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.maxSize,
                        minWidth: header.column.columnDef.minSize,
                      },
                    }}
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-success">
                {row.getVisibleCells().map((cell) => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.maxSize,
                        minWidth: cell.column.columnDef.minSize,
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default BaseTable;
