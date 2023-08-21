import { useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";

const App = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate(Routes.login);
  };

  return (
    <div>
      <header>
        <nav className="mb-9 flex h-16 items-center justify-end border-b-2 border-b-zinc-200">
          <button
            className="mr-6 flex h-5 items-center justify-center whitespace-nowrap text-2xl"
            onClick={handleLogOut}
          >
            <span className="mr-1">log out</span>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              viewBox="0 0 20 20"
              x="0px"
              y="0px"
            >
              <g>
                <path d="M16 18h-4a2 2 0 0 1-1.964-1.622L12 14.414V16h4V4h-4v1.586l-1.964-1.964A2 2 0 0 1 12 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path>
                <path d="M7.5 6.5 9 5l5 5-5 5-1.5-1.5L10 11H2V9h8L7.5 6.5Z"></path>
              </g>
            </svg>
          </button>
        </nav>
      </header>
      <main className="flex items-center justify-center">
        App
      </main>
    </div>
  );
};

export default App;
