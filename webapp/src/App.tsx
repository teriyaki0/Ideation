import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/index.tsx";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc.tsx";

import { AllIdeasPage } from "./pages/AllIdeasPage";
import { NewIdeaPage } from "./pages/NewIdeaPage/index.tsx";
import { ViewIdeaPage } from "./pages/ViewIdeaPage";

import "./styles/global.scss";

function App() {
  return (
    <>
      <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </TrpcProvider>
    </>
  );
}

export default App;
