import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/index.tsx";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc.tsx";

import { AllIdeasPage } from "./pages/AllIdeasPage";
import { EditIdeaPage } from "./pages/EditIdeaPage/index.tsx";
import { NewIdeaPage } from "./pages/NewIdeaPage/index.tsx";

import { SignInPage } from "./pages/SignInPage/index.tsx";
import { SignOutPage } from "./pages/SignOutPage/index.tsx";
import { SignUpPage } from "./pages/SignUpPage/index.tsx";

import { ViewIdeaPage } from "./pages/ViewIdeaPage";

import "./styles/global.scss";

function App() {
  return (
    <>
      <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />

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
            </Route>
          </Routes>
        </BrowserRouter>
      </TrpcProvider>
    </>
  );
}

export default App;
