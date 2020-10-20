import React from "react";
import { AuthContext } from "Root/contexts/auth";
import Showcase from "./Showcase";
import Main from "./Main";
import styled from "styled-components";

const StyledContainer = styled.div``;

export default props => {
  const { auth } = React.useContext(AuthContext);
  return (
    <StyledContainer>
      {!auth.token ? <Showcase {...props} /> : <Main />}
    </StyledContainer>
  );
};
