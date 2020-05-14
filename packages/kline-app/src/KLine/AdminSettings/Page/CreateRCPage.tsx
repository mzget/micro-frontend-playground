import "./AdminSetting.scss";
import React from "react";
import { Typography } from "antd";
import QueueAnim from "rc-queue-anim";
import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import { Container } from "app/common/styled/content.styled";

import CreateRC from "../components/CreateRC";
import SearchTableByCode from "../components/SearchTableByCode";

import AddNewRCModal from "../components/AddNewRCModal";
import { Locale } from "app/locale";
import styled from "styled-components";

const { Title } = Typography;
const { KLINE } = Locale;

function CreateRCPage() {
    const RCByCodeList = useSelector((state: AppStateType) =>
        state.adminRC.search_legacy_rc.map((v, id) => ({ key: id + 1, ...v }))
    );

    return (
        <EnhanceContainer className="container-fluid no-breadcrumb chapter">
            <QueueAnim type="bottom" className="ui-animate content">
                <div className="title">
                    <Title level={4}>{KLINE.SETTING_RC.CREATE_RC}</Title>
                </div>
                <div>
                    <div className="box box-default">
                        <CreateRC />
                    </div>
                    <div className="box box-default">
                        <div className="box-body">
                            <SearchTableByCode dataSource={RCByCodeList} />
                            <AddNewRCModal />
                        </div>
                    </div>
                </div>
            </QueueAnim>
        </EnhanceContainer>
    );
}

export default React.memo(CreateRCPage);

const EnhanceContainer = styled(Container)``;
