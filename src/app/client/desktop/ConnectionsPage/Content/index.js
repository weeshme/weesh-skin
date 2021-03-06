import React from "react";
import styled from "styled-components";
import uuid from "uuid";
import List from "Root/components/desktop/List";
import Loading from "Root/components/global/Loading";
import C from "Root/constants";
import { useQuery } from "@apollo/react-hooks";
import useHistory from "Root/hooks/useHistory";
import api from "Root/api";
import Meta from "Root/meta";
import helpers from "Root/helpers";

const StyledContainer = styled.div`
  padding: 0.25rem 0;
  min-height: ${window.innerHeight - 55}px;
`;

const switchStatus = status => {
  switch (status) {
    case "followers":
      return {
        index: "follower",
        api: "getFollowers",
        data: "getFollowersUserConnectionByUsernameForUser",
      };
    case "following":
      return {
        index: "following",
        api: "getFollowing",
        data: "getFollowingUserConnectionByUsernameForUser",
      };
  }
};

export default props => {
  let url = props.match.url.split("/");
  const [state, setState] = React.useState(null);
  const history = useHistory();
  const [status, setStatus] = React.useState(url[url.length - 1]);
  const { data, called, error, loading } = useQuery(
    api.connections[switchStatus(status).api],
    {
      variables: {
        username: `${props.match.params.username}`,
      },
      fetchPolicy: "no-cache",
    },
  );

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (called && data) {
      const result = data[switchStatus(status).data].userConnections;
      setState(result);
    }
  }, [data, error]);

  const tabs = [
    {
      id: uuid(),
      title: C.txts.en.connections.following,
      value: true,
      status: "following",
    },
    {
      id: uuid(),
      title: C.txts.en.connections.followers,
      value: false,
      status: "followers",
    },
  ];

  return (
    <StyledContainer>
      <Meta />
      {loading ? (
        <Loading padding="3rem 0 0" size={28} strokeWidth={1.25} color="gray" />
      ) : (
        state && <List index={switchStatus(status).index} users={state} />
      )}
    </StyledContainer>
  );
};
