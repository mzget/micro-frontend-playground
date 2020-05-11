import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppStateType } from "app/common/types";
import { $getCurrency } from "../redux/actions/getCurrency";
import { selectCurrencies } from "app/redux/selectors/CurrencySelector";

function EnhancedCurrency({ currency_code, render }) {
    const currencies = useSelector((state: AppStateType) =>
        selectCurrencies(state, currency_code)
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch($getCurrency());
    }, [dispatch]);

    return render(currencies);
}
export default React.memo(EnhancedCurrency);
