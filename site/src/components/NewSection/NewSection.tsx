/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@mui/material";
import { styled } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./NewSection.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  backgroundImage:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
  color: "white",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  position: "relative",
  clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  zIndex: 1,
  height: "100dvh",
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const TextContainer = styled("div")(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    marginRight: 0,
    marginBottom: theme.spacing(4),
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  flex: 1,
  textAlign: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "Permanent Marker, cursive",
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "left",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "1rem",
  lineHeight: 1.6,
  textAlign: "left",
  color: "white",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    margin: "0 auto",
  },
}));

const StarsContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  pointerEvents: "none",
  overflow: "hidden",
});

const Star = styled("div")(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.5)",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
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
  animation: "twinkle 5s linear infinite",
  animationDelay: `${Math.random() * 5}s`,
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

const NewSection = () => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push(
        <Star
          key={i}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      );
    }
    return stars;
  };
  return (
    <SectionContainer>
      <StarsContainer>{renderStars()}</StarsContainer>
      <Container maxWidth="md">
        <ContentContainer>
          <FloatingChart
            src={useBaseUrl("/img/mars.png")}
            alt="Floating Chart 1"
            style={{ top: "1%", left: "-2%", opacity: "0.6", zIndex: -1 }}
          />
          <FloatingChart
            src={useBaseUrl("/img/astro1.png")}
            alt="Floating Chart 1"
            style={{ bottom: "10%", left: "8%", opacity: "0.7", zIndex: -1 }}
          />
          <FloatingChart
            src={useBaseUrl("/img/mercury.png")}
            alt="Floating Chart 1"
            style={{
              bottom: "5%",
              right: "-5%",
              width: "200px",
              height: "auto",
              opacity: "0.7",
              zIndex: -1,
            }}
          />

          <TextContainer>
            <Title variant="h2" gutterBottom>
              D3-force wrapper package for React & TypeScript
            </Title>
            <Description variant="body1">
              Seamlessly integrate{" "}
              <span className={styles.orangeText}>Powerful</span> data
              visualizations into your React projects.
            </Description>
            <Description variant="body1">Key Features:</Description>
            <List>
              {[
                "Easy integration",
                "TypeScript support",
                "Custom data support",
                "Render React component",
                "Wrap different modules like (d3-zoom, d3-force, d3-drag...)",
              ].map((text) => (
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon className={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </TextContainer>
          <Hidden mdDown>
            <ImageContainer>
              <img
                src={useBaseUrl("/img/D3_JS_Projects.png")} // Replace with your image URL
                alt="Data Visualization"
                className={styles.image}
              />
            </ImageContainer>
          </Hidden>
        </ContentContainer>
      </Container>
    </SectionContainer>
  );
};

export default NewSection;
