import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Form } from "antd";
import { useForm, Controller } from "react-hook-form";

import FilterSearch from "./FilterSearch";
import { getRCList } from "../../redux/actions/getRCList";
import { RC_TYPE } from "app/common/types";
import { Locale } from "app/locale";
import { clearSearchResult } from "app/redux/reducers/adminRC/adminRCReducer";

const { Search } = Input;
const { KLINE } = Locale;

function SettingRC(props: any) {
    const dispatch = useDispatch();
    const { control, reset } = useForm({
        defaultValues: {
            term: "",
        },
    });
    const [selected, setSelected] = useState<RC_TYPE>("All");

    const onSelect = useCallback(
        key => {
            setSelected(key);
        },
        [setSelected]
    );
    const onSearchHandler = useCallback(
        value => {
            dispatch(
                getRCList({
                    term: value,
                    status: selected,
                })
            );
        },
        [dispatch, selected]
    );
    const handleClearPage = useCallback(() => {
        reset({ term: "" });
        dispatch(clearSearchResult());
    }, [dispatch, reset]);

    useEffect(() => {
        dispatch(
            getRCList({
                term: "",
                status: "All",
            })
        );
    }, [dispatch]);

    return (
        <div className="box box-default">
            <div className="box-body flex-column">
                <form>
                    <FilterSearch
                        onSelect={onSelect}
                        filters={["All", "Available", "Removed"]}
                    />
                    <div className="flex-row">
                        <Form.Item
                            label={KLINE.LABEL.RC}
                            style={{ width: "100%" }}
                        >
                            <Controller
                                as={
                                    <Search
                                        placeholder="Search RC / สังกัด (TH) / สังกัดย่อ (TH) / สังกัด (EN) / สังกัดย่อ(EN )/ ประเภทหน่วยงาน/ รหัสหมายเลขสาขา"
                                        allowClear
                                        enterButton
                                        maxLength={100}
                                        onSearch={onSearchHandler}
                                        className="item-search"
                                    />
                                }
                                control={control}
                                name="term"
                            />
                        </Form.Item>
                        <Button
                            onClick={handleClearPage}
                            type="danger"
                            className="clear-button"
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default React.memo(SettingRC);
