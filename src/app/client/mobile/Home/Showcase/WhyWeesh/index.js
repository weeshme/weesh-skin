import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import Section from "Root/components/global/Section";
import Card from "Root/app/client/mobile/Home/Showcase/Card";
import Star from "Root/public/img/showcase/magic-star.svg";
import Diamond from "Root/public/img/showcase/diamond.svg";
import Lock from "Root/public/img/showcase/lock.svg";
import Medal from "Root/public/img/showcase/medal.svg";

const StyledContainer = styled.div`
  ${C.styles.flex.flexColumnCenter};
  padding: 0 0.5rem 0.5rem;
`;

export default props => {
  const cards = [
    {
      title: "secert weesh",
      description:
        "Need more security? Turn your wish to secert weesh so no one can read it.",
      icon: Lock,
    },
    {
      title: "gain credit",
      description:
        "Every action that help others will be appreciated with weesh digital credit.",
      icon: Diamond,
    },
    {
      title: "join challenges",
      description:
        "No idea what to weesh?Attend challenges that @weesh suggests.",
      icon: Medal,
    },
  ];

  const bigCard = {
    title: "built specially for dreaming",
    description:
      "Weesh is all dedicated to dreams.Every features either exits in app or can be told to us.",
    icon: Star,
  };
  return (
    <StyledContainer>
      <Section>
        <Card
          icon={bigCard.icon}
          title={bigCard.title}
          description={bigCard.description}
          width={110}
          flexDirection="column"
          color={C.themes[`${props.auth.theme}`].colors.foreground}
        />
      </Section>
      <Section>
        {cards.map(card => (
          <Card
            icon={card.icon}
            title={card.title}
            description={card.description}
            width={60}
            flexDirection="column"
            color={C.themes[`${props.auth.theme}`].colors.foreground}
          />
        ))}
      </Section>
    </StyledContainer>
  );
};
