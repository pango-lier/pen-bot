import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS, IAccount } from "./columns";
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLazyQuery } from "@apollo/client";
import { notifyError } from "utility/notify";
import { IUserGroupProps } from "../../columns";
import { GET_ACCOUNTS } from "api/grapth/account/getAccounts";
import ModalAccount from "../actions/ModalAccount";
import { Table } from "reactstrap";
import { ACTION_ENUM } from "utility/enum/actions";

const BaseTable = ({ user, group }: IUserGroupProps) => {
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const [action, setAction] = useState<ACTION_ENUM>(ACTION_ENUM.None);
  const [row, setRow] = useState<IAccount | undefined>();
  const [data, setData] = useState<IAccount[]>([]);
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
    }
    setIsOpenModalGroup(false);
  };

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
    columns: useMemo(
      () => COLUMNS(onCreateHandle, onEditHandle, onDeleteHandle),
      []
    ),
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
      {isOpenModalGroup && (
        <ModalAccount
          action={action}
          account={row}
          group={group}
          isOpenModalGroup={isOpenModalGroup}
          setIsOpenModalGroup={(value) => setIsOpenModalGroup(value)}
          onHandleModal={onHandleModal}
        />
      )}
    </>
  );
};
export default BaseTable;
