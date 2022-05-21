import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { IssuesContextProvider } from "./contexts/IssuesContext";
import { RoleContextProvider } from "./contexts/RoleContext";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <RoleContextProvider>
        <IssuesContextProvider>
          <App />
        </IssuesContextProvider>
      </RoleContextProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
