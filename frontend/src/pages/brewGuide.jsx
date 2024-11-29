import React, { useState, useEffect } from "react";
import BrewGuide from "../components/brewGuides/brewGuide";

const BrewGuidePage = () => {
  const [brewGuides, setBrewGuides] = useState([]);
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
        setBrewGuides(data.datas);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewGuides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="brew-guide-page">
      <h1>Brew Guides</h1>
      <div className="brew-guides-list">
        {brewGuides.map((guide) => (
          <BrewGuide
            key={guide.id}
            title={guide.title}
            description={guide.description}
            created_by={guide.created_by}
          />
        ))}
      </div>
    </div>
  );
};

export default BrewGuidePage;
