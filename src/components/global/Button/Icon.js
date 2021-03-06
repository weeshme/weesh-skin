import React from "react";
import * as Feather from "react-feather";
import C from "Root/constants";
import { AuthContext } from "Root/contexts/auth";

export default props => {
  const { auth, dispatch } = React.useContext(AuthContext);
  const Icon = Feather[props.icon];

  return (
    <Icon
      size={20}
      color={C.theme[auth.theme || "light"].colors[props.color || "background"]}
    />
  );
};
