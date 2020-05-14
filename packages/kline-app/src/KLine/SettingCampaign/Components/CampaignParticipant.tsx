import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Form, Checkbox } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import styled from "styled-components";
import { ErrorMessage } from "react-hook-form";

import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { Locale } from "app/locale";
import { CampaignInfoProps } from "app/common/types";
import {
    setUploadedID,
    setCommitID,
} from "../../redux/reducers/KLineCampaignReducer";
import { useDispatch } from "react-redux";
const FormItem = Form.Item;
const { KLINE } = Locale;

function CampaignParticipant({ hookForm, campaignContext }: CampaignInfoProps) {
    const { watch, errors, register, setValue } = hookForm;
    const participants: Array<string> | undefined = watch("participants");
    const is_apply_all_merchants = watch("is_apply_all_merchants");

    const defaultOptions = useMemo(
        () => [
            {
                label: "Exclude MID (Blacklist)",
                value: "Exclude MID (Blacklist)",
                disabled:
                    is_apply_all_merchants ||
                    participants?.some((v: string) => v.match("Whitelist")),
            },
            {
                label: "Exclude MCC (Blacklist)",
                value: "Exclude MCC (Blacklist)",
                disabled:
                    is_apply_all_merchants ||
                    participants?.some((v: string) => v.match("Whitelist")),
            },
            {
                label: "Whitelist MID",
                value: "Whitelist MID",
                disabled:
                    is_apply_all_merchants ||
                    participants?.some((v: string) => v.match("Blacklist")),
            },
            {
                label: "Whitelist MCC",
                value: "Whitelist MCC",
                disabled:
                    is_apply_all_merchants ||
                    participants?.some((v: string) => v.match("Blacklist")),
            },
        ],
        [is_apply_all_merchants, participants]
    );

    const [states, setStates] = useState({
        disableAll: false,
        indeterminate: participants
            ? participants.some(v => (v as string).match("Blacklist"))
            : false,
    });

    const [channelOptions, setOptions] = useState(defaultOptions);

    const dispatch = useDispatch();

    useEffect(() => {
        const reset = document.getElementById("form-reset");
        const callback = () => {
            let options = channelOptions.map(v => {
                v.disabled = false;
                return v;
            });
            setOptions(options);
            setStates({ disableAll: false, indeterminate: false });
        };
        if (reset) {
            reset.addEventListener("reset-form", callback);
        }

        return () => {
            reset?.removeEventListener("reset-form", callback);
        };
    }, [channelOptions, defaultOptions, states]);

    useEffect(() => {
        register(
            { name: "participants" },
            {
                required: true,
                validate: value => {
                    if (
                        is_apply_all_merchants === false &&
                        value.length === 0
                    ) {
                        return KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                            KLINE.LABEL.CAMPAIGN_PARTICIPANT
                        );
                    }
                    return true;
                },
            }
        );
        register({ name: "is_apply_all_merchants" });
    }, [is_apply_all_merchants, register]);

    const checkedHandler = useCallback(
        (checkedList: Array<CheckboxValueType>) => {
            if (checkedList.length === 0) {
                let options = channelOptions.map(v => {
                    v.disabled = false;
                    return v;
                });
                setOptions(options);
                setStates({
                    ...states,
                    disableAll: false,
                    indeterminate: false,
                });
            } else {
                if (
                    checkedList.length > 0 &&
                    checkedList.some(v => (v as string).match("Blacklist"))
                ) {
                    let options = channelOptions.map(v => {
                        if (v.label.includes("Whitelist")) {
                            v.disabled = true;
                        }
                        return v;
                    });
                    setOptions(options);
                    setStates({ ...states, indeterminate: true });
                } else if (
                    checkedList.length > 0 &&
                    checkedList.some(v => (v as string).match("Whitelist"))
                ) {
                    let options = channelOptions.map(v => {
                        if (!v.label.includes("Whitelist")) {
                            v.disabled = true;
                        }
                        return v;
                    });
                    setOptions(options);
                    setStates({ ...states, disableAll: true });
                }
            }

            setValue("participants", checkedList);
            dispatch(setUploadedID({ result: undefined }));
            dispatch(setCommitID({ result: undefined }));
        },
        [channelOptions, dispatch, setValue, states]
    );

    const onCheckAllChange = useCallback(
        e => {
            const { checked } = e.target;
            setStates({ ...states, indeterminate: false });
            setValue("is_apply_all_merchants", checked);
            if (checked) {
                let options = channelOptions.map(v => {
                    v.disabled = true;
                    return v;
                });
                setOptions(options);
                setValue("participants", []);
            } else {
                let options = channelOptions.map(v => {
                    v.disabled = false;
                    return v;
                });
                setOptions(options);
            }
        },
        [channelOptions, setValue, states]
    );

    const editable = campaignContext === "create" || campaignContext === "edit";

    return (
        <StyledContainer>
            <FormItem
                label={
                    <FormItemLabel label={KLINE.LABEL.CAMPAIGN_PARTICIPANT} />
                }
                extra={<ErrorMessage errors={errors} name="participants" />}
            >
                <Checkbox
                    indeterminate={states.indeterminate}
                    onChange={onCheckAllChange}
                    checked={is_apply_all_merchants}
                    disabled={states.disableAll || !editable}
                    name="All"
                    data-cy={"all-checkbox"}
                >
                    All
                </Checkbox>
                <Checkbox.Group
                    disabled={!editable}
                    options={channelOptions}
                    onChange={checkedHandler}
                    value={participants}
                    name="participants-group"
                />
            </FormItem>
        </StyledContainer>
    );
}
export default React.memo(CampaignParticipant);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;

    .item {
        display: flex;
        flex-direction: row;
    }
`;
