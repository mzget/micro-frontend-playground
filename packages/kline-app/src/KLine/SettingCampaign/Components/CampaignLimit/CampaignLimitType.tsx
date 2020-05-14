import React, { useEffect, useCallback } from "react";
import { Form, Radio } from "antd";
import styled from "styled-components";
import { ErrorMessage } from "react-hook-form";
import { FormContextProps } from "app/common/types";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { Locale } from "app/locale";
const FormItem = Form.Item;
const { KLINE } = Locale;

export type LIMIT_TYPE = "จำนวนสิทธิ์" | "จำนวนเงิน";
const Items = {
    จำนวนเงิน: "จำนวนเงิน(บาท)",
    จำนวนสิทธิ์: "จำนวนสิทธิ์",
};
function CampaignLimitType({ hookForm, editable }: FormContextProps) {
    const { register, errors, setValue, watch, triggerValidation } = hookForm;
    const limit_type = watch("limit_type");

    useEffect(() => {
        register(
            { name: "limit_type" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.LIMIT_REDEMPTION
                ),
            }
        );
    }, [register]);

    const onChangeHandler = useCallback(
        e => {
            const value = e.target.value;

            setValue("limit_type", value);
            triggerValidation([
                "limit_total",
                "limit_card",
                "limit_merchant",
                "limit_card_per_merchant",
            ]);
        },
        [setValue, triggerValidation]
    );

    return (
        <StyledContainer>
            <FormItem
                label={<FormItemLabel label={KLINE.LABEL.LIMIT_REDEMPTION} />}
                extra={<ErrorMessage errors={errors} name="limit_type" />}
                className="item"
            >
                <Radio.Group
                    name="limit_type"
                    onChange={onChangeHandler}
                    value={limit_type}
                    disabled={!editable}
                >
                    {Object.entries(Items).map(([k, v]) => (
                        <Radio key={k} value={k}>
                            {v}
                        </Radio>
                    ))}
                </Radio.Group>
            </FormItem>
        </StyledContainer>
    );
}

export default React.memo(CampaignLimitType);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;

    .item {
        display: flex;
        flex-direction: row;
    }
`;
