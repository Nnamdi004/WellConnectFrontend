import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import IntakePage from "./pages/IntakePage";
import ForumPage from "./pages/ForumPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/auth", Component: AuthPage },
  { path: "/intake", Component: IntakePage },
  { path: "/forum", Component: ForumPage },
  { path: "/dashboard", Component: DashboardPage },
  { path: "/chat", Component: ChatPage },
  { path: "/admin", Component: AdminPage },
]);
