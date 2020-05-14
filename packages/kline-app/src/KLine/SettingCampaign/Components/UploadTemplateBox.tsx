import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Upload, Button, Icon, message, Card, Divider } from "antd";

import { UploadProps } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { errorModal } from "app/common/components/feedback/Modal";
import {
    setUploadedID,
    getTempUploadedDataFinish,
} from "../../redux/reducers/KLineCampaignReducer";
import { Path } from "app/constants/services";
import { CampaignInfoProps } from "app/common/types";
import { templateUpload } from "../../redux/actions/templateUpload";

function UploadTemplateBox({ hookForm, campaignContext }: CampaignInfoProps) {
    const { watch } = hookForm;
    const participants: Array<string> = watch("participants");

    const dispatch = useDispatch();
    const editable = campaignContext === "create" || campaignContext === "edit";
    const [states, setState] = useState({
        fileList: [] as any[],
        uploading: false,
    });

    const callback = useCallback(
        ({ err, res }) => {
            if (err) {
                setState({ ...states, uploading: false });

                message.error(`File upload failed.`);
                dispatch(setUploadedID({ result: undefined }));

                if (err.data) {
                    const temp = [...err.data];
                    const mapData = temp.map((v, id) => ({
                        ...v,
                        key: id + 1,
                    }));
                    dispatch(
                        getTempUploadedDataFinish({
                            success: true,
                            result: mapData,
                            meta: { total: mapData.length },
                        })
                    );
                }
            } else {
                setState({
                    fileList: [],
                    uploading: false,
                });

                const { message_code, message_description, data } = res;

                if (data) {
                    message.success(`File uploaded successfully`);
                    dispatch(setUploadedID({ result: data }));
                } else {
                    errorModal({
                        title: message_code,
                        content: message_description,
                        onOk: () => {},
                    });
                }
            }
        },
        [dispatch, states]
    );

    const onFileUploadChange = React.useCallback(
        file => {
            setState({
                fileList: [...states.fileList, file],
                uploading: true,
            });

            const formData = new FormData();
            formData.append("participants", JSON.stringify(participants));
            formData.append(
                "is_apply_all_merchants",
                String(
                    participants.some(v => v.match("Blacklist")) ? true : false
                )
            );
            formData.append("file", file);

            dispatch(templateUpload(formData, callback));
        },
        [callback, dispatch, participants, states.fileList]
    );

    const props: UploadProps = {
        onRemove: file => {
            const index = states.fileList.indexOf(file);
            const newFileList = states.fileList.slice();
            newFileList.splice(index, 1);
            setState({ ...states, fileList: newFileList });
        },
        beforeUpload: file => {
            onFileUploadChange(file);
            return false;
        },
        fileList: states.fileList,
        name: "file",
        accept: ".xlsx",
    };

    return (
        <Styled>
            <Card
                className={`upload-input-wrap`}
                title="Upload Template"
                size="small"
            >
                <Upload {...props}>
                    <Button disabled={!editable}>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <p> {`Maximum 10 MB`}</p>
                <Divider className="divider" />
                <span>
                    <Icon type="download" />
                    {`TEMPLATE : `}
                    <a href={Path.KLINE_PROMOTION.DOWNLOAD_TEMPLATE}>
                        <Button type="link">Download</Button>
                    </a>
                </span>
            </Card>
        </Styled>
    );
}

export default React.memo(UploadTemplateBox);

const Styled = styled.div`
    display: flex;
    justify-content: center;
    .upload-input-wrap {
        width: 300px;
        .ant-card-body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        p {
            padding: 4px;
        }

        .divider {
            margin: 0px;
        }
    }
`;
