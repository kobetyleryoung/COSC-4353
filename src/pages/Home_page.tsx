import React from "react";

const Home_page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to CougarAI!</h1>
      <p style={styles.text}>
        You are logged in 🎉. This is your home page. From here, you can explore
        your profile, events, volunteer matching, and more using the navigation bar.
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    color: "#666",
  },
};

export default Home_page;
