import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { updateUser } from "@app/api/users";
import CloseIcon from "@app/assets/icons/CloseIcon";
import DndUpload from "@app/components/DndUploadSingle";
import Loader from "@app/components/Loader";
import useGetConfig from "@app/hooks/useGetConfig";
import { queryClient } from "@app/index";
import { AppContext } from "@app/pages/App";
import { AppContextShape, UsersData } from "@app/types/types";
import { errorHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";

interface EditProfileModalProps {
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: Dispatch<SetStateAction<boolean>>;
  profileData: UsersData;
  handleDeleteUser: () => void;
}

const EditProfileModal = (props: EditProfileModalProps) => {
  const {
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    profileData,
    handleDeleteUser,
  } = props;
  const { id } = useParams();
  const { config } = useGetConfig();
  const { t } = useTranslation();

  const [url, setUrl] = useState<string>();
  const [newFullName, setNewFullName] = useState<string>("");

  const { setLoggedUser, isDarkMode, selectedUserId, setSelectedUserId } =
    useContext(AppContext) as AppContextShape;

  const { mutate: updateUserMutate, isLoading: isUpdateUserMutateLoading } =
    useMutation(updateUser, {
      onSuccess: (response) => {
        !selectedUserId && setLoggedUser(response);
        closeEditProfileModal();
        queryClient.invalidateQueries(["userById"]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["reviewById"]);
      },
      onError: errorHandler,
    });

  const closeEditProfileModal = () => {
    setNewFullName("");
    setUrl("");
    setSelectedUserId(null);
    setIsEditProfileModalOpen(false);
  };

  const handleUpdateUser = () => {
    if (id) {
      updateUserMutate({
        id: selectedUserId ? selectedUserId : +id,
        fullName: newFullName,
        profileImage: url ? url : profileData?.profileImage,
        config,
      });
    }
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
    <Modal
      isOpen={isEditProfileModalOpen}
      onRequestClose={closeEditProfileModal}
      style={customEditProfileModalStyles}
    >
      {isUpdateUserMutateLoading ? (
        <div className="flex h-full items-center justify-center">
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
  );
};

export default EditProfileModal;
