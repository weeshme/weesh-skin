import React from "react";
import styled, { css } from "styled-components";
import Icon from "Root/components/global/Icon";
import { Link } from "react-router-dom";
import C from "Root/constants";
import uuid from "uuid";
import { DrawerDialogContext } from "Root/contexts/drawerDialog";

const StyledContainer = styled.div`
  ${C.styles.position.positionFixedZiro};
  ${({ visible }) =>
    !visible
      ? css`
          display: none;
        `
      : css`
          ${C.styles.flex.flexRow};
          ${C.styles.flex.justifyContentCenter};
        `};
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;
const StyledContent = styled.div`
  position: fixed;
  bottom: 0;
  /* left: 0; */
  /* right: 0; */
  overflow: hidden;
  ${C.styles.flex.flexColumnCenter};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 1rem 1rem 0 0;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
  z-index: 99999;
`;
const StyledHeader = styled.div`
  ${C.styles.flex.flexColumnCenter};
`;
const StyledTitle = styled.span`
  ${C.styles.flex.flexRowCenter};
  font-size: 1rem;
`;
const StyledMessage = styled.span`
  ${C.styles.flex.flexRowCenter};
  color: ${({ color, theme }) => theme.colors.gray};
  padding: 0.75rem 0 0;
  font-size: 0.85rem;
`;
const StyledButton = styled.button`
  width: 100%;
  ${({ icon }) =>
    icon
      ? css`
          ${C.styles.flex.flexRow};
          ${C.styles.flex.alignItemCenter};
          ${C.styles.flex.justifyContentBetween};
        `
      : C.styles.flex.flexRowCenter};
  background: ${({ theme }) => theme.colors.background};
  font-size: 1rem;
  vertical-align: middle;
  border: none;
  color: ${({ color, theme }) => theme.colors[color || "foreground"]};
  padding: 1rem;
  ${({ border }) =>
    border &&
    css`
      border-top: 1px ${border} ${({ theme }) => theme.colors.lightGray};
    `};
  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `};
  margin: 0;
  cursor: pointer;
`;

export default props => {
  const { drawerDialog, dispatch: drawerDialogDispatch } = React.useContext(
    DrawerDialogContext,
  );

  return (
    <StyledContainer
      visible={drawerDialog.visible}
      onClick={e => {
        if (e.target == e.currentTarget) {
          drawerDialogDispatch({
            type: "HIDE",
          });
        }
      }}>
      <StyledContent width={props.width || undefined}>
        {props.buttons &&
          props.buttons.map(button => <Button key={uuid()} {...button} />)}
      </StyledContent>
    </StyledContainer>
  );
};

const Button = props => {
  return (
    <StyledButton {...props} onClick={props.clickEvent}>
      {props.label}
      {props.icon && <Icon icon={props.icon} color={props.color} size={22} />}
    </StyledButton>
  );
};
