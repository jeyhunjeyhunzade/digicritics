import { useEffect, useState } from "react";
import { ApiConfig } from "@app/types/types";
import { useAuth0 } from "@auth0/auth0-react";

const useGetConfig = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [config, setConfig] = useState<ApiConfig>();

  const getConfig = async (): Promise<ApiConfig> => {
    const accessToken = await getAccessTokenSilently();

    return {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  };

  useEffect(() => {
    const resolveApiConfig = async () => {
      if (user) {
        try {
          const apiConfig = await getConfig();
          setConfig(apiConfig);
        } catch (error) {
          console.error("Error fetching config:", error);
        }
      }
    };

    resolveApiConfig();
  }, [user]);

  return { config };
};

export default useGetConfig;
