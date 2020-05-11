import React from "react";
import Loadable from "react-loadable";
import { Route } from "react-router-dom";

import LoaderComponent from "app/common/components/Loading";
import PermissionEnhancer from "./Enhancer/PermissionEnhancer";
import { Page404Wrapper } from "app/common/components/routes/exception";
import { KEY_PERMISSION } from "app/constants/menusItems";

const AdminSetting = Loadable({
    loader: () => import("./AdminSettings/Page/AdminSetting"),
    loading: LoaderComponent,
});
const CreateRCPage = Loadable({
    loader: () => import("./AdminSettings/Page/CreateRCPage"),
    loading: LoaderComponent,
});
const CampaignInquiry = Loadable({
    loader: () => import("./CampaignInquiry/Page/CampaignInquiry"),
    loading: LoaderComponent,
});
const CampaignDetail = Loadable({
    loader: () => import("./CampaignDetail/Page/CampaignDetail"),
    loading: LoaderComponent,
});
const TransactionInquiry = Loadable({
    loader: () => import("./TransactionInquiry/Page/TransactionInquiry"),
    loading: LoaderComponent,
});
const LimitInquiry = Loadable({
    loader: () => import("./LimitInquiry/Page/LimitInquiry"),
    loading: LoaderComponent,
});
const SettingCampaign = Loadable({
    loader: () => import("./SettingCampaign/Page/SettingCampaign"),
    loading: LoaderComponent,
});
const AuditLog = Loadable({
    loader: () => import("./AuditLog/Page/AuditLog"),
    loading: LoaderComponent,
});

const KLine = ({ match }) => (
    <div className="routes">
        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_CAMPAIGN_INQUIRY}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/campaign_inquiry`}
                    component={permission ? CampaignInquiry : Page404Wrapper}
                />
            )}
        />

        <Route
            path={`${match.url}/campaign_detail/:id`}
            component={CampaignDetail}
        />

        <PermissionEnhancer
            permissionName={[
                KEY_PERMISSION.RE_KLINE_CREATE_CAMPAIGN,
                KEY_PERMISSION.RE_KLINE_EDIT_CAMPAIGN,
            ]}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/setting_campaign/:id?`}
                    component={permission ? SettingCampaign : Page404Wrapper}
                />
            )}
        />

        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_TRANSACTION_INQUIRY}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/transaction_inquiry`}
                    component={permission ? TransactionInquiry : Page404Wrapper}
                />
            )}
        />

        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_LIMIT_INQUIRY}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/limit_inquiry`}
                    component={permission ? LimitInquiry : Page404Wrapper}
                />
            )}
        />

        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_SETTING_RC}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/admin_setting`}
                    exact
                    component={permission ? AdminSetting : Page404Wrapper}
                />
            )}
        />

        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_CREATE_RC}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/admin_setting/create`}
                    exact
                    component={permission ? CreateRCPage : Page404Wrapper}
                />
            )}
        />

        <PermissionEnhancer
            permissionName={KEY_PERMISSION.RE_KLINE_AUDIT_LOG}
            render={({ permission }) => (
                <Route
                    path={`${match.url}/audit_log`}
                    component={permission ? AuditLog : Page404Wrapper}
                />
            )}
        />
    </div>
);

export default KLine;
