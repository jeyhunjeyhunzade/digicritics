import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };
  useEffect(() => {
    console.warn(error);
  }, []);

  return (
    <div className="grid h-[100vh] w-[100%] place-items-center">
      <div id="error-page">
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
}
