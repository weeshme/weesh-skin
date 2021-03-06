import React from "react";
import styled from "styled-components";
import List from "Root/components/mobile/List";
import Loader from "Root/components/global/Loader";
import C from "Root/constants";
import { useQuery } from "@apollo/react-hooks";
import useHistory from "Root/hooks/useHistory";
import api from "Root/api";
import { AuthContext } from "Root/contexts/auth";
import Meta from "Root/meta";

const StyledContainer = styled.div``;

const StyledLoaderContainer = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentCenter};
  padding: 1rem;
`;

const switchStatus = status => {
  switch (status) {
    case "requests":
      return {
        index: "follower",
        api: "getRequests",
        data: "getRequestsUsersConnectionByIdForUser",
      };
  }
};

export default props => {
  let url = props.match.url.split("/");
  const { auth } = React.useContext(AuthContext);
  const [state, setState] = React.useState(null);
  const history = useHistory();
  const [status, setStatus] = React.useState(url[url.length - 1]);
  const { data, called, error, loading } = useQuery(
    api.connections[switchStatus(status).api],
    {
      fetchPolicy: "no-cache",
    },
  );

  if (auth.id != undefined && auth.username !== props.match.params.username) {
    history.push(`/${auth.username}`);
  }

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (called && data) {
      const result = data[switchStatus(status).data].userConnections;
      setState(result);
    }
  }, [data, error]);

  return (
    <StyledContainer>
      <Meta />
      {loading ? (
        <StyledLoaderContainer>
          <Loader size={20} strokeWidth={1.25} color="gray" />
        </StyledLoaderContainer>
      ) : (
        state && (
          <List
            request={true}
            index={switchStatus(status).index}
            users={state}
          />
        )
      )}
    </StyledContainer>
  );
};
