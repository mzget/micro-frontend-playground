import React, { useEffect } from "react";
import styled from "styled-components";
import { FormContextValues, ErrorMessage } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import { Form } from "antd";

import CampaignLimitType from "./CampaignLimitType";
import LimitTotal from "./LimitTotal";
import {
    EnhancedLimitPerCard,
    EnhancedLimitPerShop,
    EnhancedLimitCardPerShop,
} from "./LimitCardContext";
import { Locale } from "app/locale";

const { KLINE } = Locale;
const FormItem = Form.Item;

const CampaignLimit = ({ hookForm, campaignContext }) => {
    const editable = campaignContext === "create";
    const { register, errors, watch } = hookForm as FormContextValues<any>;

    const campaign_conditions = watch("campaign_conditions");

    useEffect(() => {
        register("campaign_conditions", {
            required: KLINE.CREATE_CAMPAIGN.LIMIT_ERROR_MESSAGE,
            validate: value => {
                if (
                    isEmpty(value) ||
                    (isEmpty(value.total_periods) &&
                        isEmpty(value.customer_periods) &&
                        isEmpty(value.merchant_periods) &&
                        isEmpty(value.customer_merchant_periods))
                ) {
                    return KLINE.CREATE_CAMPAIGN.LIMIT_ERROR_MESSAGE;
                } else {
                    return true;
                }
            },
        });
    }, [register]);

    return (
        <StyledContainer>
            <div className="campaign-setting">
                <CampaignLimitType hookForm={hookForm} editable={editable} />
                <LimitTotal hookForm={hookForm} editable={editable} />
                <EnhancedLimitPerCard
                    hookForm={hookForm}
                    editable={editable}
                    campaignConditions={campaign_conditions}
                />
                <EnhancedLimitPerShop
                    hookForm={hookForm}
                    editable={editable}
                    campaignConditions={campaign_conditions}
                />
                <EnhancedLimitCardPerShop
                    hookForm={hookForm}
                    editable={editable}
                    campaignConditions={campaign_conditions}
                />
                <FormItem
                    className="form-item only-extra"
                    label={" "}
                    colon={false}
                    extra={
                        <ErrorMessage
                            errors={errors}
                            name="campaign_conditions"
                        />
                    }
                ></FormItem>
            </div>
        </StyledContainer>
    );
};

export default React.memo(CampaignLimit);

const StyledContainer = styled.div.attrs({ className: "CampaignLimit" })`
    .input-full-width {
        width: 100%;
    }

    .campaign-setting {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }
`;
