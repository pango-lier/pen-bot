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
import Group from "./Group";
import IconTextPagination from "./PaginationIconText";
import { notifyError } from "utility/notify";
import { ACTION_ENUM } from "utility/enum/actions";
import ModalUser from "./actions/ModalUser";
const BaseTable = () => {
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const [row, setRow] = useState<UserI | undefined>();
  const [data, setData] = useState<UserI[]>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [action, setAction] = useState<ACTION_ENUM>(ACTION_ENUM.None);

  const onCreateHandle = () => {
    setAction(ACTION_ENUM.Create);
    setRow(undefined);
    setIsOpenModalGroup(true);
  };

  const onEditHandle = (row) => {
    setRow(row);
    setAction(ACTION_ENUM.Edit);
    setIsOpenModalGroup(true);
  };
  const onDeleteHandle = (row) => {
    setRow(row);
    setAction(ACTION_ENUM.Delete);
    setIsOpenModalGroup(true);
  };
  const onHandleModal = (row) => {
    if (action === ACTION_ENUM.Create) {
      const _data = [...data];
      _data.unshift(row);
      setData(_data);
    } else if (action === ACTION_ENUM.Edit) {
      const _data = data.map((i) => {
        if (i.id === row.id) i = row;
        return i;
      });
      setData(_data);
    } else if (action === ACTION_ENUM.Delete) {
      let _data = data.filter((i) => i.id !== row.id);
      console.log(_data);
      setData(_data);
    }
    setIsOpenModalGroup(false);
  };

  const onPageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    fetchData({
      limit: perPage,
      offset: selectedItem.selected * perPage,
    });
  };
  const [getUsers] = useLazyQuery(GET_USERS, {
    variables: {
      paging: { limit: perPage, offset: (currentPage - 1) * perPage },
    },
    fetchPolicy: "network-only",
    onError: (error) => {
      notifyError(error);
    },
  });
  const fetchData = async ({ limit, offset }) => {
    const response = await getUsers({
      variables: { paging: { limit, offset } },
    });
    setData(response.data.userDtos.nodes);
    setTotal(response.data.userDtos.totalCount);
  };
  useEffect(() => {
    // fetchData();
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
        <div className="paginate-relative ">
          <IconTextPagination
            onPageChange={onPageChange}
            pageCount={total / perPage}
          />
        </div>
      </div>
      {isOpenModalGroup && (
        <ModalUser
          row={row}
          onHandle={onHandleModal}
          action={action}
          isOpenModalGroup={isOpenModalGroup}
          setIsOpenModalGroup={(value) => setIsOpenModalGroup(value)}
        />
      )}
    </>
  );
};
export default BaseTable;
