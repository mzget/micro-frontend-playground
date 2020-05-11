import React from "react";
import styled from "styled-components";
import { Row, Typography } from "antd";
import moment from "moment";
import Loadable from "react-loadable";

import { EXPORT_DATE_FORMAT } from "app/constants";
import { ExportButton } from "app/common/components/Form/ExportButton";
import LoaderComponent from "app/common/components/Loading";
import TemplatePreviewTable from "./TemplatePreviewTable";
import { $templateExport } from "../../redux/actions/templateExport";
import { $MccExport } from "../../redux/actions/MccExport";
import { useSelector } from "react-redux";
import { AppStateType } from "app/common/types";
import { stat } from "fs";

const EnhancedCSV = Loadable({
    loader: () => import("app/common/Enhancer/EnhancedCSV"),
    loading: LoaderComponent,
});
const { Text } = Typography;

type UploadTemplateTableProps = {
    mode: string;
    uploaded_info;
    total_upload: number;
    onPageChange;
};
function UploadTemplateTable({
    mode,
    uploaded_info,
    total_upload,
    onPageChange,
}: UploadTemplateTableProps) {
    const { commit_id } = useSelector(
        (state: AppStateType) => state.klineCampaign
    );

    return (
        <Styled>
            <Row className={`upload-title`}>
                <Text className="text">MODE</Text>
                <Text className="text-max" ellipsis mark>
                    {mode}
                </Text>
                <span className="span">
                    <EnhancedCSV
                        dataSource={uploaded_info}
                        fileName={`Uploaded_Merchant_List_${moment().format(
                            EXPORT_DATE_FORMAT
                        )}`}
                        exportAction={commit_id ? $MccExport : $templateExport}
                        component={ExportButton}
                    />
                </span>
            </Row>
            <Row>
                <TemplatePreviewTable
                    dataSource={uploaded_info}
                    total={total_upload}
                    onPageChange={onPageChange}
                />
            </Row>
        </Styled>
    );
}

export default React.memo(UploadTemplateTable);

const Styled = styled.div`
    .upload-title {
        display: flex;
        flex-direction: row;
        padding: 4px;
        align-items: center;
        .text {
            width: min-content;
            padding: 0px 8px;
        }
        .text-max {
            width: 100%;
            padding: 0px 8px;
        }

        .span {
            display: flex;
            flex-direction: row;
            width: max-content;
            justify-content: flex-end;
        }
    }
    .upload-input-wrap {
        display: flex;
        flex-direction: column;
    }
`;
