import React, { useState, useCallback } from "react";
import { Radio, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

type FilterSearchProps = {
    filters: Array<string>;
    onSelect: (key: string) => void;
};
function FilterSearch({ filters, onSelect }: FilterSearchProps) {
    const [value, setValue] = useState(0);
    const onChange = useCallback(
        e => {
            setValue(e.target.value);
            onSelect(filters[e.target.value]);
        },
        [filters, onSelect]
    );

    return (
        <Container>
            <Text strong className="Title">
                RC Status
            </Text>

            <Radio.Group onChange={onChange} value={value}>
                {filters.map((v, id) => (
                    <Radio key={v} value={id}>
                        {v}
                    </Radio>
                ))}
            </Radio.Group>
        </Container>
    );
}

export default FilterSearch;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px 0px;
    .Title {
        margin: 0px 8px;
    }
`;
