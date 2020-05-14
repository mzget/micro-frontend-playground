import { AnyAction } from "redux";

export type ActionType = AnyAction & {
    payload: ActionPayload;
};

export type ActionPayload = {
    success?: boolean;
    result?: any;
    meta?: any;
    message?: any;
};
