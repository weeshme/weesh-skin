import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import Avatar from "Root/components/global/Avatar";
import Icon from "Root/components/global/Icon";
import DrawerDialog from "Root/components/global/DrawerDialog";
import Dialog, { DialogButton } from "Root/components/global/Dialog";
import moment from "moment";
import FullName from "Root/components/global/FullName";
import helpers from "Root/helpers";
import useHistory from "Root/hooks/useHistory";
import { useMutation } from "@apollo/react-hooks";
import api from "Root/api";
import { AuthContext } from "Root/contexts/auth";
import { SnackBarContext } from "Root/contexts/snackbar";
import { DrawerDialogContext } from "Root/contexts/drawerDialog";

const StyledHeader = styled.div`
  padding: 0.75rem 0.75rem 0;
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentBetween};
`;

const StyledNameContainer = styled.div`
  ${C.styles.flex.flexColumn};
  margin: 0 0 0 0.5rem;
`;

const StyledUsername = styled.small`
  ${C.styles.flex.flexRow};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const StyledLeftSide = styled.div`
  ${C.styles.flex.flexRow};
`;

const StyledIcon = styled.span`
  cursor: pointer;
`;

const StyledTextArea = styled.textarea`
  height: 0;
  width: 0;
  resize: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.background};
`;

const StyledHeaderDialog = styled.div`
  ${C.styles.flex.flexColumnCenter};
`;

const StyledHeaderDialogMessage = styled.strong`
  color: ${({ theme }) => theme.colors.foreground};
  padding: 1rem 0;
`;

const StyledRightSide = styled.div``;

const initialDialog = {
  visible: false,
};

export default props => {
  const { auth } = React.useContext(AuthContext);
  const { snackbar, dispatch: snackbarDispatch } = React.useContext(
    SnackBarContext,
  );
  const { drawerDialog, dispatch: drawerDialogDispatch } = React.useContext(
    DrawerDialogContext,
  );
  const [dialog, setDialog] = React.useState(initialDialog);
  const [deleteWeesh, { data, error, loading }] = useMutation(
    api.weeshes.deleteWeesh,
    {
      variables: {
        weeshId: `${props.id}`,
      },
    },
  );

  const textarea = React.useRef();
  const history = useHistory();
  let buttons = [
    {
      label: "Delete",
      icon: "Trash2",
      color: "red",
      clickEvent: () => {
        toggleDrawerDialog(false);
        toggleDialog(true);
      },
      // fontWeight: 'bold',
    },
    {
      label: "Edit",
      icon: "Edit",
      color: "foreground",
      clickEvent: () => {
        history.push(`/w/${props.link}/edit`);
      },
      // fontWeight: 'bold',
      border: auth.id == props.user.id ? "dashed" : false,
    },
    {
      label: "Copy URL",
      icon: "Copy",
      color: "foreground",
      clickEvent: () => {
        textarea.current.disabled = false;
        textarea.current.select();
        document.execCommand("copy");
        textarea.current.disabled = true;
        window.getSelection().removeAllRanges();
        toggleDrawerDialog(false);
        snackbarDispatch({
          type: "SET_DATA",
          data: {
            icon: "Copy",
            message: "URL copied to clipboard.",
            background: "foreground",
            visible: true,
          },
        });
        setTimeout(() => {
          snackbarDispatch({ type: "HIDE" });
        }, 2 * 1000);
      },
      // fontWeight: 'bold',
      border: auth.id == props.user.id ? "dashed" : false,
    },
    {
      label: "Cancel",
      color: "foreground",
      clickEvent: () => toggleDrawerDialog(false),
      // fontWeight: 'bold',
      border: "dashed",
    },
  ];

  if (auth.id !== props.user.id) {
    buttons = buttons.splice(2);
  } else {
    // const weeshTime = new Date(props.createdAt).getTime()
    // const newTime = new Date().getTime()
    // const hours = Math.floor((newTime - weeshTime) / (60 * 60 * 1000))
    // if(hours >= 12) {
    //     buttons.splice(1,1)
    // }
  }

  const toggleDrawerDialog = visible => {
    drawerDialogDispatch({
      type: visible ? "SHOW" : "HIDE",
    });
  };
  const toggleDialog = visible => {
    setDialog(prevState => ({
      ...prevState,
      visible,
    }));
  };

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      snackbarDispatch({
        type: "SET_DATA",
        data: {
          icon: "Trash2",
          message: "Your weesh deleted successfully.",
          background: "foreground",
          visible: true,
        },
      });
      setTimeout(() => {
        snackbarDispatch({ type: "HIDE" });
      }, 2 * 1000);
      history.push(`/${auth.username}`);
    }
  }, [data]);

  return (
    <StyledRightSide>
      <StyledTextArea
        disabled
        ref={textarea}
        defaultValue={`${window.location.origin}/w/${props.link}`}
        inputMode="none"
      />
      <DrawerDialog
        width={window.innerWidth < 960 ? "100%" : "30%"}
        buttons={buttons}
      />
      <Dialog
        width={window.innerWidth < 960 ? "65%" : "18rem"}
        {...dialog}
        toggleDialogFunction={visible => toggleDialog(visible)}>
        <StyledHeaderDialog>
          <StyledHeaderDialogMessage>
            Delete your Weesh?
          </StyledHeaderDialogMessage>
        </StyledHeaderDialog>
        <DialogButton
          onClick={() => {
            deleteWeesh();
            toggleDialog(false);
          }}
          fontWeight="bold"
          color="red">
          Delete
        </DialogButton>
        <DialogButton fontWeight="bold" onClick={() => toggleDialog(false)}>
          Cancel
        </DialogButton>
      </Dialog>
      <StyledIcon>
        <Icon
          onClick={() => toggleDrawerDialog(true)}
          icon="MoreHorizontal"
          color="foreground"
        />
      </StyledIcon>
    </StyledRightSide>
  );
};
