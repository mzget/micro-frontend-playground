import React from "react";
import moment from "moment";
import { Typography } from "antd";

import { Locale } from "app/locale";
import { CampaignInfo } from "app/common/types";
import { DATE_FORMAT } from "app/constants";
import isEmpty from "lodash/isEmpty";

const { Text } = Typography;
const { KLINE } = Locale;

function SummaryBox({ selectedCampaign }: { selectedCampaign: CampaignInfo }) {
    const { period_for_show } = selectedCampaign;
    const usedUnit =
        selectedCampaign.limit_type === "จำนวนเงิน"
            ? selectedCampaign.used_baht
            : selectedCampaign.used_time;

    const level_1 =
        selectedCampaign.campaign_conditions?.total_periods?.level_1;
    const remainUnit = selectedCampaign.campaign_conditions?.total_periods
        ? (level_1?.total as number) - (usedUnit || 0)
        : "-";

    let period = "-";
    if (
        selectedCampaign.campaign_conditions?.total_periods?.level_1?.type?.toLowerCase() ===
        "daily"
    ) {
        period = !isEmpty(period_for_show)
            ? moment(period_for_show?.start_date).format(DATE_FORMAT)
            : "-";
    } else {
        period = !isEmpty(period_for_show)
            ? `${moment(period_for_show?.start_date).format(
                  DATE_FORMAT
              )} - ${moment(period_for_show?.end_date).format(DATE_FORMAT)}`
            : "-";
    }

    return (
        <div className="summary-box">
            <div>
                <Text
                    strong
                >{`${KLINE.LABEL.CAMPAIGN_CODE} : ${selectedCampaign.promo_code}`}</Text>
                <Text
                    strong
                >{`${KLINE.LABEL.CAMPAIGN_STATUS} : ${selectedCampaign.status}`}</Text>
                <Text
                    strong
                >{`${KLINE.LABEL.CREATOR} : ${selectedCampaign.creator}`}</Text>
                <Text strong>{`${KLINE.LABEL.LAST_EDIT_DATETIME} : ${moment(
                    selectedCampaign.updated_at
                ).format()}`}</Text>
            </div>
            <div>
                <Text strong>{`${KLINE.LABEL.LIMIT_TOTAL} : ${selectedCampaign
                    .campaign_conditions?.total_periods?.level_1?.type ||
                    "-"}`}</Text>
                <Text
                    strong
                >{`${KLINE.LABEL.CAMPAIGN_PERIOD} : ${period}`}</Text>
                <Text strong>{`${KLINE.LABEL.TOTAL} : ${selectedCampaign
                    .campaign_conditions?.total_periods?.level_1?.total ||
                    "-"}`}</Text>
                <Text strong>{`${KLINE.LABEL.USED} : ${usedUnit}`}</Text>
                <Text strong>{`${KLINE.LABEL.REMAIN} : ${remainUnit}`}</Text>
            </div>
            <div>
                <Text
                    strong
                >{`${KLINE.LABEL.MONEY_USED} : ${selectedCampaign.used_amount}`}</Text>
            </div>
        </div>
    );
}

export default React.memo(SummaryBox);
