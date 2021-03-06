import React from "react";
import Header from "./Header";
import UserNotFound from "Root/components/global/NotFound/User";
import Loading from "Root/components/global/Loading";
import Main from "Root/app/client/global/EditProfile/Main";
import C from "Root/constants";
import BannerMessage from "Root/components/global/BannerMessage";
import Input from "Root/components/global/Input";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "Root/contexts/auth";
import useHistory from "Root/hooks/useHistory";
import api from "Root/api";
import styled from "styled-components";
import { EditProfileContext } from "Root/contexts/editProfile";
import Buttons from "./Header/Buttons";

const StyledContainer = styled.div`
    /* min-height: ${window.innerHeight - 44}px; */
    position: relative;
`;

const StyledLoadingContainer = styled.div`
  ${C.styles.flex.flexColumn};
  ${C.styles.flex.justifyContentStart};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  min-height: ${window.innerHeight}px;
  max-height: ${window.innerHeight}px;
`;

export default props => {
  const { match } = props;
  const { auth, dispatch } = React.useContext(AuthContext);
  const { editProfile, dispatch: editProfileDispatch } = React.useContext(
    EditProfileContext,
  );
  const history = useHistory();

  !auth.token && history.push("/");

  React.useEffect(() => {
    if (!editProfile && auth.id) {
      editProfileDispatch({
        type: "EDIT_PROFILE",
        data: {
          ...auth,
          doneButton: true,
        },
      });
    }
  }, [editProfile]);

  return (
    <StyledContainer>
      {editProfile && auth.id != undefined && (
        <>
          <Buttons {...props} />
          <Header {...props} />
          <Main {...props} />
        </>
      )}
    </StyledContainer>
  );
};
