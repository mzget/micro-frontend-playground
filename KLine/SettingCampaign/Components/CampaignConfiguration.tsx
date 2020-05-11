import React, { useEffect, useCallback } from "react";
import { Form } from "antd";
import { ErrorMessage } from "react-hook-form";
import { CampaignInfoProps } from "app/common/types";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import SelectRC from "app/common/components/Form/SelectRC";
import CampaignType from "../Components/CampaignType";
import CampaignChannel from "../Components/CampaignChannel";
import TransferCurrency from "../Components/TransferCurrency";
import CurrencyTable from "../../CampaignDetail/Components/CurrencyTable";
import { Locale } from "app/locale";
import EnhancedCurrency from "../../Enhancer/useEnhancedCurrency";
const FormItem = Form.Item;
const { KLINE } = Locale;

function CampaignConfiguration({
    hookForm,
    campaignContext,
}: CampaignInfoProps) {
    const { register, errors, setValue, watch } = hookForm;
    const currency_codes = watch("currency_codes");

    const targetChangeHandler = useCallback(
        arr => {
            setValue("currency_codes", arr);
        },
        [setValue]
    );

    useEffect(() => {
        register(
            { name: "currency_codes" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CURRENCY
                ),
                validate: value =>
                    value.length > 0
                        ? true
                        : KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                              KLINE.LABEL.CURRENCY
                          ),
            }
        );
    }, [register]);

    const editable = campaignContext === "create" || campaignContext === "edit";
    return (
        <div className="campaign-configuration">
            <CampaignType
                hookForm={hookForm}
                campaignContext={campaignContext}
            />
            <CampaignChannel hookForm={hookForm} editable={editable} />
            <SelectRC
                hookForm={hookForm}
                name="rc_code"
                requireMessage={KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.RC
                )}
                editable={editable}
                defaultFilter="Available"
            />
            <FormItem
                label={<FormItemLabel label={KLINE.LABEL.CURRENCY} />}
                extra={<ErrorMessage errors={errors} name="currency_codes" />}
                className="item"
            >
                {editable ? (
                    <TransferCurrency
                        onTarget={targetChangeHandler}
                        currency={currency_codes}
                        editable={editable}
                    />
                ) : (
                    <EnhancedCurrency
                        currency_code={currency_codes}
                        render={currencies => (
                            <CurrencyTable data={currencies} />
                        )}
                    />
                )}
            </FormItem>
        </div>
    );
}
export default React.memo(CampaignConfiguration);
