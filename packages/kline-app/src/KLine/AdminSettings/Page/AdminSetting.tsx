import "./AdminSetting.scss";
import React from "react";
import { Typography, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import { Container } from "app/common/styled/content.styled";

import SettingRC from "../components/SettingRC";
import SearchTable from "../components/SearchTable";

import RemoveRCModal from "../components/RemoveRCModal";
import PermissionEnhancer from "../../Enhancer/PermissionEnhancer";
import { Link } from "react-router-dom";
import { InstantRedemtion, KEY_PERMISSION } from "app/constants/menusItems";
import { Locale } from "app/locale";
import styled from "styled-components";

const { Title } = Typography;
const { KLINE } = Locale;

export default function AdminSetting() {
    const adminList = useSelector((state: AppStateType) =>
        state.adminRC.search_rc_list.map((v, id) => ({ key: id + 1, ...v }))
    );

    return (
        <EnhanceContainer className="container-fluid no-breadcrumb chapter">
            <QueueAnim type="bottom" className="ui-animate content">
                <div className="title">
                    <Title level={4}>{KLINE.SETTING_RC.SETTING_RC}</Title>
                    <PermissionEnhancer
                        permissionName={KEY_PERMISSION.RE_KLINE_CREATE_RC}
                        render={({ permission }) =>
                            permission && (
                                <Link
                                    to={`${
                                        InstantRedemtion.KLine.filter(
                                            v =>
                                                v.name ===
                                                KEY_PERMISSION.RE_KLINE_CREATE_RC
                                        )[0].path
                                    }`}
                                >
                                    <Button type="primary">
                                        {KLINE.SETTING_RC.CREATE_RC}
                                    </Button>
                                </Link>
                            )
                        }
                    />
                </div>
                <div>
                    <SettingRC />
                    <div className="box-body">
                        <SearchTable dataSource={adminList} />
                        <RemoveRCModal />
                    </div>
                </div>
            </QueueAnim>
        </EnhanceContainer>
    );
}

const EnhanceContainer = styled(Container)`
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;
