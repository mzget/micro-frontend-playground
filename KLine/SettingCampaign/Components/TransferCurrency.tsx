import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transfer } from "antd";

import { AppStateType } from "app/common/types";
import { $getCurrency } from "../../redux/actions/getCurrency";
import { selectCurrencyID } from "app/redux/selectors/CurrencySelector";

const TransferCurrency = ({ onTarget, currency, editable = true }) => {
    const data = useSelector(
        (state: AppStateType) => state.klineCurrency.currency
    );

    const currenciesID = useSelector((state: AppStateType) =>
        selectCurrencyID(state, currency)
    );
    const dispatch = useDispatch();
    const [targetKeys, setTargetKeys] = useState(currenciesID);

    useEffect(() => {
        dispatch($getCurrency());
    }, [dispatch]);

    useEffect(() => {
        setTargetKeys(currenciesID);
    }, [currenciesID]);

    const filterOption = useCallback((inputValue: string, option) => {
        return option.description.indexOf(inputValue.toLowerCase()) > -1;
    }, []);

    const handleChange = useCallback(
        (targetKeys: string[]) => {
            setTargetKeys(targetKeys);

            let results: string[] = [];
            targetKeys.forEach(v => {
                const arr = data
                    .filter(i => i.key === v)
                    .map(v => v.numberic_code);
                results = results.concat(arr);
            });
            onTarget(results);
        },
        [data, onTarget]
    );

    return (
        <Transfer
            className="transfer"
            dataSource={data}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            onChange={handleChange}
            // onSearch={handleSearch}
            render={item => item.title || ""}
            disabled={!editable}
        />
    );
};

export default React.memo(TransferCurrency);
