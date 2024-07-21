import React from "react";
import styles from "./Card.module.css";
import { styled } from '@mui/system';
import { Typography } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Permanent Marker, cursive',
  fontSize: '3rem',
  fontWeight: 'bold',
  textAlign: 'center', // Center align the title
  marginBottom: theme.spacing(2),
}));

const data = [
  {
    id: 1,
    title: "Smooth Data Visualizations",
    description: "Create smooth and interactive data visualizations with ease using our D3 package. Effortlessly integrate complex data into your React applications while maintaining high performance.",
    image: "/img/21118602_6428509.svg",
    features: [
      "Efficient rendering for large datasets.",
      "Smooth animations and transitions.",
      "Customizable chart components.",
      "Support for TypeScript with type definitions."
    ]
  },
  {
    id: 2,
    title: "Integration with React and TypeScript",
    description: "Seamlessly integrate our D3 package with React and TypeScript projects. Utilize TypeScript's strong typing system for enhanced development experience and maintainability.",
    image: "/img/bes.png",
    features: [
      "Type-safe APIs and components.",
      "React hooks for state management.",
      "Reusable chart components.",
      "Optimized performance in React applications."
    ]
  },
  {
    id: 3,
    title: "Comprehensive Documentation",
    description: "Access comprehensive documentation and dedicated support to guide you through integrating and using our D3 package effectively. Learn best practices and tips from our community and experts.",
    image: "/img/5573507_2920021.svg",
    features: [
      "Detailed API documentation.",
      "Example code snippets and tutorials.",
      "Community forums for assistance.",
      "Regular updates and new features."
    ]
  }
];

const Cards = () => {
  return (
    <div>
      <Title variant="h1" gutterBottom>
        Features
      </Title>
      <div className={styles.cardsContainer}>
        {data.map((card) => (
          <div className={styles.card} key={card.id}>
            <img
              src={card.image}
              alt=""
              className={styles.gifImage}
            />
            <div className={styles.heading}>{card.title}</div>
            <div className={styles.icons}>
              {/* Icons or additional content can be added here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
