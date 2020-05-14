import React, { useState, useCallback, useEffect } from "react";
import { useFormContext, ErrorMessage } from "react-hook-form";
import { Form, Modal, Button } from "antd";
import uniqBy from "lodash/uniqBy";
import validate from "validate.js";

import { CampaignContextType } from "app/common/types";
import { Locale } from "app/locale";
import SetupRedemptionForm from "./SetupRedemptionForm";
import FormRedemptionTable from "./FormRedemptionTable";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import RedemtionOptions from "./RedemptionOptions";
import { sortingRedemption } from "app/utils/actions/sortingRedemption";
import isEmpty from "lodash/isEmpty";

import { constraints as PaidAmountContraints } from "./InputPaidAmount";
import { constraints as CashbackAmountContraints } from "./InputCashbackAmount";
import { constraints as CashbackPercentContraints } from "./InputCashbackPercent";

const { KLINE } = Locale;
const FormItem = Form.Item;

const initState = {
    cashback_type: RedemtionOptions.FixedAmount,
    paid_amount: undefined,
    cashback_baht: undefined,
    cashback_percent: undefined,
    limit_cashback_percent: undefined,
    key: "",
};

function CampaignRedemption({
    campaignContext,
}: {
    campaignContext: CampaignContextType;
}) {
    const {
        register,
        setValue,
        clearError,
        errors,
        watch,
        setError,
    } = useFormContext();
    const redemptions = watch("redemptions");
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState(initState);

    const handleOk = useCallback(() => {
        const cashback_baht_constraints = CashbackAmountContraints(formData);
        const cashback_percent_constraints = CashbackPercentContraints(
            formData
        );
        const constraints = {
            ...PaidAmountContraints,
            ...cashback_baht_constraints,
            ...cashback_percent_constraints,
        };
        const _errors = validate(formData, constraints, {
            fullMessages: false,
        });
        if (_errors) {
            Object.entries(_errors as { [key: string]: any }).forEach(
                ([k, v]) => {
                    if (k === "paid_amount") {
                        setError(k, "required", v);
                    }
                    if (k === "cashback_baht") {
                        setError(k, "required", v);
                    }
                    if (k === "cashback_percent") {
                        setError(k, "required", v);
                    }
                }
            );
        } else {
            clearError("paid_amount");
            clearError("cashback_baht");
            clearError("cashback_percent");
        }

        if (
            !isEmpty(errors.cashback_baht) ||
            !isEmpty(errors.paid_amount) ||
            !isEmpty(errors.cashback_percent) ||
            !isEmpty(errors.limit_cashback_percent)
        ) {
            return;
        }

        const temps: Array<any> = redemptions || [];
        const redemptionsWithKey = temps
            .concat(formData)
            .slice()
            .sort(sortingRedemption)
            .map((v, id) => ({
                ...v,
                key: String(id),
                paid_amount: v.paid_amount
                    ? Number(v.paid_amount)
                    : v.paid_amount,
                cashback_baht: v.cashback_baht
                    ? Number(v.cashback_baht)
                    : v.cashback_baht,
                cashback_percent: v.cashback_percent
                    ? Number(v.cashback_percent)
                    : v.cashback_percent,
                limit_cashback_percent: v.limit_cashback_percent
                    ? Number(v.limit_cashback_percent)
                    : v.limit_cashback_percent,
            }));

        // Check dublicate paid_amount
        let uniq = uniqBy(redemptionsWithKey, "paid_amount");
        if (uniq.length !== redemptionsWithKey.length) {
            setError(
                "paid_amount",
                "required",
                KLINE.CREATE_CAMPAIGN.REDEMPTION_FORM.ERR_DUPLICATE_PAID_AMOUNT
            );
        } else {
            setValue(`redemptions`, redemptionsWithKey, true);
            setVisible(false);
        }
    }, [
        clearError,
        errors.cashback_baht,
        errors.cashback_percent,
        errors.limit_cashback_percent,
        errors.paid_amount,
        formData,
        redemptions,
        setError,
        setValue,
    ]);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback(() => {
        setFormData({
            ...initState,
        });
        clearError([
            "paid_amount",
            "cashback_baht",
            "cashback_percent",
            "limit_cashback_percent",
        ]);
        setVisible(true);
    }, [clearError]);

    useEffect(() => {
        register(
            { name: "redemptions" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LABEL.REDEMPTION
                ),
                validate: (value: string[]) =>
                    value.length === 0
                        ? KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                              KLINE.LABEL.REDEMPTION
                          )
                        : true,
            }
        );
    }, [register]);

    const editable = campaignContext === "create" || campaignContext === "edit";

    return (
        <div style={{ marginBottom: 16 }}>
            <FormItem
                label={<FormItemLabel label={KLINE.LABEL.REDEMPTION} />}
                extra={<ErrorMessage errors={errors} name="redemptions" />}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Button type="primary" disabled={!editable} onClick={showModal}>
                    {KLINE.CREATE_CAMPAIGN.NEW_REDEMPTION}
                </Button>
            </FormItem>
            <FormRedemptionTable editable={editable} />
            <Modal
                visible={visible}
                title="Add New Redemption"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Add
                    </Button>,
                ]}
            >
                <SetupRedemptionForm
                    formData={formData}
                    setFormData={setFormData}
                />
            </Modal>
        </div>
    );
}

export default React.memo(CampaignRedemption);
