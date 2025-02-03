import { type TrpcRouterOutput } from "@ideation/backend/src/router";
import { createContext, useContext } from "react";
import { Alert } from "../components/Alert";
import { trpc } from "./trpc";

export type AppContext = {
  me: TrpcRouterOutput["getMe"]["me"];
};

const AppReactContext = createContext<AppContext>({
  me: null,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <AppReactContext.Provider value={{ me: data?.me }}>
      {isLoading || isFetching ? (
        <div style={{ maxWidth: "300px", margin: "10px" }}>
          <Alert mode="info">Loading...</Alert>
        </div>
      ) : isError ? (
        <div style={{ maxWidth: "300px", margin: "10px" }}>
          <Alert mode="error">Error: {error.message}</Alert>
        </div>
      ) : (
        children
      )}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppReactContext);
};

export const useMe = () => useAppContext().me;
