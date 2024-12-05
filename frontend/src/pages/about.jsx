import React from "react";

const AboutPage = () => {
  return (
    <div style={pageStyle}>
      <div style={imgContainerStyle}>
        <img style={imgStyle} src="/CoffeeBrewLogo.png" alt="coffebrew" />
        <strong style={spanStyle}>&nbsp;&nbsp;X&nbsp;&nbsp;</strong>
        <img style={imgStyle} src="/SCALogo.png" alt="scacoffee" />
      </div>
      <h1>About SCA</h1>
      <p>
        The Specialty Coffee Association (SCA) is a trade association built on
        foundations of openness, inclusivity, and the power of shared knowledge.
        SCA’s purpose is to foster global coffee communities to support
        activities to make coffee a more sustainable, equitable, and thriving
        activity for the whole value chain. From coffee farmers to baristas and
        roasters, our membership spans the globe, encompassing every element of
        the coffee value chain. The SCA acts as a unifying force within the
        specialty coffee industry and works to make coffee better by raising
        standards worldwide through a collaborative and progressive approach.
        Dedicated to building an industry that is fair, sustainable, and
        nurturing for all, the SCA draws on years of insights and inspiration
        from the specialty coffee community.
      </p>
      <h2>Our Purpose</h2>
      <p>
        The SCA will foster a global coffee community and support activity to
        make specialty coffee a thriving, equitable, and sustainable activity
        for the entire value chain.
      </p>
      <h2>Our Vision</h2>
      <p>
        To create an effective, authentic, and dynamic organization to give
        voice and substance to the possibilities for specialty coffee worldwide.
      </p>
      <h2>Our Mission</h2>
      <p>
        Engage, inspire, and expand a sustainable global specialty coffee
        community through leadership in events, education, and research.
      </p>
      <h2>About the Specialty Coffee Movement</h2>
      <p>
        The specialty coffee world attracts more and more coffee enthusiasts
        every year who are eager to deepen their knowledge, improve their
        skills, and evolve in a more ethical and eco-friendly environment. This
        social movement, known as "third wave coffee," emphasizes integrating
        ethical and ecological awareness into a sector often marked by
        overconsumption.
      </p>
      <p>
        This project aims to offer users a friendly and intuitive platform to
        explore and create coffee recipes. With this initiative, the Specialty
        Coffee Association (SCA) seeks to expand the coffee recipe offerings,
        allowing users to discover creations from coffee champions and explore
        various extraction methods at home.
      </p>
      <p>
        The platform will provide access to a variety of recipes based on
        different extraction techniques, allowing users to customize and save
        them for later use. A ratio calculator will also be available,
        facilitating conversions and helping users better understand the many
        possible extraction combinations.
      </p>
      <p>
        Recipes will be regularly updated based on ongoing competitions and new
        coffee innovations, giving users the freedom to explore the numerous
        aspects that coffee has to offer. Beneath this fun initiative lies a
        real awareness and commitment to a more thoughtful and responsible
        coffee consumption.
      </p>
    </div>
  );
};

const pageStyle = {
  fontFamily: "Roboto, sans-serif",
  padding: "20px",
  lineHeight: "1.6",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const imgContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};
const imgStyle = {
  height: "150px",
  marginBottom: "5px",
};

const spanStyle = {
  color: "#f25042",
  fontSize: "34px",
};

export default AboutPage;
