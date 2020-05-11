import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Input, Form, Button } from "antd";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

import { searchRCByCode } from "app/features/InstantRedemption/KLine/redux/actions/SearchRCByCode";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";

import { Locale } from "app/locale";
import { clearSearchResult } from "app/redux/reducers/adminRC/adminRCReducer";

const { Search } = Input;
const { KLINE } = Locale;

export default function CreateRC() {
    const dispatch = useDispatch();
    const { errors, control, triggerValidation, reset } = useForm({
        defaultValues: {
            rc_code: "",
        },
    });

    const onSearchHandler = value => {
        if (value) {
            dispatch(searchRCByCode({ rc_code: value }));
        }
        triggerValidation("rc_code");
    };

    const handleClearPage = useCallback(() => {
        reset({ rc_code: "" });
        dispatch(clearSearchResult());
    }, [dispatch, reset]);

    return (
        <div className="box-body flex-column">
            <div className="create-rc-content">
                <form>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Form.Item
                            label={<FormItemLabel label={KLINE.LABEL.RC} />}
                            extra={
                                <ErrorMessage errors={errors} name="rc_code" />
                            }
                        >
                            <Controller
                                as={
                                    <Search
                                        placeholder="รหัสสังกัด (RC)"
                                        onSearch={onSearchHandler}
                                        enterButton
                                        allowClear
                                        maxLength={5}
                                        className="item-search"
                                    />
                                }
                                control={control}
                                rules={{
                                    required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LABEL.RC
                                    ),
                                }}
                                name="rc_code"
                            />
                        </Form.Item>

                        <Button
                            className="clear-button"
                            onClick={handleClearPage}
                            type="danger"
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
