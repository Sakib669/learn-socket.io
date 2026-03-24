import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./components/Join.tsx";
import Chat from "./components/Chat.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Join />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
);
