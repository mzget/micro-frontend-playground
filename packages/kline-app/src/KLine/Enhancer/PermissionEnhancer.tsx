import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import { isArray } from "util";
import UseAuthState from "../../common/Enhancer/UseAuthState";

type PermissionItem = {
  permission: boolean;
};
type PermissionEnhancerProps = {
  permissionName: string | string[];
  render: ({ permission }: PermissionItem) => any;
};

function PermissionEnhancer({
  render,
  permissionName,
}: PermissionEnhancerProps) {
  const { auth } = UseAuthState();

  let permission = false;
  if (isArray(permissionName)) {
    permission = permissionName.some((v) => auth.auth.includes(v));
  } else {
    permission = auth.auth.includes(permissionName);
  }

  return render({ permission });
}

export default React.memo(PermissionEnhancer);
