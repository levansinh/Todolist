import { Route, Routes } from "react-router-dom";

import { publicRouters, privateRouters } from "./routers/routes";
import PrivateRoute from "./routers/PrivateRouter.jsx";
import UnauthorizeRoute from "./routers/UnauthorizeRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        {privateRouters.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute route={route}>
                  <Page />
                </PrivateRoute>
              }
            />
          );
        })}

        {publicRouters.map((route, index) => {
          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <UnauthorizeRoute route={route}>
                  <Page />
                </UnauthorizeRoute>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
