import SearchIcon from "@app/assets/icons/SearchIcon";
import Layout from "@app/components/Layout";
import StatusPill from "@app/components/StatusPill";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";
import { AppContext } from "./App";
import { ActionsResponse, AppContextShape, UsersData } from "@app/types/types";
import {
  checkAuth,
  dateFormatter,
  errorHandler,
  successHandler,
} from "@app/utils";
import { queryClient } from "..";
import { getUsers } from "@app/api/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  blockAccounts,
  deleteAccounts,
  updateUserRole,
  unBlockAccounts,
} from "@app/api/auth";
import { AdminTableAction, UserStatus } from "@app/types/enums";
import DownIcon from "@app/assets/icons/DownIcon";
import UpIcon from "@app/assets/icons/UpIcon";

const AdminPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<UsersData[]>([]);
  const [tableAction, setTableAction] = useState<AdminTableAction | string>();

  const {
    setIsReviewEditorOpen,
    isDarkMode,
    loggedUserId,
    loggedUser,
    setLoggedUser,
    setLoggedUserId,
  } = useContext(AppContext) as AppContextShape;

  const onError = (error: unknown) => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      handleLogout();
    }
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
    errorHandler(error);
  };

  const onSuccess = (response: ActionsResponse) => {
    queryClient.invalidateQueries(["users"]);
    successHandler(response);
  };

  const { data: usersData, isLoading: isUsersDataLoading } = useQuery<
    UsersData[]
  >(["users"], getUsers, {
    onError,
    retry: false,
  });

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
        Cell: ({ row }) => (
          <Link to={`${Routes.profile}/${row.values.id}`}>
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
        sortType: "datetime",
      },
      {
        Header: t("ProfileTable.likes"),
        accessor: "likes",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.userRating"),
        accessor: "userRating",
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
    usersData?.length && setPageSize(usersData?.length);
  }, [setPageSize, usersData?.length]);

  useEffect(() => {
    if (usersData) {
      const formatDataForTable: UsersData[] = usersData?.map(
        (user: UsersData) => {
          return {
            ...user,
            //TODO: add rating calculation
            createdTime: dateFormatter(user.createdTime),
            likes: user.Like.length,
          };
        }
      );
      setTableData(formatDataForTable);
    }
  }, [usersData]);

  const handleActionApply = () => {
    const selectedIds = selectedFlatRows.map((item) => item.values?.id);
    if (tableAction) {
      switch (tableAction) {
        case AdminTableAction.MAKEADMIN:
          mutateUpdateUserRole({
            userIds: selectedIds,
            status: UserStatus.ADMIN,
          });
          break;
        case AdminTableAction.MAKEUSER:
          mutateUpdateUserRole({
            userIds: selectedIds,
            status: UserStatus.USER,
          });
          break;
        case AdminTableAction.BLOCK:
          mutateBlock(selectedIds);
          break;
        case AdminTableAction.UNBLOCK:
          mutateUnBlock(selectedIds);
          break;
        case AdminTableAction.DELETE:
          mutateDelete(selectedIds);
          break;
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("status");
    setLoggedUserId(null);
    setLoggedUser(null);
    navigate(Routes.auth);
  };

  return (
    <Layout>
      <div className="flex h-[90vh] w-full flex-col px-20 py-20 dark:bg-[#1B1B1B]">
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
      </div>
    </Layout>
  );
};

export default AdminPage;
