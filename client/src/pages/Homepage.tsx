import { useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";
import Layout from "@app/components/Layout";

const App = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate(Routes.auth);
  };

  return <Layout>Homepage</Layout>;
};

export default App;
