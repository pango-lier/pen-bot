import React, { Fragment, useEffect, useMemo, useState } from "react";
import { COLUMNS, UserI } from "./columns";
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "api/grapth/user/getUsers";
import Group from "./sub";
import ModalGroup from "./actions/ModalUser";
const BaseTable = () => {
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const onCreateHandle = (group) => {
    console.log(group);
  };

  const onEditHandle = (group) => {
    console.log(group);
  };
  const onDeleteHandle = (group) => {
    console.log(group);
  };
  const [row, setRow] = useState<UserI | undefined>();
  const [data, setData] = useState<UserI[]>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [getUsers] = useLazyQuery(GET_USERS, {
    variables: {
      paging: { limit: perPage, offset: (currentPage - 1) * perPage },
    },
    fetchPolicy: "network-only",
    onError: (error) => {},
  });
  const fetchData = async () => {
    const response = await getUsers({
      variables: { paging: { limit: 100, offset: 0 } },
    });
    setData(response.data.userDtos.nodes);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns: useMemo(
      () => COLUMNS(onCreateHandle, onEditHandle, onDeleteHandle),
      []
    ),
    state: {
      expanded,
    },
    getRowCanExpand: () => true,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });
  const rerender = React.useReducer(() => ({}), {})[1];
  return (
    <>
      <div>
        <Table>
          <thead className="table-dark">
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
              <Fragment key={row.id}>
                <tr className="table-default">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      <Group user={row.original} />
                    </td>
                  </tr>
                )}
              </Fragment>
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
      {isOpenModalGroup && (
        <ModalGroup
          row={row}
          isOpenModalGroup={isOpenModalGroup}
          setIsOpenModalGroup={(value) => setIsOpenModalGroup(value)}
        />
      )}
    </>
  );
};
export default BaseTable;
