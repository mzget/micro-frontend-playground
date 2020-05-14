import "./LimitInquiry.scss";
import React from "react";
import { Tabs, Typography } from "antd";
import QueueAnim from "rc-queue-anim";
import { Locale } from "app/locale";
import { Container } from "app/common/styled/content.styled";

import CampaignTabTable from "../Components/CampaignTabTable";
import LimitTabCardTable from "../Components/LimitTabCardTable";
import LimitTabCardPerMercTable from "../Components/LimitTabCardPerMercTable";
import MerchantTabTable from "../Components/MerchantTabTable";
import CampaignTabSearchForm from "../Components/CampaignTabSearchForm";
import CardTabSearchForm from "../Components/CardTabSearchForm";
import MerchantTabSearchForm from "../Components/MerchantTabSearchForm";

import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import NoDataDisplayComponent from "app/common/components/NoDataDisplayComponent/NoDataDisplayComponent";

const { Title } = Typography;
const TabPane = Tabs.TabPane;

export default function LimitInquiry() {
    const limitLoading = useSelector(
        (state: AppStateType) => state.klineLimit.loading
    );
    const campaignLimit = useSelector(
        (state: AppStateType) => state.klineLimit.campaignLimitLog
    );
    const cardCampaignLimit = useSelector(
        (state: AppStateType) => state.klineLimit.cardCampaignLimitLog
    );
    const cardLimit = useSelector(
        (state: AppStateType) => state.klineLimit.cardLimitLog
    );
    const cardPerMerchantLimit = useSelector(
        (state: AppStateType) => state.klineLimit.cardPerMerchantLimitLog
    );
    const merchantLimit = useSelector(
        (state: AppStateType) => state.klineLimit.merchantLimitLog
    );

    return (
        <Container className="container-fluid no-breadcrumb chapter">
            <QueueAnim type="bottom" className="ui-animate content">
                <Title level={4}>{Locale.KLINE.LIMIT_INQ.TITLE}</Title>
                <div>
                    <Tabs type="card">
                        <TabPane
                            tab={Locale.KLINE.LIMIT_INQ.TABS_CAMPAIGN}
                            key="1"
                        >
                            <div className="box box-default">
                                <CampaignTabSearchForm
                                    isLoading={limitLoading}
                                />
                            </div>
                            <div className="box box-default">
                                <div className="box-body">
                                    <NoDataDisplayComponent
                                        isShown={campaignLimit.length}
                                    >
                                        <CampaignTabTable
                                            dataSource={campaignLimit}
                                        />
                                    </NoDataDisplayComponent>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={Locale.KLINE.LIMIT_INQ.TABS_CARD} key="2">
                            <div className="box box-default">
                                <CardTabSearchForm isLoading={limitLoading} />
                            </div>
                            <div className="box box-default">
                                <div className="box-body">
                                    <NoDataDisplayComponent
                                        isShown={
                                            cardCampaignLimit.length ||
                                            cardLimit.length ||
                                            cardPerMerchantLimit.length
                                        }
                                    >
                                        <CampaignTabTable
                                            dataSource={cardCampaignLimit}
                                        />
                                        <LimitTabCardTable
                                            dataSource={cardLimit}
                                        />
                                        {cardPerMerchantLimit.length !== 0 && (
                                            <LimitTabCardPerMercTable
                                                dataSource={
                                                    cardPerMerchantLimit
                                                }
                                            />
                                        )}
                                    </NoDataDisplayComponent>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane
                            tab={Locale.KLINE.LIMIT_INQ.TABS_MERCHANT}
                            key="3"
                        >
                            <div className="box box-default">
                                <MerchantTabSearchForm
                                    isLoading={limitLoading}
                                />
                            </div>
                            <div className="box box-default">
                                <div className="box-body">
                                    <NoDataDisplayComponent
                                        isShown={merchantLimit.length}
                                    >
                                        <MerchantTabTable
                                            dataSource={merchantLimit}
                                        />
                                    </NoDataDisplayComponent>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </QueueAnim>
        </Container>
    );
}
