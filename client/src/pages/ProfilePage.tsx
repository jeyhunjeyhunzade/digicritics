import SearchIcon from "@app/assets/icons/SearchIcon";
import Layout from "@app/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import Modal from "react-modal";

import { reviewsData } from "@app/mock/reviewsData";
import TableActions from "@app/components/TableActions";
import PlusIcon from "@app/assets/icons/PlusIcon";
import EditIcon from "@app/assets/icons/EditIcon";
import DndUpload from "@app/components/DndUpload";
import CloseIcon from "@app/assets/icons/CloseIcon";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { isDarkMode, setIsReviewEditorOpen } = useContext(
    AppContext
  ) as AppContextShape;

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: t("ProfileTable.id"),
        accessor: "id",
      },
      {
        Header: t("ProfileTable.reviewName"),
        accessor: "reviewName",
      },
      {
        Header: t("ProfileTable.category"),
        accessor: "category",
      },
      {
        Header: t("ProfileTable.createdDate"),
        accessor: "createdDate",
      },
      {
        Header: t("ProfileTable.authorGrade"),
        accessor: "authorGrade",
      },
      {
        Header: t("ProfileTable.rating"),
        accessor: "rating",
      },
      {
        Header: t("ProfileTable.like"),
        accessor: "like",
      },
      {
        Header: t("ProfileTable.actions"),
        accessor: "actions",
        Cell: TableActions,
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
    { columns, data: reviewsData },
    useGlobalFilter,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    reviewsData?.length && setPageSize(reviewsData?.length);
  }, [setPageSize, reviewsData?.length]);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const openReviewEditorModal = () => {
    setIsReviewEditorOpen(true);
  };

  const customEditProfileModalStyles = {
    content: {
      width: "516px",
      height: "604px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "16px",
      backgroundColor: isDarkMode ? "#2C2C2C" : "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.30)",
    },
  };

  return (
    <Layout>
      <div className="flex w-full flex-col px-20 py-6 dark:bg-[#1B1B1B]">
        <div className="mb-10 flex w-full justify-start">
          <img
            src="/testprofile.jpeg"
            alt="profile image"
            className="h-[160px] w-[160px] rounded-[8px]"
          />
          <div className="ml-4 flex w-full justify-between">
            <div>
              <div className="mb-2 flex items-center">
                <span className="text-4xl font-medium dark:text-white">
                  Jeyhun Jeyhunzade
                </span>
              </div>
              <div className="mb-2 flex items-center dark:text-white">
                <table>
                  <tbody className="text-left">
                    <tr className="mb-2">
                      <td className="font-medium">{t("Profile.email")}</td>
                      <td className="pl-6 font-normal">jeyhun@mail.com</td>
                    </tr>
                    <tr className="mb-2">
                      <td className="font-medium">{t("Profile.likes")}</td>
                      <td className="pl-6 font-normal">21</td>
                    </tr>
                    <tr>
                      <td className="font-medium">{t("Profile.created")}</td>
                      <td className="pl-6 font-normal">24/08/2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={openReviewEditorModal}
                className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
              >
                <span className="pr-2">{t("Profile.newReview")}</span>
                <PlusIcon size={20} color={"white"} />
              </button>
              <button
                onClick={openEditProfileModal}
                className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] text-[#2C2C2C] dark:border-[#2C2C2C] dark:text-white"
              >
                <span className="pr-2">{t("Profile.editProfile")}</span>
                <EditIcon size={20} color={"#2C2C2C"} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="relative mr-6">
            <input
              type="text"
              placeholder={t("ProfileTable.search")}
              className="h-[44px] w-[628px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#2C2C2C] outline-none focus:ring-0 dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchIcon size={24} />
            </div>
          </div>
          <div className="h-[44px] w-[302px]">
            <select
              id="region"
              name="region"
              className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              // value={region}
              // onChange={(e) => {
              //   setRegion(e.target.value);
              // }}
            >
              <option value="">{t("Review.category")}</option>
              <option>Games</option>
              <option>Movies</option>
              <option>Sport</option>
              <option>Games</option>
              <option>Movies</option>
              <option>Sport</option>
            </select>
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
        <div>
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
        <Modal
          isOpen={isEditProfileModalOpen}
          onRequestClose={closeEditProfileModal}
          style={customEditProfileModalStyles}
        >
          <span
            onClick={closeEditProfileModal}
            className="absolute right-2 top-2 cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <CloseIcon size={24} />
          </span>
          <div className="flex flex-col p-10">
            <div className="flex justify-center text-3xl text-[#2C2C2C] dark:text-white">
              {t("Profile.editProfile")}
            </div>
            <input
              type="text"
              placeholder={t("Profile.enterFullName")}
              className="mb-6 mt-12 h-[48px] w-full rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
            />

            <DndUpload />

            <div className="mt-6 flex w-full justify-between">
              <button className="flex h-[44px] w-[190px] items-center justify-center rounded-[6px] bg-[#D20F0F] text-white">
                {t("Profile.deleteProfile")}
              </button>
              <button className="flex h-[44px] w-[190px] items-center justify-center rounded-[6px] bg-[#209239] text-white">
                {t("Profile.saveChanges")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default ProfilePage;
