import React from "react";
import { Typography, Table } from "antd";
const { Text } = Typography;

type LogChangeProps = {
    dataSource: any;
    name: string;
};

export default ({ dataSource, name }: LogChangeProps) => {
    const columns = Object.keys(dataSource).map(v => ({
        title: v,
        dataIndex: v,
        key: v,
    }));
    const data = [{ key: 1, ...dataSource }];
    return (
        <Table
            title={() => <Text strong>{name}</Text>}
            dataSource={data}
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
        />
    );
};
