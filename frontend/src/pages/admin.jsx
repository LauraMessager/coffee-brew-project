// Admin.js
import React, { useState, useEffect } from "react";
import BrewGuideTable from "../components/brewGuides/brewGuideTable";
import MethodTable from "../components/methods/methodsTable";
import UserTable from "../components/users/userTable";
import { Link } from "react-router-dom";
import "../styles/admin.scss";
import BrewGuideDelete from "../components/brewGuides/brewGuideDelete";

const Admin = () => {
  const [brewGuides, setBrewGuides] = useState([]);
  const [methods, setMethods] = useState([]);
  const [users, setUsers] = useState([]);
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
        const response = await fetch("http://localhost:8001/api/method/", {
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

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/user/list", {
          method: "GET",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(Array.isArray(data.datas) ? data.datas : []);
      } catch (error) {
        setError(error.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
    fetchBrewGuides();
    fetchUsers();
  }, []);

  const handleDeleteSuccess = (id) => {
    setBrewGuides((prevBrewGuides) =>
      prevBrewGuides.filter((brewGuide) => brewGuide._id !== id)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-page">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Below add, update and delete your website content</p>

      <div>
        <Link to="/methods">
          <button className="adm-btn">+ Method</button>
        </Link>
        <Link to="/new-brew-guide">
          <button className="adm-btn">+ Brew Guide</button>
        </Link>
      </div>

      <div className="brew-guides-section">
        <BrewGuideTable
          brewGuides={brewGuides}
          renderDeleteButton={(id) => (
            <BrewGuideDelete id={id} onDeleteSuccess={handleDeleteSuccess} />
          )}
        />
      </div>
      <div className="brew-guides-section">
        <MethodTable methods={methods} />
      </div>
      <div className="users-section">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Admin;
