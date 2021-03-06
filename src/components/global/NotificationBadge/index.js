import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import { NotificationsContext } from "Root/contexts/notifications";
import { AuthContext } from "Root/contexts/auth";
import { useSubscription, useLazyQuery, useQuery } from "@apollo/react-hooks";
import api from "Root/api";

const StyledBadge = styled.span`
  position: absolute;
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.justifyContentCenter};
  ${C.styles.flex.alignItemsCenter};
  top: -0.3rem;
  right: -0.1rem;
  border-radius: 5rem;
  border: 3px solid ${({ theme }) => theme.colors.background};
  min-height: 0.5rem;
  min-width: 0.5rem;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
`;

export default () => {
  const { auth } = React.useContext(AuthContext);
  const { notifications, dispatch: notificationDispatch } = React.useContext(
    NotificationsContext,
  );

  return Object.values(notifications.store).length > 0 &&
    !Object.values(notifications.store)[0].read ? (
    <StyledBadge />
  ) : (
    ""
  );
};
