import { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getUserById } from "@app/api/users";
import AvatarIcon from "@app/assets/icons/AvatarIcon";
import EditIcon from "@app/assets/icons/EditIcon";
import PlusIcon from "@app/assets/icons/PlusIcon";
import Loader from "@app/components/Loader";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import Layout from "@app/layout/AppLayout";
import { AppContext } from "@app/pages/App";
import { UserStatus } from "@app/types/enums";
import {
  AppContextShape,
  Review,
  ReviewsData,
  UsersData,
} from "@app/types/types";
import { calculateAverageRate, dateFormatter } from "@app/utils";
import { useQuery } from "@tanstack/react-query";
import DeleteProfileModal from "./DeleteProfileModal";
import DeleteReviewModal from "./DeleteReviewModal";
import EditProfileModal from "./EditProfileModal";
import ReviewsTable from "./ReviewsTable";

const ProfilePage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const [isOwnPage, setIsOwnPage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tableData, setTableData] = useState<Review[]>([]);
  const [isDeleteProfileModaOpen, setIsDeleteProfileModaOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const {
    setIsReviewEditorOpen,
    loggedUser,
    isDeleteReviewModalOpen,
    setIsDeleteReviewModalOpen,
    setSelectedUserId,
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
  }, [loggedUser, userByIdData]);

  useEffect(() => {
    if (userByIdData?.reviews) {
      const formatDataForTable: Review[] = userByIdData.reviews.map(
        (review: Omit<ReviewsData, "user">) => {
          return {
            id: review.id,
            reviewTitle: review.reviewTitle,
            workName: review.workName,
            category: review?.category?.name,
            reviewGrade: review.reviewGrade,
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
  }, [userByIdData]);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const openReviewEditorModal = () => {
    setIsReviewEditorOpen(true);
  };

  const handleDeleteUser = () => {
    setIsEditProfileModalOpen(false);
    setIsDeleteProfileModaOpen(true);
  };

  return (
    <Layout>
      {isUserByIdLoading ? (
        <div className="flex h-[90vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        userByIdData && (
          <div className="flex min-h-[91vh] w-full flex-col px-20 py-6 dark:bg-[#1B1B1B]">
            <div className="mb-10 flex w-full justify-start">
              {userByIdData?.profileImage ? (
                <img
                  src={userByIdData.profileImage}
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
                      {userByIdData?.fullName}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center dark:text-white">
                    <table>
                      <tbody className="text-left">
                        <tr className="mb-2">
                          <td className="font-medium">{t("Profile.email")}</td>
                          <td className="pl-6 font-normal">
                            {userByIdData?.email}
                          </td>
                        </tr>
                        <tr className="mb-2">
                          <td className="font-medium">{t("Profile.likes")}</td>
                          <td className="pl-6 font-normal">
                            {userByIdData?.Like?.length}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">
                            {t("Profile.created")}
                          </td>
                          <td className="pl-6 font-normal">
                            {userByIdData?.createdTime &&
                              dateFormatter(userByIdData.createdTime)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {(isOwnPage || isAdmin) && (
                  <div className="flex">
                    <button
                      onClick={() => {
                        if (id && !isOwnPage) {
                          setSelectedUserId(+id);
                        }
                        openReviewEditorModal();
                      }}
                      className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
                    >
                      <span className="pr-2">{t("Profile.newReview")}</span>
                      <PlusIcon size={20} color={"white"} />
                    </button>
                    <button
                      onClick={() => {
                        if (id && !isOwnPage) {
                          setSelectedUserId(+id);
                        }
                        openEditProfileModal();
                      }}
                      className="ml-4 flex h-[40px] w-fit items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] px-4 py-[10px] text-[#2C2C2C] dark:border-[#2C2C2C] dark:text-white"
                    >
                      <span className="pr-2">{t("Profile.editProfile")}</span>
                      <EditIcon size={20} color={"#2C2C2C"} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              {tableData.length ? (
                <ReviewsTable
                  tableData={tableData}
                  isAdmin={isAdmin}
                  isOwnPage={isOwnPage}
                />
              ) : (
                <div className="flex h-[50vh] items-center justify-center">
                  <div className="text-2xl	font-semibold text-[#717171]">
                    {t("Profile.notHaveReview")}
                  </div>
                </div>
              )}
            </div>
            <EditProfileModal
              isEditProfileModalOpen={isEditProfileModalOpen}
              setIsEditProfileModalOpen={setIsEditProfileModalOpen}
              profileData={userByIdData}
              handleDeleteUser={handleDeleteUser}
            />
            <DeleteProfileModal
              isDeleteProfileModaOpen={isDeleteProfileModaOpen}
              setIsDeleteProfileModaOpen={setIsDeleteProfileModaOpen}
            />
            <DeleteReviewModal
              isDeleteReviewModalOpen={isDeleteReviewModalOpen}
              setIsDeleteReviewModalOpen={setIsDeleteReviewModalOpen}
            />
          </div>
        )
      )}
    </Layout>
  );
};

export default ProfilePage;
