import Layout from "@app/components/Layout";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="jutify-center flex items-center">Login</div>
    </Layout>
  );
};

export default Login;
