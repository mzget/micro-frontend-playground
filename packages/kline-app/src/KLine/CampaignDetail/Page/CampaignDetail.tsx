import React, { useEffect, useCallback, useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "antd";
import QueueAnim from "rc-queue-anim";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

import { LoadingModal } from "app/common/components/feedback/Modal";
import LoadingComponent from "app/common/components/Loading";
import { Container } from "app/common/styled/content.styled";
import CampaignRedemption from "../../SettingCampaign/Components/Redemption/CampaignRedemption";
import CampaignPeriod from "../../SettingCampaign/Components/CampaignPeriod";
import CampaignLimit from "../../SettingCampaign/Components/CampaignLimit";
import EditUploadTemplate from "../../SettingCampaign/Components/EditUploadTemplate";
import CampaignInformation from "../../SettingCampaign/Components/CampaignInformation";
import CampaignConfiguration from "../../SettingCampaign/Components/CampaignConfiguration";
import CampaignParticipant from "../../SettingCampaign/Components/CampaignParticipant";
import UploadTemplateBox from "../../SettingCampaign/Components/UploadTemplateBox";
import HoldCampaignModal from "../Components/HoldCampaignModal";
import SummaryBox from "../Components/SummaryBox";
import CampaignDetailAction from "../Components/CampaignDetailAction";
import { useCampaignContext } from "../../Enhancer/useCampaignContext";
import { useCheckUploadTemplate } from "../../Enhancer/useCheckUploadTemplate";
import {
    $holdCampaign,
    HoldCampaignParam,
} from "../../redux/actions/holdCampaign";
import {
    $deleteCampaign,
    DeleteCampaignParam,
} from "../../redux/actions/deleteCampaign";
import { $getCampaignInfo } from "../../redux/actions/getCampaignInfo";
import { $editCampaign } from "../../redux/actions/editCampaign";
import { AppStateType, CampaignInfo } from "app/common/types";
import { getCampaignInfoFinish } from "../../redux/reducers/KLineCampaignReducer";

const { Title } = Typography;

const CampaignDetailEnhanced = (props: any) => {
    const params = useParams<{ id: string }>();
    const { selectedCampaign } = useSelector(
        (state: AppStateType) => state.klineCampaign
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch($getCampaignInfo({ campaign_id: params.id }));
    }, [dispatch, params.id]);

    useEffect(() => {
        return () => {
            dispatch(getCampaignInfoFinish({ success: false }));
        };
    }, [dispatch]);

    useEffect(() => {
        console.log("CampaignDetailEnhanced");
    }, []);

    return isEmpty(selectedCampaign) ? (
        <LoadingComponent />
    ) : (
        <CampaignDetail selectedCampaign={selectedCampaign} />
    );
};
export default CampaignDetailEnhanced;

const CampaignDetail = ({
    selectedCampaign,
}: {
    selectedCampaign: CampaignInfo;
}) => {
    const [campaignContext, setCampaignContext] = useCampaignContext("view");
    const [modalState, setModalState] = useState({
        open: false,
        title: "",
        haveSelect: true,
        requireReason: true,
    });

    const dispatch = useDispatch();
    const loading = useSelector(
        (state: AppStateType) => state.klineCampaign.loading
    );
    const { uploaded_id, commit_id } = useSelector(
        (state: AppStateType) => state.klineCampaign
    );

    const {
        start_time,
        end_time,
        campaign_conditions,
        redemptions,
    } = selectedCampaign;
    const sortedRedemptons = redemptions?.map((v, id) => ({
        key: id.toString(),
        ...v,
    }));
    const defaultValues = {
        ...selectedCampaign,
        start_time: moment(start_time),
        end_time: moment(end_time),
        redemptions: sortedRedemptons,
        participants: selectedCampaign.participants || [],
        limit_total: campaign_conditions?.total_periods?.level_1,
        limit_card: campaign_conditions?.customer_periods,
        limit_merchant: campaign_conditions?.merchant_periods,
        limit_card_per_merchant: campaign_conditions?.customer_merchant_periods,
    };
    const hookForm = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, watch } = hookForm;
    const campaign_participant = watch("participants");

    const onSubmit = useCallback(
        data => {
            const {
                limit_total,
                limit_type,
                start_time,
                end_time,
                ...rest
            } = data;

            let st = moment(start_time);
            let end = moment(end_time);

            let campaign = {
                ...rest,
                start_time: st,
                end_time: end,
                id: selectedCampaign.id,
            };
            if (!data.is_apply_all_merchants) {
                campaign = {
                    ...campaign,
                    commit_id: uploaded_id || commit_id,
                };
            }
            dispatch($editCampaign(campaign));
        },
        [commit_id, dispatch, selectedCampaign.id, uploaded_id]
    );

    const handleEditForm = useCallback(() => {
        switch (campaignContext) {
            case "view":
                setCampaignContext("edit");
                break;
            case "edit":
                setCampaignContext("view");
                window.location.reload();
                break;
            default:
                break;
        }
    }, [campaignContext, setCampaignContext]);

    const holdCampaign = useCallback(
        (hold: boolean) => {
            return (reason: string) => {
                const params = {
                    campaign_id: selectedCampaign.id,
                    promo_code: selectedCampaign.promo_code,
                    is_hold: hold,
                    reason: reason,
                } as HoldCampaignParam;

                dispatch($holdCampaign(params));

                setModalState({ ...modalState, open: false, title: "" });
            };
        },
        [dispatch, modalState, selectedCampaign.id, selectedCampaign.promo_code]
    );

    const deleteCampaign = useCallback(
        (reason: string) => {
            const params = {
                campaign_id: selectedCampaign.id,
                promo_code: selectedCampaign.promo_code,
                reason: reason,
            } as DeleteCampaignParam;

            dispatch($deleteCampaign(params));

            setModalState({ ...modalState, open: false, title: "" });
        },
        [dispatch, modalState, selectedCampaign.id, selectedCampaign.promo_code]
    );

    return (
        <StyledContainer className="container-fluid no-breadcrumb chapter campaign-detail">
            <LoadingModal loading={loading} />
            <HoldCampaignModal
                modalState={modalState}
                setModalState={setModalState}
                handleOk={(reason: string) => {
                    switch (modalState.title) {
                        case "Hold":
                            return holdCampaign(true)(reason);
                        case "Unhold":
                            return holdCampaign(false)(reason);
                        case "Delete":
                            return deleteCampaign(reason);
                    }
                }}
                meta={{ campaign: selectedCampaign.name }}
            />
            <QueueAnim type="bottom" className="ui-animate content">
                <Title level={4}>Campaign Detail</Title>
                <SummaryBox selectedCampaign={selectedCampaign} />
                <FormContext {...hookForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-column left">
                                <CampaignInformation
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                                <CampaignConfiguration
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                                <CampaignPeriod
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                            </div>
                            <div className="form-column right">
                                <CampaignRedemption
                                    campaignContext={campaignContext}
                                />
                                <CampaignLimit
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                                <CampaignParticipant
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                                {useCheckUploadTemplate(
                                    campaign_participant as Array<string>
                                ) && (
                                    <UploadTemplateBox
                                        hookForm={hookForm}
                                        campaignContext={campaignContext}
                                    />
                                )}
                                {useCheckUploadTemplate(
                                    campaign_participant as Array<string>
                                ) && (
                                    <EditUploadTemplate
                                        mode={campaign_participant?.join(", ")}
                                        campaignContext={campaignContext}
                                        commit_id={selectedCampaign.commit_id}
                                    />
                                )}
                            </div>
                        </div>
                        <CampaignDetailAction
                            selectedCampaign={selectedCampaign}
                            campaignContext={campaignContext}
                            setModalState={setModalState}
                            handleEditForm={handleEditForm}
                        />
                    </form>
                </FormContext>
            </QueueAnim>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    .summary-box {
        width: 100%;
        background-color: #d9f7be;
        border-radius: 8px;
        border: 1px solid #d9d9d9;
        padding: 16px;
        margin-bottom: 16px;

        div {
            display: flex;
            justify-content: space-between;
        }
    }
    .ant-transfer-operation {
        margin: 0 4px;
    }
    .ant-transfer-list {
        width: 45%;
    }
    .ant-form-item {
        margin-bottom: 0px;
    }
    .page-action {
        display: inline-flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-end;

        .action {
            margin: 8px;
        }
    }
    .form-item {
        width: 100%;
    }
    .form-row {
        display: flex;
        flex-direction: row;
    }
    .form-column {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .left {
        padding-right: 8px;
        border-right: 1px solid #d9d9d9;
    }
    .right {
        padding-left: 8px;
    }
`;
