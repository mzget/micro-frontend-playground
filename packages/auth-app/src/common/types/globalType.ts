import { RouteComponentProps } from "react-router";
import { FormContextValues } from "react-hook-form";

export type RouteProps = {
    children?: any;
} & RouteComponentProps;

export type LoginType = {
    username: string;
    password: string;
};

export type FormContextProps = {
    hookForm: FormContextValues<any>;
    editable: boolean;
};

export type CampaignContextType = "create" | "view" | "edit";
export type CampaignInfoProps = {
    hookForm: FormContextValues<any>;
    campaignContext: CampaignContextType;
};
