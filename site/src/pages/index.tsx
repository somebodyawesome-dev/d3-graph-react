// src/pages/index.js
import Layout from "@theme/Layout";
import Hero from "../components/CustomHero/Hero";
import Cards from "../components/CardsFeatures/Cards";
import Footer from "../components/FooterSection/footer";
import NewSection from "../components/NewSection/NewSection";
import MarqueeDemo from "../components/TestimonialsSection/Testimonials";
import PlayGround from "../components/Playground";
const Home = () => {
  return (
    <Layout
      title={`Welcome to D3 Package`}
      description="Learn how to use the D3 package efficiently."
      noFooter
    >
      <Hero />
      <main>
        {/* <Cards /> */}
        <NewSection /> {/* Include the new section component */}
        <Footer />
        {/* *<MarqueeDemo /> * */}
      </main>
    </Layout>
  );
};

export default Home;
