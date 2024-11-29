import React, { useState, useEffect } from "react";
import BrewGuideTable from "../components/brewGuides/brewGuideTable";
import MethodTable from "../components/methods/methodsTable";

const Admin = () => {
  const [brewGuides, setBrewGuides] = useState([]);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const apiToken = user.apiToken;

    const fetchBrewGuides = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/brew_guide/", {
          method: "GET",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch brew guides");
        }

        const data = await response.json();

        setBrewGuides(Array.isArray(data.datas) ? data.datas : []);
      } catch (error) {
        setError(error.message || "Failed to fetch brew guides");
      } finally {
        setLoading(false);
      }
    };

    const fetchMethods = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/recipe/", {
          method: "GET",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch methods");
        }

        const data = await response.json();

        setMethods(Array.isArray(data.datas) ? data.datas : []);
      } catch (error) {
        setError(error.message || "Failed to fetch methods");
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
    fetchBrewGuides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="brew-guides-section">
        <h2>Brew Guides</h2>
        <BrewGuideTable brewGuides={brewGuides} />
      </div>
      <div className="brew-guides-section">
        <h2>Methods</h2>
        <MethodTable methods={methods} />
      </div>
    </div>
  );
};

export default Admin;
