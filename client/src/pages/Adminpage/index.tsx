import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUsers } from "@app/api/users";
import Loader from "@app/components/Loader";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import Layout from "@app/layout/AppLayout";
import { UsersData } from "@app/types/types";
import { dateFormatter } from "@app/utils";
import { useQuery } from "@tanstack/react-query";
import UsersTable from "./UsersTable";

const AdminPage = () => {
  const { onError } = useError();
  const { config } = useGetConfig();
  const [tableData, setTableData] = useState<UsersData[]>([]);

  const { data: usersData, isLoading: isUsersDataLoading } = useQuery<
    UsersData[]
  >(
    ["users", config],
    () => {
      if (config) {
        return getUsers(config);
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
    if (usersData) {
      const formatDataForTable: UsersData[] = usersData?.map(
        (user: UsersData) => {
          return {
            ...user,
            createdTime: dateFormatter(user.createdTime),
          };
        }
      );
      setTableData(formatDataForTable);
    }
  }, [usersData]);

  return (
    <Layout>
      <div className="flex w-full flex-col px-20 py-20 dark:bg-[#1B1B1B]">
        {isUsersDataLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <UsersTable tableData={tableData} />
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
