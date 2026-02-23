import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./router.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import { FollowProvider } from "./context/followContext.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FollowProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </FollowProvider>
    </AuthProvider>
  </StrictMode>,
);
