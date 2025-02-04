import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/index.tsx";
import { AppContextProvider } from "./lib/ctx.tsx";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc.tsx";

import { SignInPage } from "./pages/auth/SignInPage/index.tsx";
import { SignOutPage } from "./pages/auth/SignOutPage/index.tsx";
import { SignUpPage } from "./pages/auth/SignUpPage/index.tsx";
import { AllIdeasPage } from "./pages/ideas/AllIdeasPage/index.tsx";
import { EditIdeaPage } from "./pages/ideas/EditIdeaPage/index.tsx";
import { NewIdeaPage } from "./pages/ideas/NewIdeaPage/index.tsx";

import { ViewIdeaPage } from "./pages/ideas/ViewIdeaPage/index.tsx";
import { NotFoundPage } from "./pages/other/NotFoundPage/index.tsx";


import "./styles/global.scss";

function App() {
  return (
    <>
      <TrpcProvider>
        <BrowserRouter>
          <AppContextProvider>
            <Routes>
              <Route
                path={routes.getSignOutRoute()}
                element={<SignOutPage />}
              />
              <Route element={<Layout />}>
                <Route
                  path={routes.getSignUpRoute()}
                  element={<SignUpPage />}
                />
                <Route
                  path={routes.getSignInRoute()}
                  element={<SignInPage />}
                />
                <Route
                  path={routes.getAllIdeasRoute()}
                  element={<AllIdeasPage />}
                />
                <Route
                  path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
                  element={<ViewIdeaPage></ViewIdeaPage>}
                />
                <Route
                  path={routes.getNewIdeaRoute()}
                  element={<NewIdeaPage />}
                />
                <Route
                  path={routes.getSignOutRoute()}
                  element={<NewIdeaPage />}
                />
                <Route
                  path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)}
                  element={<EditIdeaPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AppContextProvider>
        </BrowserRouter>
      </TrpcProvider>
    </>
  );
}

export default App;
