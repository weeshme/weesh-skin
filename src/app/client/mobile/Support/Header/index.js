import React from "react";
import styled from "styled-components";
import Logo from "Root/components/global/Logo";
import BackButton from "Root/components/global/BackButton";
import Icon from "Root/components/global/Icon";
import Header from "Root/app/client/mobile/Template/Header";

const StyledTitle = styled.strong`
  color: ${({ theme }) => theme.colors.foreground};
  text-transform: capitalize;
`;

export default props => {
  return (
    <Header>
      <BackButton />
      <StyledTitle>Support</StyledTitle>
      <Icon size={24} color="background" icon="ChevronLeft" />
    </Header>
  );
};
