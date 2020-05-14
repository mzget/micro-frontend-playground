import React from "react";
import { Modal, Button, Descriptions, Row, Col, Input } from "antd";
import styled from "styled-components";
import moment from "moment";

import { getCampaignLabel } from "app/common/types";
import { isArray } from "util";
import RedemptionTable from "../../SettingCampaign/Components/Redemption/RedemptionTable";
import { Locale } from "app/locale";
import { TIME_FORMAT } from "app/constants";

const { KLINE } = Locale;
const { TextArea } = Input;

type FieldMap = { from: string; to?: any };
type UpdatedFieldsMap = { [key: string]: FieldMap };

const GridStyle = styled.div.attrs({ className: "grid-box" })<any>`
    box-shadow: ${({ left }: { left: boolean }) =>
        left ? "1px 0px #f0f0f0" : "unset"};
    padding: 8px;
    max-height: 200px;
    overflow-y: auto;
`;

const Container = styled.div`
    .ant-descriptions-item-content {
        padding: 0px;
        text-align: center;
    }
    .ant-descriptions-bordered.ant-descriptions-small
        .ant-descriptions-item-content {
        padding: 0px;
    }
`;

class UpdatedFieldModal extends React.Component<{ text; record; index }> {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    getRenderItem = (type, k, v: FieldMap) => {
        if (type === "from") {
            if (k !== "Uploaded List" && v.from) {
                if (typeof v.from === "string") {
                    if (k === KLINE.LABEL.CURRENCY) {
                        return (
                            <TextArea
                                value={v.from}
                                rows={4}
                                readOnly
                                style={{ textAlign: "center" }}
                            />
                        );
                    } else if (
                        k === KLINE.CREATE_CAMPAIGN.START_TIME ||
                        k === KLINE.CREATE_CAMPAIGN.END_TIME
                    ) {
                        return moment(v.from).format(TIME_FORMAT);
                    }
                    return v.from;
                } else if (isArray(v.from)) {
                    if (k === "เงื่อนไขการคืนเงิน") {
                        return (
                            <RedemptionTable
                                editable={false}
                                datasource={v.from}
                            />
                        );
                    } else {
                        return JSON.stringify(v.from);
                    }
                }
            } else if (k === "Uploaded List") {
                return v.from ? <a href={v.from}>Download File</a> : "-";
            } else {
                return "-";
            }
        } else if (type === "to") {
            if (k !== "Uploaded List" && v.to) {
                if (typeof v.to === "string") {
                    if (k === KLINE.LABEL.CURRENCY) {
                        return (
                            <TextArea
                                value={v.to}
                                rows={4}
                                readOnly
                                style={{ textAlign: "center" }}
                            />
                        );
                    } else if (
                        k === KLINE.CREATE_CAMPAIGN.START_TIME ||
                        k === KLINE.CREATE_CAMPAIGN.END_TIME
                    ) {
                        return moment(v.to).format(TIME_FORMAT);
                    }
                    return v.to;
                } else if (isArray(v.to)) {
                    if (k === "เงื่อนไขการคืนเงิน") {
                        return (
                            <RedemptionTable
                                editable={false}
                                datasource={v.to}
                            />
                        );
                    } else {
                        return JSON.stringify(v.to);
                    }
                }
            } else if (k === "Uploaded List") {
                return v.to ? <a href={v.to}>Download File</a> : "-";
            } else {
                return "-";
            }
        }
    };

    render() {
        let { updated_from, updated_to } = this.props.record;

        const maps: UpdatedFieldsMap = {};
        Object.entries(updated_from).forEach(([k, v]) => {
            const [name, value] = getCampaignLabel(k, v);
            if (name) maps[name] = { from: value };
        });
        Object.entries(updated_to).forEach(([k, v]) => {
            const [name, value] = getCampaignLabel(k, v);
            let temp = maps[name];
            if (name) maps[name] = { ...temp, to: value };
        });

        return (
            <div>
                <Button type="link" onClick={this.showModal}>
                    Link
                </Button>
                <Modal
                    title="Review Updated Field"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={document.body.clientWidth * 0.9}
                    footer={null}
                >
                    <Container>
                        <Descriptions bordered size="small">
                            <Descriptions.Item
                                label={<strong>Updated Field</strong>}
                                span={3}
                            >
                                <Row>
                                    <Col span={12}>
                                        <GridStyle hoverable={false} left>
                                            <strong>Updated From</strong>
                                        </GridStyle>
                                    </Col>
                                    <Col span={12}>
                                        <GridStyle hoverable={false}>
                                            <strong>Updated To</strong>
                                        </GridStyle>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            {Object.entries<FieldMap>(maps).map(([k, v]) => (
                                <Descriptions.Item key={k} label={k} span={3}>
                                    <Row>
                                        <Col span={12}>
                                            <GridStyle left>
                                                {this.getRenderItem(
                                                    "from",
                                                    k,
                                                    v
                                                )}
                                            </GridStyle>
                                        </Col>
                                        <Col span={12}>
                                            <GridStyle>
                                                {this.getRenderItem("to", k, v)}
                                            </GridStyle>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Container>
                </Modal>
            </div>
        );
    }
}

export default React.memo(UpdatedFieldModal);
