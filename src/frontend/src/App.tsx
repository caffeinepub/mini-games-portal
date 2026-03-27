import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GamePlayerPage from "./pages/GamePlayerPage";
import HomePage from "./pages/HomePage";

function RootLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return <HomePage searchQuery="" />;
  },
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games/$id",
  component: GamePlayerPage,
});

const routeTree = rootRoute.addChildren([indexRoute, gameRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
