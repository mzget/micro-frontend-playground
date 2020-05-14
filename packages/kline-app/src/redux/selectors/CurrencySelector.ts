import { createSelector } from "reselect";
import flattenDeep from "lodash/flattenDeep";

import { AppStateType } from "common/types";

export const selectCurrencyID = createSelector(
  (state: AppStateType) => state.klineCurrency.currency,
  (_, titles: Array<string>) => titles,
  (currency, titles) => {
    if (currency && titles) {
      const temps = titles.map((v) =>
        currency
          .filter((curr) => curr.numberic_code === v)
          .map(({ key }) => key)
      );
      return flattenDeep(temps);
    } else {
      return [];
    }
  }
);

export const selectCurrencies = createSelector(
  (state: AppStateType) => state.klineCurrency.currency,
  (_, codes: Array<string>) => codes,
  (currency, codes) => {
    if (currency && codes) {
      const temps = codes.map(
        (v) => currency.filter((curr) => curr.numberic_code === v)
        // .map(({ title }) => title)
      );
      return flattenDeep(temps);
    } else {
      return [];
    }
  }
);
