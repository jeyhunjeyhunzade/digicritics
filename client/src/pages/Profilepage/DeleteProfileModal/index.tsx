import { Dispatch, SetStateAction, useContext } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAccounts } from "@app/api/auth";
import Loader from "@app/components/Loader";
import useGetConfig from "@app/hooks/useGetConfig";
import useLogout from "@app/hooks/useLogout";
import { queryClient } from "@app/index";
import { AppContext } from "@app/pages/App";
import { Routes } from "@app/router/rooter";
import { AppContextShape } from "@app/types/types";
import { errorHandler, successHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface DeleteProfileModalProps {
  isDeleteProfileModaOpen: boolean;
  setIsDeleteProfileModaOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteProfileModal = (props: DeleteProfileModalProps) => {
  const { isDeleteProfileModaOpen, setIsDeleteProfileModaOpen } = props;
  const { id } = useParams();
  const { config } = useGetConfig();
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppContext) as AppContextShape;

  const { mutate: deleteUserMutate, isLoading: isDeleteUserLoading } =
    useMutation(deleteAccounts, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["similarReviews"]);

        successHandler(response);
        handleLogout();
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

  const closeDeleteProfileModal = () => {
    setIsDeleteProfileModaOpen(false);
  };

  const handleDeleteAccount = () => {
    if (id && config) {
      deleteUserMutate({ userIds: [+id], config });
    }
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

  return (
    <Modal
      isOpen={isDeleteProfileModaOpen}
      onRequestClose={closeDeleteProfileModal}
      style={customDeleteProfileModalStyles}
    >
      {isDeleteUserLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
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
      )}
    </Modal>
  );
};

export default DeleteProfileModal;
