import React, { useState, useEffect } from "react";
import BrewGuideUpdateForm from "../brewGuides/brewGuideUpdateForm";
import { useNavigate, useParams } from "react-router-dom";

const BrewGuideUpdate = () => {
  const { id } = useParams();
  const [brewGuide, setBrewGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    setUser(loggedInUser);
    const apiToken = loggedInUser.apiToken;

    const fetchBrewGuide = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/brew_guide/brew/${id}`,
          {
            method: "GET",
            headers: {
              "auth-token": apiToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch brew guide");
        }
        const data = await response.json();
        if (data.datas && data.datas.length > 0) {
          setBrewGuide(data.datas[0]);
        } else {
          setError("Brew guide not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewGuide();
  }, [id]);

  const handleUpdateBrewGuide = async (updatedBrewGuide) => {
    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      return;
    }

    const apiToken = user.apiToken;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8001/api/brew_guide/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": apiToken,
          },
          body: JSON.stringify(updatedBrewGuide),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update brew guide");
      }

      const data = await response.json();
      if (data.message === "Brew guide updated successfully!") {
        navigate(`/admin`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Update Brew Guide</h1>
      {brewGuide && (
        <BrewGuideUpdateForm
          onSubmit={handleUpdateBrewGuide}
          initialData={brewGuide}
          user={user}
          errorMessage={error}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BrewGuideUpdate;
