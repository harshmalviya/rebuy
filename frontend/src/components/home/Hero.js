import React from "react";
import Card from "./Card";
import "../../styles/Hero.css";
const CARD_DATA = [
  {
    id: 1,
    name: "Contact Owners!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis scelerisque nisi in porta. Phasellus ut rutrum tellus, a varius ante. Pellentesque nunc ligula, lacinia a libero in, euismod blandit felis. Fusce vel felis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit porta rhoncus. Maecenas iaculis mauris a commodo mattis. ",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    name: "Cancel Anytime!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis scelerisque nisi in porta. Phasellus ut rutrum tellus, a varius ante. Pellentesque nunc ligula, lacinia a libero in, euismod blandit felis. Fusce vel felis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit porta rhoncus. Maecenas iaculis mauris a commodo mattis. ",
    image:
      "https://images.unsplash.com/photo-1593510987046-1f8fcfc512a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    name: "Heavy Discounts!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis scelerisque nisi in porta. Phasellus ut rutrum tellus, a varius ante. Pellentesque nunc ligula, lacinia a libero in, euismod blandit felis. Fusce vel felis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit porta rhoncus. Maecenas iaculis mauris a commodo mattis. ",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];
function Hero() {
  return (
    <section className="hero">
      {CARD_DATA.map((data) => (
        <Card key={data.id} data={data} />
      ))}
    </section>
  );
}

export default Hero;
