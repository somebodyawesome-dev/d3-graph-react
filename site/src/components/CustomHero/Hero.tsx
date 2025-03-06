/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Hero.js
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./Hero.module.css";
import { useHistory } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  backgroundImage:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
  color: "white",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(20),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 95%)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100dvh",
}));

const Star = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.5)",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
  animation: "twinkle 5s linear infinite",
  width: "2px",
  height: "2px",
  zIndex: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    width: "1px",
    height: "1px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.8)",
    top: "-1px",
    left: "-1px",
  },
  "@keyframes twinkle": {
    "0%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(0)",
      opacity: 0,
    },
  },
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto Slab, serif",
  fontWeight: "bold",
  fontSize: "3rem",
  animation: "fadeInUp 1s ease-in-out",
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "&:hover": {
    color: "#ff6f61",
    transition: "color 0.3s ease-in-out",
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "1.5rem",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(12),
  opacity: 0.9,
  animation: "fadeIn 1s ease-in-out",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

const FloatingImages = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  pointerEvents: "none",
}));

const FloatingChart = styled("img")(({ theme }) => ({
  position: "absolute",
  width: "150px",
  animation: "floatUpDown 8s ease-in-out infinite alternate",
  "@keyframes floatUpDown": {
    "0%": {
      transform: "translateY(0)",
    },
    "100%": {
      transform: "translateY(-20px)",
    },
  },
}));

const Hero = () => {
  const history = useHistory();
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push(
        <Star
          key={i}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <HeroContainer>
      {renderStars()}
      <FloatingImages>
        <FloatingChart
          src={useBaseUrl("/img/mars.png")}
          alt="Floating Chart 1"
          style={{ top: "1%", left: "-2%", opacity: "0.6" }}
        />
        <FloatingChart
          src={useBaseUrl("/img/chart3.png")}
          alt="Floating Chart 3"
          style={{ top: "60%", left: "5%", opacity: "0.6" }}
        />
      </FloatingImages>

      {/* Flèche pour défiler vers le bas, masquée sur petits écrans */}
      <FloatingChart
        src={useBaseUrl("/img/arrow-down.svg")}
        alt="Scroll Down"
        className={styles.arrowDown}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      />

      <Container maxWidth="md">
        <AnimatedText variant="h2" gutterBottom>
          D3 JS Package
        </AnimatedText>
        <SubText variant="h5" gutterBottom>
          Your go-to library for D3 with React and TypeScript
        </SubText>
        <div className={styles.btncontainer} style={{ marginTop: "auto" }}>
          <button
            className={styles.btn}
            type="button"
            onClick={() => history.push("/docs/Introduction")}
          >
            <strong>Get Started</strong>
            <div id={styles.containerstars}>
              <div id={styles.stars}></div>
            </div>
            <div id={styles.glow}>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
            </div>
          </button>
        </div>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
