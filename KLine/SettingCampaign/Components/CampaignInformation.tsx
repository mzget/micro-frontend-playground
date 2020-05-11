import React from "react";
import { Form, Input, Row } from "antd";
import { ErrorMessage, Controller } from "react-hook-form";
// import { useSelector } from "react-redux";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";

import { CampaignInfoProps } from "app/common/types";
import { TextIncludes } from "app/constants/index";
import { Locale } from "app/locale";

const FormItem = Form.Item;
const { TextArea } = Input;
const { KLINE } = Locale;

function CampaignInformation({ hookForm, campaignContext }: CampaignInfoProps) {
    const { errors, control } = hookForm;
    const editable = campaignContext === "create" || campaignContext === "edit";
    return (
        <div>
            <FormItem
                label={<FormItemLabel label={KLINE.LABEL.Campaign_Name} />}
                extra={<ErrorMessage errors={errors} name="name" />}
            >
                <Controller
                    as={<Input disabled={!editable} maxLength={150} />}
                    control={control}
                    rules={{
                        required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                            KLINE.LABEL.CAMPAIGN
                        ),
                    }}
                    name="name"
                />
            </FormItem>
            <Row>
                <FormItem
                    label={KLINE.LABEL.Campaign_Name_TH}
                    extra={<ErrorMessage errors={errors} name="name_th" />}
                >
                    <Controller
                        as={<Input disabled={!editable} maxLength={150} />}
                        control={control}
                        rules={{
                            required: false,
                            validate: (value: string) =>
                                TextIncludes(value, ['"', "|"]),
                        }}
                        name="name_th"
                    />
                </FormItem>
                <FormItem
                    label={KLINE.LABEL.Campaign_Name_EN}
                    extra={<ErrorMessage errors={errors} name="name_en" />}
                >
                    <Controller
                        as={<Input disabled={!editable} maxLength={150} />}
                        control={control}
                        rules={{
                            required: false,
                            validate: value => TextIncludes(value, ['"', "|"]),
                        }}
                        name="name_en"
                    />
                </FormItem>
            </Row>
            <Row>
                <FormItem
                    label={KLINE.LABEL.Campaign_Detail_TH}
                    extra={<ErrorMessage errors={errors} name="detail_th" />}
                >
                    <Controller
                        as={
                            <TextArea
                                disabled={!editable}
                                rows={2}
                                maxLength={400}
                            />
                        }
                        control={control}
                        rules={{
                            required: false,
                        }}
                        name="detail_th"
                    />
                </FormItem>
                <FormItem
                    label={KLINE.LABEL.Campaign_Detail_EN}
                    extra={<ErrorMessage errors={errors} name="detail_en" />}
                >
                    <Controller
                        as={
                            <TextArea
                                disabled={!editable}
                                rows={2}
                                maxLength={400}
                            />
                        }
                        control={control}
                        rules={{
                            required: false,
                        }}
                        name="detail_en"
                    />
                </FormItem>
            </Row>
        </div>
    );
}

export default React.memo(CampaignInformation);
