import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import { Currency } from "app/common/types";

import {
    // mockCurrency,
    getCurrency,
    getCurrencyFinish,
} from "../reducers/KLineCurrencyReducer";

function compare(a, b) {
    if (a.description < b.description) {
        return -1;
    }
    if (a.description > b.description) {
        return 1;
    }
    return 0;
}
export function $getCurrency() {
    return async (dispatch: Dispatch) => {
        dispatch(getCurrency());

        try {
            let result = await UniversalFetch({
                method: "GET",
                baseUrl: process.env.REACT_APP_API_PRIVATE2,
                url: Path.UTILITIES.CURRENCY,
            });

            const temps: Array<Currency> = (result.data as Array<any>).map(
                (v, i) => ({
                    key: i.toString(),
                    title: `${v.numberic_code} | ${v.currency}  (${v.alphabetic_code})`,
                    description: v.currency.toLowerCase(),
                    numberic_code: v.numberic_code,
                })
            );

            temps.sort(compare);

            dispatch(
                getCurrencyFinish({
                    success: true,
                    result: temps,
                })
            );
        } catch (ex) {
            dispatch(
                getCurrencyFinish({
                    success: false,
                    result: ex,
                })
            );
        }
    };
}
