import React, { useEffect, useCallback } from "react";
import { Form, DatePicker, TimePicker } from "antd";
import { ErrorMessage, FormContextValues } from "react-hook-form";
import moment, { Moment } from "moment";

import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { CampaignInfoProps } from "app/common/types";
import { DATE_FORMAT, TIME_FORMAT } from "app/constants";
import { Locale } from "app/locale";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { KLINE } = Locale;

const CampaignPeriod = ({ hookForm, campaignContext }: CampaignInfoProps) => {
    const {
        register,
        errors,
        setValue,
        watch,
        triggerValidation,
    } = hookForm as FormContextValues<any>;
    const start_date = watch("start_date");
    const end_date = watch("end_date");
    const start_time = watch("start_time");
    const end_time = watch("end_time");

    useEffect(() => {
        register(
            { name: "start_date" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CAMPAIGN_START_DATE_LABEL
                ),
            }
        );
        register(
            { name: "end_date" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CAMPAIGN_END_DATE_LABEL
                ),
            }
        );
        register(
            { name: "start_time" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CAMPAING_START_TIME_LABEL
                ),
            }
        );
        register(
            { name: "end_time" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.CAMPAIGN_END_TIME_LABEL
                ),
                validate: value => {
                    const end = moment(value);
                    const start = moment(start_time);
                    return start.isBefore(end)
                        ? true
                        : KLINE.CREATE_CAMPAIGN.END_DATE_ERROR_MESSAGE;
                },
            }
        );
    }, [end_date, register, start_time]);

    const onDateChange = useCallback(
        (date, dateString) => {
            if (date && date.length > 0) {
                setValue("start_date", (date[0] as Moment).startOf("day"));
                setValue("end_date", (date[1] as Moment).endOf("day"));
            } else if (date && date.length === 0) {
                setValue("start_date", undefined);
                setValue("end_date", undefined);
            }
        },
        [setValue]
    );

    const onChangeStartTime = useCallback(
        (time, timeString) => {
            setValue(
                "start_time",
                time ? time : moment("00:00:00", TIME_FORMAT),
                true
            );
            process.nextTick(() => triggerValidation("end_time"));
        },
        [setValue, triggerValidation]
    );

    const onChangeEndTime = useCallback(
        (time, timeString) => {
            setValue(
                "end_time",
                time ? time : moment("23:59:59", TIME_FORMAT),
                true
            );
        },
        [setValue]
    );

    const disabledDate = useCallback(current => {
        // Can not select 6 months before today
        return (
            current &&
            current <
                moment()
                    .subtract(6, "months")
                    .endOf("day")
        );
    }, []);

    const editable = campaignContext === "create" || campaignContext === "edit";

    return (
        <div>
            <FormItem
                label={
                    <FormItemLabel
                        label={`${KLINE.LABEL.CAMPAIGN_START_DATE} - ${KLINE.LABEL.CAMPAIGN_END_DATE}`}
                    />
                }
                extra={<ErrorMessage errors={errors} name="start_date" />}
            >
                <RangePicker
                    name="start_date"
                    onChange={onDateChange}
                    defaultValue={
                        start_date && end_date
                            ? [moment(start_date), moment(end_date)]
                            : undefined
                    }
                    format={DATE_FORMAT}
                    className="form-item"
                    disabled={campaignContext !== "create"}
                    getCalendarContainer={trigger => trigger.parentNode as any}
                    value={
                        start_date && end_date
                            ? [moment(start_date), moment(end_date)]
                            : undefined
                    }
                    disabledDate={disabledDate}
                />
            </FormItem>

            <FormItem
                label={
                    <FormItemLabel
                        label={KLINE.LABEL.CAMPAING_START_TIME_LABEL}
                    />
                }
                extra={<ErrorMessage errors={errors} name="start_time" />}
            >
                <TimePicker
                    className="form-item"
                    onChange={onChangeStartTime}
                    defaultOpenValue={moment("00:00:00", TIME_FORMAT)}
                    defaultValue={moment(start_time, TIME_FORMAT)}
                    value={moment(start_time, TIME_FORMAT)}
                    disabled={!editable}
                    format={TIME_FORMAT}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy={"picker_start_time"}
                />
            </FormItem>
            <FormItem
                label={
                    <FormItemLabel
                        label={KLINE.LABEL.CAMPAIGN_END_TIME_LABEL}
                    />
                }
                extra={<ErrorMessage errors={errors} name="end_time" />}
            >
                <TimePicker
                    className="form-item"
                    onChange={onChangeEndTime}
                    defaultOpenValue={moment("00:00:00", TIME_FORMAT)}
                    defaultValue={moment(end_time, TIME_FORMAT)}
                    value={moment(end_time, TIME_FORMAT)}
                    disabled={!editable}
                    format={TIME_FORMAT}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy={"picker_end_time"}
                />
            </FormItem>
        </div>
    );
};

export default React.memo(CampaignPeriod);
