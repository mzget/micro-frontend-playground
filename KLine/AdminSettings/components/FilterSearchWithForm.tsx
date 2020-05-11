import React, { useState, useCallback } from "react";
import { Radio, Typography } from "antd";
import styled from "styled-components";
import { Controller, FormContextValues } from "react-hook-form";

const { Text } = Typography;

type FilterSearchProps = {
    filters: Array<string>;
    hookForm: FormContextValues<any>;
    name: string;
    onSelect?: (key: string) => void;
};
function FilterSearchWithForm({
    filters,
    onSelect,
    name,
    hookForm,
}: FilterSearchProps) {
    const { control } = hookForm;
    const [value, setValue] = useState(0);
    const onChange = useCallback(e => {
        setValue(e.target.value);
        // onSelect(filters[e.target.value]);
    }, []);

    return (
        <Container>
            <Text strong className="Title">
                Campaign Status
            </Text>
            <Controller
                as={
                    <Radio.Group onChange={onChange} value={value}>
                        {filters.map((v, id) => (
                            <Radio key={v} value={v}>
                                {v}
                            </Radio>
                        ))}
                    </Radio.Group>
                }
                name={name}
                control={control}
                rules={{ required: false }}
            />
        </Container>
    );
}

export default FilterSearchWithForm;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
    .Title {
        margin: 0px 8px;
    }
`;
