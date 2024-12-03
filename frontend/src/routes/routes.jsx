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
import ErrorPage from "../pages/error";
import RegisterPage from "../pages/register";
import NewRecipePage from "../pages/newRecipe";
import RecipeDetailPage from "../pages/recipeDetail";
import TermPage from "../pages/termOfUse";
import AboutPage from "../pages/about";
// import ProtectedRoute from "../components/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
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
    path: "/register",
    element: (
      <Layout>
        <RegisterPage />
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
    path: "/new-brew-guide",
    element: (
      <Layout>
        <NewBrewGuidePage />
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
    path: "/new-recipe",
    element: (
      <Layout>
        <NewRecipePage />
      </Layout>
    ),
  },
  {
    path: "/recipe/:id",
    element: (
      <Layout>
        <RecipeDetailPage />
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
    path: "/term-of-use",
    element: (
      <Layout>
        <TermPage />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <AboutPage />
      </Layout>
    ),
  },
]);
