import React from "react";
import styled from "styled-components";
import { ExploreContext } from "Root/contexts/explore";
import Container from "Root/components/desktop/Container";
import uuid from "uuid";
import List from "Root/components/desktop/List";
import Icon from "Root/components/global/Icon";
import Loading from "Root/components/global/Loading";
import BannerMessage from "Root/components/global/BannerMessage";
import helpers from "Root/helpers";
import C from "Root/constants";

const StyledMain = styled.div`
  ${C.styles.flex.flexColumn};
  ${C.styles.flex.justifyContentCenter};
  background: ${({ theme }) => theme.colors.background};
  padding: 0 0.5rem 0;
`;

const StyledLoading = styled.div`
  padding: 1rem 0;
`;

const StyledNotFound = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.alignItemsCenter};
  color: ${({ theme }) => theme.colors.dark};
  padding: 1rem 0.5rem 0;
`;

const StyledNotFoundMessage = styled.span`
  margin: 0 0 0 0.25rem;
  color: inherit;
`;

const StyledBannerMessageContainer = styled.div`
  ${C.styles.flex.flexColumnCenter};
  ${C.styles.flex.justifyContentCenter};
`;

export default () => {
  const { explore } = React.useContext(ExploreContext);
  return (
    <StyledMain>
      {explore.loading ? (
        <StyledLoading>
          <Loading size={20} strokeWidth={1.25} color="gray" />
        </StyledLoading>
      ) : (
        explore.results &&
        (explore.results.length > 0 ? (
          <List users={explore.results} />
        ) : (
          <StyledNotFound>
            <Icon icon="Info" />
            <StyledNotFoundMessage>
              {C.txts.en.g.noResultsFound}
            </StyledNotFoundMessage>
          </StyledNotFound>
        ))
      )}
    </StyledMain>
  );
};
