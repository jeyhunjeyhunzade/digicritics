import SearchIcon from "@app/assets/icons/SearchIcon";
import Layout from "@app/components/Layout";
import StatusPill from "@app/components/StatusPill";
import { usersData } from "@app/mock/usersData";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";

const AdminPage = () => {
  const { t } = useTranslation();

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: t("ProfileTable.id"),
        accessor: "id",
      },
      {
        Header: t("ProfileTable.userName"),
        accessor: "userName",
      },
      {
        Header: t("ProfileTable.email"),
        accessor: "email",
      },
      {
        Header: t("ProfileTable.registerDate"),
        accessor: "registerDate",
      },
      {
        Header: t("ProfileTable.likes"),
        accessor: "likes",
      },
      {
        Header: t("ProfileTable.userRating"),
        accessor: "userRating",
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
    setPageSize,
    selectedFlatRows,
  } = useTable(
    { columns, data: usersData },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useRowSelectColumn
  );

  useEffect(() => {
    usersData?.length && setPageSize(usersData?.length);
  }, [setPageSize, usersData?.length]);

  return (
    <Layout>
      <div className="flex h-[90vh] w-full flex-col px-20 py-20 dark:bg-[#1B1B1B]">
        <div className="flex w-full justify-between">
          <div className="flex">
            <div className="relative">
              <input
                type="text"
                placeholder={t("ProfileTable.search")}
                className="h-[44px] w-[302px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#2C2C2C] outline-none focus:ring-0 dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon size={24} />
              </div>
            </div>
            <div className="ml-6 h-[44px] w-[302px] bg-[transparent]">
              <select
                id="region"
                name="region"
                placeholder={t("ProfileTable.sortBy")}
                className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                // value={region}
                // onChange={(e) => {
                //   setRegion(e.target.value);
                // }}
              >
                <option value="">{t("ProfileTable.sortBy")}</option>
                <option>{t("ProfileTable.reviewName")}</option>
                <option>{t("ProfileTable.category")}</option>
                <option>{t("ProfileTable.createdDate")}</option>
                <option>{t("ProfileTable.authorGrade")}</option>
                <option>{t("ProfileTable.rating")}</option>
                <option>{t("ProfileTable.like")}</option>
                <option>{t("ProfileTable.actions")}</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="h-[44px] w-[194px] bg-[transparent]">
              <select
                id="region"
                name="region"
                placeholder={t("ProfileTable.sortBy")}
                className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                // value={region}
                // onChange={(e) => {
                //   setRegion(e.target.value);
                // }}
              >
                <option value="">{t("AdminPage.actions")}</option>
                <option>{t("AdminPage.makeAdmin")}</option>
                <option>{t("AdminPage.block")}</option>
                <option>{t("AdminPage.unBlock")}</option>
                <option>{t("AdminPage.delete")}</option>
              </select>
            </div>
            <button
              type="button"
              className="ml-2 flex h-[44px] w-[100px] items-center justify-center rounded-md bg-gradientBtnBlue px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
            >
              {t("AdminPage.apply")}
            </button>
          </div>
        </div>
        <table {...getTableProps()} className="mt-8 min-w-full table-fixed">
          <thead className="bg-gray-10">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-5 text-base font-medium text-[#636060]"
                  >
                    {column.render("Header")}
                    {column.id === "selection" && column.render("Summary")}
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
                  className="rounded-[8px] bg-white dark:bg-[#2C2C2C]"
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
