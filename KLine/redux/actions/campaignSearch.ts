import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    getCampaign,
    getCampaignFinish,
} from "../reducers/KLineCampaignReducer";
import { KLineCampaignStatus } from "app/common/types";

export type CampaignSearch = {
    status: KLineCampaignStatus;
    campaign: string;
    promo_code: string;
    campaign_type: string;
    channels: string;
    rc_code: string;
    start_date: string;
    end_date: string;
    index: number;
    size: number;
};
export function campaignSearch(
    params: CampaignSearch,
    index: number,
    pageSize: number
) {
    return async (dispatch: Dispatch) => {
        const search = { ...params, size: pageSize, index: index };
        dispatch(getCampaign(search));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.LIST_PROMOTION,
                data: search,
            });

            const data = result.data.map((v, id) => ({
                ...v,
                key: id + 1 + index,
            }));
            dispatch(
                getCampaignFinish({
                    success: true,
                    result: data || [],
                    meta: {
                        total: result.total,
                        searchParams: params,
                        index,
                        pageSize,
                    },
                })
            );
        } catch (ex) {
            dispatch(
                getCampaignFinish({
                    success: false,
                    result: ex,
                })
            );
        }
    };
}
