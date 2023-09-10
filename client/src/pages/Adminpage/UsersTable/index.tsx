/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import {
  blockAccounts,
  deleteAccounts,
  unBlockAccounts,
  updateUserRole,
} from "@app/api/auth";
import DownIcon from "@app/assets/icons/DownIcon";
import SearchIcon from "@app/assets/icons/SearchIcon";
import UpIcon from "@app/assets/icons/UpIcon";
import StatusPill from "@app/components/StatusPill";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import { queryClient } from "@app/index";
import { Routes } from "@app/router/rooter";
import { AdminTableAction, UserStatus } from "@app/types/enums";
import { ActionsResponse, UsersData } from "@app/types/types";
import { successHandler } from "@app/utils";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { useMutation } from "@tanstack/react-query";

interface UsersTableProps {
  tableData: UsersData[];
}

const UsersTable = (props: UsersTableProps) => {
  const { tableData } = props;
  const { t } = useTranslation();
  const { config } = useGetConfig();
  const { onError } = useError();
  const [tableAction, setTableAction] = useState<AdminTableAction | string>();

  const onSuccess = (response: ActionsResponse) => {
    queryClient.invalidateQueries(["users"]);
    successHandler(response);
  };

  const { mutate: mutateUpdateUserRole } = useMutation(updateUserRole, {
    onSuccess,
    onError,
  });

  const { mutate: mutateBlock } = useMutation(blockAccounts, {
    onSuccess,
    onError,
  });

  const { mutate: mutateUnBlock } = useMutation(unBlockAccounts, {
    onSuccess,
    onError,
  });

  const { mutate: mutateDelete } = useMutation(deleteAccounts, {
    onSuccess,
    onError,
  });

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: t("ProfileTable.id"),
        accessor: "id",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.userName"),
        accessor: "fullName",
        sortType: "basic",
        Cell: ({ row }: { row: any }) => (
          <Link className="underline" to={`${Routes.profile}/${row.values.id}`}>
            {row.values.fullName}
          </Link>
        ),
      },
      {
        Header: t("ProfileTable.email"),
        accessor: "email",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.registerDate"),
        accessor: "createdTime",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.status"),
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    [t]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setPageSize,
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data: tableData },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowSelectColumn
  );

  useEffect(() => {
    tableData?.length && setPageSize(tableData?.length);
  }, [setPageSize, tableData?.length]);

  const handleActionApply = () => {
    const selectedIds = selectedFlatRows.map((item) => item.values?.id);
    if (tableAction && config) {
      switch (tableAction) {
        case AdminTableAction.MAKEADMIN:
          mutateUpdateUserRole({
            userIds: selectedIds,
            status: UserStatus.ADMIN,
            config,
          });
          break;
        case AdminTableAction.MAKEUSER:
          mutateUpdateUserRole({
            userIds: selectedIds,
            status: UserStatus.USER,
            config,
          });
          break;
        case AdminTableAction.BLOCK:
          mutateBlock({ userIds: selectedIds, config });
          break;
        case AdminTableAction.UNBLOCK:
          mutateUnBlock({ userIds: selectedIds, config });
          break;
        case AdminTableAction.DELETE:
          mutateDelete({ userIds: selectedIds, config });
          break;
      }
    }
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex">
          <div className="relative">
            <input
              type="text"
              placeholder={t("ProfileTable.search")}
              value={state.globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-[44px] w-[302px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#2C2C2C] outline-none focus:ring-0 dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchIcon size={24} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="h-[44px] w-[194px] bg-[transparent]">
            <select
              id="region"
              name="region"
              placeholder={t("ProfileTable.sortBy")}
              className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              value={tableAction}
              onChange={(e) => {
                setTableAction(e.target.value);
              }}
            >
              <option value="">{t("AdminPage.actions")}</option>
              <option value={AdminTableAction.MAKEADMIN}>
                {t("AdminPage.makeAdmin")}
              </option>
              <option value={AdminTableAction.MAKEUSER}>
                {t("AdminPage.makeUser")}
              </option>
              <option value={AdminTableAction.BLOCK}>
                {t("AdminPage.block")}
              </option>
              <option value={AdminTableAction.UNBLOCK}>
                {t("AdminPage.unBlock")}
              </option>
              <option value={AdminTableAction.DELETE}>
                {t("AdminPage.delete")}
              </option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleActionApply}
            className="ml-2 flex h-[44px] w-[100px] items-center justify-center rounded-md bg-gradientBtnBlue px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
          >
            {t("AdminPage.apply")}
          </button>
        </div>
      </div>
      <table {...getTableProps()} className="mt-8 min-w-full table-fixed">
        <thead className="bg-gray-10">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-5 text-base font-medium text-[#636060]"
                >
                  <div className="flex">
                    {column.render("Header")}
                    {column.id === "selection" && column.render("Summary")}
                    {typeof column.Header === "string" && (
                      <span className="ml-1 self-center">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <DownIcon size={14} />
                          ) : (
                            <UpIcon size={14} />
                          )
                        ) : (
                          <span className="flex">
                            <DownIcon size={14} />
                            <UpIcon size={14} />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y bg-white shadow-tableRowShadow dark:divide-[#1B1B1B]"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="rounded-[8px] bg-white text-left dark:bg-[#2C2C2C]"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="whitespace-nowrap px-6 py-5 text-base dark:text-white"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
