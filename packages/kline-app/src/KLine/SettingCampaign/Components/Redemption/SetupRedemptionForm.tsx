import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Form, Radio } from "antd";
import { useFormContext } from "react-hook-form";

import { Locale } from "app/locale";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import InputPaidAmount from "./InputPaidAmount";
import InputCashbackAmount from "./InputCashbackAmount";
import RedemtionOptions from "./RedemptionOptions";
import InputCashbackPercent from "./InputCashbackPercent";
import InputCashbackLimit from "./InputCashbackLimit";

const { KLINE } = Locale;

const SetupRedemptionForm = ({ formData, setFormData }: any) => {
    const { clearError } = useFormContext();
    const [option, setOptions] = useState(formData.cashback_type);
    const onChangeOption = useCallback(
        e => {
            const { value } = e.target;
            setOptions(value);
            setFormData({
                cashback_type: value,
                paid_amount: undefined,
                cashback_baht: undefined,
                cashback_percent: undefined,
                limit_cashback_percent: undefined,
            });

            clearError([
                "paid_amount",
                "cashback_baht",
                "cashback_percent",
                "limit_cashback_percent",
            ]);
        },
        [clearError, setFormData]
    );

    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 12, offset: 2 },
    };

    useEffect(() => {
        setOptions(formData.cashback_type);
    }, [formData.cashback_type]);

    return (
        <StyledRedemptionForm>
            <Form.Item
                label={<FormItemLabel label={KLINE.LABEL.CASHBACK_TYPE} />}
                {...formItemLayout}
            >
                <Radio.Group onChange={onChangeOption} value={option}>
                    <Radio value={RedemtionOptions.FixedAmount}>
                        {RedemtionOptions.FixedAmount}
                    </Radio>
                    <Radio value={RedemtionOptions.Percentage}>
                        {RedemtionOptions.Percentage}
                    </Radio>
                </Radio.Group>
            </Form.Item>
            <InputPaidAmount
                formData={formData}
                setFormData={setFormData}
                layout={formItemLayout}
            />
            {option !== RedemtionOptions.Percentage && (
                <InputCashbackAmount
                    formData={formData}
                    setFormData={setFormData}
                    layout={formItemLayout}
                />
            )}
            {option !== RedemtionOptions.FixedAmount && (
                <React.Fragment>
                    <InputCashbackPercent
                        formData={formData}
                        setFormData={setFormData}
                        option={option}
                        layout={formItemLayout}
                    />
                    <InputCashbackLimit
                        formData={formData}
                        setFormData={setFormData}
                        option={option}
                        layout={formItemLayout}
                    />
                </React.Fragment>
            )}
        </StyledRedemptionForm>
    );
};

export default SetupRedemptionForm;

const StyledRedemptionForm = styled.div`
    .inputnumber {
        width: 100%;
    }
`;
