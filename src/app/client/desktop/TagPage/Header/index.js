import React from "react";
import styled from "styled-components";
import BackButton from "Root/components/global/BackButton";
import Avatar from "Root/components/global/Avatar";
import FullName from "Root/components/global/FullName";
import Loading from "Root/components/global/Loading";
import Icon from "Root/components/global/Icon";
import Navbar from "Root/components/mobile/Navbar";
import { AuthContext } from "Root/contexts/auth";
import { TagContext } from "Root/contexts/tag";
import avatar from "Root/public/img/avatar.jpg";
import C from "Root/constants";

const StyledContainer = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentBetween};
  ${C.styles.flex.alignItemsCenter};
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  padding: 0 0.75rem;
  height: 54px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledTag = styled.div`
  color: ${({ theme }) => theme.colors.foreground};
  width: 99%;
  font-weight: bold;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

export default props => {
  const { auth, dispatch } = React.useContext(AuthContext);
  const { tag } = React.useContext(TagContext);

  return (
    <StyledContainer>
      {tag && (
        <>
          <BackButton icon="ArrowLeft" />
          <StyledTag>#{props.match.params.tagTitle}</StyledTag>
          <Icon color="background" />
        </>
      )}
    </StyledContainer>
  );
};
