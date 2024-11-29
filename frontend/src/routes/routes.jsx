import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/login";
import Admin from "../pages/admin";
import Logout from "../pages/logout";
import MethodsPage from "../pages/methods";
import MainPage from "../pages/main";
import RecipePage from "../pages/recipes";
import BrewGuidePage from "../pages/brewGuide";
import NewBrewGuidePage from "../pages/newBrewGuide";
// import ProtectedRoute from "../components/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
  {
    path: "/methods",
    element: (
      <Layout>
        <MethodsPage />
      </Layout>
    ),
  },
  {
    path: "/brew-guide",
    element: (
      <Layout>
        <BrewGuidePage />
      </Layout>
    ),
  },
  {
    path: "/recipes",
    element: (
      <Layout>
        <RecipePage />
      </Layout>
    ),
  },
  {
    path: "/logout",
    element: (
      <Layout>
        <Logout />
      </Layout>
    ),
  },
  {
    path: "/new-brew-guide",
    element: (
      <Layout>
        <NewBrewGuidePage />
      </Layout>
    ),
  },
]);
