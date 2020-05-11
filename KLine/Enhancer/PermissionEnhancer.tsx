import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import { isArray } from "util";

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
    const { auth } = useSelector((state: AppStateType) => state.auth);

    let permission = false;
    if (isArray(permissionName)) {
        permission = permissionName.some(v => auth.includes(v));
    } else {
        permission = auth.includes(permissionName);
    }

    return render({ permission });
}

export default React.memo(PermissionEnhancer);
