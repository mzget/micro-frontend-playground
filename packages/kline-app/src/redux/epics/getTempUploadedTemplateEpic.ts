import { from, of } from "rxjs";
import { filter, mergeMap, map, catchError } from "rxjs/operators";
import { AnyAction } from "redux";
import { UniversalFetch } from "utils/API";

import { Path } from "constants/services";
import {
  SET_UPLOADED_ID,
  getUploadedData,
  getTempUploadedDataFinish,
} from "KLine/redux/reducers/KLineCampaignReducer";

export const getTempUploadedTemplateEpic = (action$) =>
  action$.pipe(
    filter((action: AnyAction) => action.type === SET_UPLOADED_ID),
    map((action: AnyAction) => {
      const { result, meta } = action.payload;
      return getUploadedData({ result: result, meta: meta });
    }),
    mergeMap((action: AnyAction) => {
      const { result, meta } = action.payload;
      if (result) {
        const { page, pageSize } = meta ?? {
          page: 1,
          pageSize: 15,
        };
        let skipIndex = (page - 1) * pageSize;
        let resp = UniversalFetch({
          method: "POST",
          url: Path.KLINE_PROMOTION.GET_UPLOADED_TEMPLATE_DATA,
          data: {
            commit_id: result,
            index: skipIndex,
            size: pageSize,
          },
        });
        const observer = from(resp);
        return observer.pipe(
          map((result) => {
            const { data, total } = result;
            const items = data.map((v, id) => ({
              ...v,
              key: skipIndex + id + 1,
            }));
            return getTempUploadedDataFinish({
              success: true,
              result: items,
              meta: { total },
            });
          }),
          catchError((ex) =>
            of(
              getTempUploadedDataFinish({
                success: false,
                result: ex,
              })
            )
          )
        );
      } else {
        return of(
          getTempUploadedDataFinish({
            success: false,
            result: undefined,
          })
        );
      }
    })
  );
