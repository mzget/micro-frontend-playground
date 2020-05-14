import { ReactNode } from "react";

export type TableColumeProps = {
    title: string;
    dataIndex: string;
    key: string;
    render?: (text, record, index) => ReactNode;
    ellipsis?: boolean;
    width?: number;
};

export type DataTableProps = {
    dataSource: Array<any>;
    total: number;
    onPageChange: (page, pageSize) => void;
    current: number;
};
