import { Dispatch } from "redux";
import { Path } from "constants/services";
import { UniversalFetch } from "utils/API";

import {
  getCampaignInfo,
  getCampaignInfoFinish,
} from "../reducers/KLineCampaignReducer";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const $getCampaignInfo = ({ campaign_id }) => {
  return async (dispatch: Dispatch) => {
    dispatch(getCampaignInfo());

    try {
      let result = await UniversalFetch({
        method: "POST",
        url: Path.KLINE_PROMOTION.GET_PROMOTION_INFO,
        data: { campaign_id },
      });

      const info = result.data;
      const { channels }: { channels: Array<string> } = info;
      const capitalChannels = channels.map((v) => capitalizeFirstLetter(v));
      const mapData = {
        ...info,
        campaign_type: capitalizeFirstLetter(info.campaign_type),
        channels: capitalChannels,
      };
      dispatch(
        getCampaignInfoFinish({
          success: true,
          result: mapData,
        })
      );
    } catch (ex) {
      dispatch(
        getCampaignInfoFinish({
          success: false,
          result: ex,
        })
      );
    }
  };
};
