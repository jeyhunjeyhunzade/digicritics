/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { deleteAccounts } from "@app/api/auth";
import { getReviews } from "@app/api/reviews";
import { getUserById, updateUser } from "@app/api/users";
import AvatarIcon from "@app/assets/icons/AvatarIcon";
import CloseIcon from "@app/assets/icons/CloseIcon";
import DownIcon from "@app/assets/icons/DownIcon";
import EditIcon from "@app/assets/icons/EditIcon";
import PlusIcon from "@app/assets/icons/PlusIcon";
import SearchIcon from "@app/assets/icons/SearchIcon";
import UpIcon from "@app/assets/icons/UpIcon";
import DndUpload from "@app/components/DndUploadSingle";
import Loader from "@app/components/Loader";
import TableActions from "@app/components/TableActions";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import Layout from "@app/layout/AppLayout";
import { AppContext } from "@app/pages/App";
import { Routes } from "@app/router/rooter";
import { UserStatus } from "@app/types/enums";
import {
  AppContextShape,
  ReviewsData,
  ReviewsTable,
  UsersData,
} from "@app/types/types";
import {
  calculateAverageRate,
  dateFormatter,
  errorHandler,
  successHandler,
} from "@app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "..";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState<string>("");
  const [url, setUrl] = useState<string>();
  const [profileData, setProfileData] = useState<UsersData>();
  const [isOwnPage, setIsOwnPage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteProfileModaOpen, setDeleteProfileModaOpen] = useState(false);
  const [tableData, setTableData] = useState<ReviewsTable[]>([]);

  const {
    isDarkMode,
    setIsReviewEditorOpen,
    loggedUser,
    setLoggedUser,
    setLoggedUserId,
  } = useContext(AppContext) as AppContextShape;

  const { data: userByIdData, isLoading: isUserByIdLoading } =
    useQuery<UsersData>(
      ["userById", id, config],
      () => {
        if (id && config) {
          return getUserById({ id: +id, config });
        } else {
          return Promise.resolve([]);
        }
      },
      {
        onError,
        retry: false,
      }
    );

  const { mutate: updateUserMutate, isLoading: isUpdateUserMutateLoading } =
    useMutation(updateUser, {
      onSuccess: (response) => {
        setLoggedUser(response);
        closeEditProfileModal();
        queryClient.invalidateQueries(["userById"]);
      },
      onError: errorHandler,
    });

  const { mutate: deleteUserMutate, isLoading: isDeleteUserLoading } =
    useMutation(deleteAccounts, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        successHandler(response);
        localStorage.removeItem("loggedUserId");
        localStorage.removeItem("status");
        setLoggedUserId(null);
        setLoggedUser(null);
        navigate(Routes.homepage);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.response?.status === 401) {
            navigate(Routes.homepage);
          }
        }
        errorHandler(error);
      },
    });

  const isLoading = isUpdateUserMutateLoading || isDeleteUserLoading;

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: t("ProfileTable.id"),
        accessor: "id",
      },
      {
        Header: t("ProfileTable.reviewName"),
        accessor: "reviewTitle",
        sortType: "basic",
        Cell: ({ row }: { row: any }) => (
          <Link to={`${Routes.reviewpage}/${row.values.id}`}>
            {row.values.reviewTitle}
          </Link>
        ),
      },
      {
        Header: t("ProfileTable.category"),
        accessor: "category",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.createdDate"),
        accessor: "createdTime",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.authorGrade"),
        accessor: "reviewGrade",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.rating"),
        accessor: "ratings",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.likes"),
        accessor: "likes",
        sortType: "basic",
      },
      {
        Header: t("ProfileTable.actions"),
        accessor: "actions",
        sortType: "basic",
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
    { columns, data: tableData },
    useGlobalFilter,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    profileData?.reviews.length && setPageSize(profileData?.reviews.length);
  }, [setPageSize, profileData?.reviews]);

  useEffect(() => {
    userByIdData && setProfileData(userByIdData);
  }, [userByIdData]);

  useEffect(() => {
    if (loggedUser) {
      if (`${loggedUser?.id}` === id) {
        setIsOwnPage(true);
      } else {
        setIsOwnPage(false);
      }

      if (loggedUser) {
        if (loggedUser.status === UserStatus.ADMIN) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }
  }, [loggedUser, profileData]);

  useEffect(() => {
    if (profileData?.reviews) {
      console.log("reviews:", profileData.reviews);
      const formatDataForTable: ReviewsTable[] = profileData.reviews.map(
        (review: Omit<ReviewsData, "user">) => {
          return {
            ...review,
            likes: review.likes.length,
            ratings: review.ratings.length
              ? calculateAverageRate(review.ratings)
              : 0,
            createdTime: dateFormatter(review.createdTime),
          };
        }
      );
      setTableData(formatDataForTable);
    }
  }, [profileData]);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setNewFullName("");
    setUrl("");
    setIsEditProfileModalOpen(false);
  };

  const closeDeleteProfileModal = () => {
    setDeleteProfileModaOpen(false);
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

  const customDeleteProfileModalStyles = {
    content: {
      width: "525px",
      height: "172px",
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

  useEffect(() => {
    url && console.log("image url: ", url);
  }, [url]);

  const handleUpdateUser = () => {
    if (id) {
      updateUserMutate({
        id: +id,
        fullName: newFullName,
        profileImage: url ? url : profileData?.profileImage,
        config,
      });
    }
  };

  const handleDeleteUser = () => {
    setIsEditProfileModalOpen(false);
    setDeleteProfileModaOpen(true);
  };

  const handleDeleteAccount = () => {
    if (id && config) {
      deleteUserMutate({ userIds: [+id], config });
    }
  };

  return (
    <Layout>
      {isUserByIdLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        profileData && (
          <div className="flex min-h-[91vh] w-full flex-col px-20 py-6 dark:bg-[#1B1B1B]">
            <div className="mb-10 flex w-full justify-start">
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="profile"
                  className="max-h-[215px] w-[160px] rounded-[8px]"
                />
              ) : (
                <div className="flex">
                  <AvatarIcon size={120} />
                </div>
              )}
              <div className="ml-4 flex w-full justify-between">
                <div>
                  <div className="mb-2 flex items-center">
                    <span className="text-4xl font-medium dark:text-white">
                      {profileData.fullName}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center dark:text-white">
                    <table>
                      <tbody className="text-left">
                        <tr className="mb-2">
                          <td className="font-medium">{t("Profile.email")}</td>
                          <td className="pl-6 font-normal">
                            {profileData.email}
                          </td>
                        </tr>
                        <tr className="mb-2">
                          <td className="font-medium">{t("Profile.likes")}</td>
                          {/* TODO:  user total likes*/}
                          <td className="pl-6 font-normal">21</td>
                        </tr>
                        <tr>
                          <td className="font-medium">
                            {t("Profile.created")}
                          </td>
                          <td className="pl-6 font-normal">
                            {profileData.createdTime &&
                              dateFormatter(profileData.createdTime)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {(isOwnPage || isAdmin) && (
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
                )}
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
                  <option>{t("ProfileTable.likes")}</option>
                  <option>{t("ProfileTable.actions")}</option>
                </select>
              </div>
            </div>
            <div>
              <table
                {...getTableProps()}
                className="mt-8 min-w-full table-fixed"
              >
                <thead className="bg-gray-10">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-5 text-base font-medium text-[#636060]"
                        >
                          <div className="flex">
                            {column.render("Header")}
                            {column.id === "selection" &&
                              column.render("Summary")}
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
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="close edit profile modal"
                    onClick={closeEditProfileModal}
                    onKeyDown={closeEditProfileModal}
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
                      value={newFullName}
                      onChange={(e) => {
                        setNewFullName(e.target.value);
                      }}
                      className="mb-6 mt-12 h-[48px] w-full rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
                    />

                    <DndUpload url={url} setUrl={setUrl} />

                    <div className="mt-6 flex w-full justify-between">
                      <button
                        onClick={handleDeleteUser}
                        className="flex h-[44px] w-[190px] items-center justify-center rounded-[6px] bg-[#D20F0F] text-white"
                      >
                        {t("Profile.deleteProfile")}
                      </button>
                      <button
                        onClick={handleUpdateUser}
                        className="flex h-[44px] w-[190px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
                      >
                        {t("Profile.saveChanges")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Modal>
            <Modal
              isOpen={isDeleteProfileModaOpen}
              onRequestClose={closeDeleteProfileModal}
              style={customDeleteProfileModalStyles}
            >
              <div className="flex flex-col">
                <div className="mb-2 text-2xl font-medium dark:text-white">
                  {t("Profile.deleteProfile")}
                </div>
                <div className="mb-8 text-base dark:text-white">
                  {t("Profile.decideDeleteAccount")}?
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeDeleteProfileModal}
                    className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] text-[#2C2C2C] dark:border-[#9D9D9D] dark:text-white"
                  >
                    {t("Profile.cancel")}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#D20F0F] text-white"
                  >
                    {t("Profile.delete")}
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        )
      )}
    </Layout>
  );
};

export default ProfilePage;
