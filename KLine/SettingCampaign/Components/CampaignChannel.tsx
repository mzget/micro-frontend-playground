import React, { useMemo } from "react";
import { Form, Checkbox } from "antd";
import styled from "styled-components";
import { ErrorMessage, Controller } from "react-hook-form";

import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { Locale } from "app/locale";
import { FormContextProps } from "app/common/types";
const FormItem = Form.Item;
const { KLINE } = Locale;

function CampaignChannel({ hookForm, editable }: FormContextProps) {
    const { control, errors } = hookForm;
    const ChannelOptions = useMemo(() => ["Online", "Offline"], []);

    return (
        <StyledFormItem
            label={<FormItemLabel label={KLINE.LABEL.CAMPAIGN_CHANNEL} />}
            extra={<ErrorMessage errors={errors} name="channels" />}
            className="item"
        >
            <Controller
                as={
                    <Checkbox.Group
                        options={ChannelOptions}
                        disabled={!editable}
                    />
                }
                control={control}
                rules={{
                    required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                        KLINE.LABEL.CAMPAIGN_CHANNEL
                    ),
                    validate: (value: Array<string>) =>
                        value.length === 0
                            ? KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                  KLINE.LABEL.CAMPAIGN_CHANNEL
                              )
                            : true,
                }}
                name="channels"
            />
        </StyledFormItem>
    );
}

export default React.memo(CampaignChannel);

const StyledFormItem = styled(FormItem)`
    display: flex;
    flex-direction: row;

    .item {
        display: flex;
        flex-direction: row;
    }
`;
