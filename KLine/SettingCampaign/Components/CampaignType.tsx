import React, { useCallback, useEffect } from "react";
import { Form, Radio } from "antd";
import styled from "styled-components";
import { ErrorMessage } from "react-hook-form";
import { CampaignInfoProps } from "app/common/types";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { Locale } from "app/locale";
const FormItem = Form.Item;
const { KLINE } = Locale;

function CampaignType({ hookForm, campaignContext }: CampaignInfoProps) {
    const { errors, setValue, register, watch } = hookForm;
    const campaign_type = watch("campaign_type");
    const editable = campaignContext === "create";
    const onChangeHandler = useCallback(
        event => {
            setValue("campaign_type", event.target.value);
        },
        [setValue]
    );
    useEffect(() => {
        register(
            { name: "campaign_type" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CAMPAIGN_TYPE
                ),
            }
        );
    }, [register]);

    return (
        <StyledContainer>
            <FormItem
                label={<FormItemLabel label={KLINE.LABEL.CAMPAIGN_TYPE} />}
                extra={<ErrorMessage errors={errors} name="campaign_type" />}
                className="item"
            >
                <Radio.Group
                    name="campaign_type"
                    onChange={onChangeHandler}
                    value={campaign_type}
                    disabled={!editable}
                >
                    <Radio value={"Main"}>Main</Radio>
                    <Radio value={"Add-on"}>Add-on</Radio>
                </Radio.Group>
            </FormItem>
        </StyledContainer>
    );
}

export default React.memo(CampaignType);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;

    .item {
        display: flex;
        flex-direction: row;
    }
`;
