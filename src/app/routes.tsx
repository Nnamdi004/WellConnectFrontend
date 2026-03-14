import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "*",
    Component: () => <div className="flex items-center justify-center h-screen">404 - Not Found</div>,
  }
]);
