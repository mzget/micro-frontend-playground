import React, { useCallback, useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { push, replace } from "connected-react-router";
import { Button, Typography } from "antd";
import QueueAnim from "rc-queue-anim";
import moment from "moment";
import isEmpty from "lodash/isEmpty";

import "./SettingCampaign.scss";
import {
    AppStateType,
    MockData,
    CampaignInfo,
    CampaignCondition,
} from "app/common/types";
import LoadingComponent from "app/common/components/Loading";
import CampaignRedemption from "../Components/Redemption/CampaignRedemption";
import CampaignPeriod from "../Components/CampaignPeriod";
import CampaignLimit from "../Components/CampaignLimit";
import EditUploadTemplate from "../Components/EditUploadTemplate";
import CampaignInformation from "../Components/CampaignInformation";
import CampaignConfiguration from "../Components/CampaignConfiguration";
import CampaignParticipant from "../Components/CampaignParticipant";
import UploadTemplateBox from "../Components/UploadTemplateBox";
import { useCampaignContext } from "../../Enhancer/useCampaignContext";
import { showConfirm } from "app/common/components/feedback/Modal/confirmModal";
import {
    $saveDraftCampaign,
    $clearDraftCampaign,
} from "../../redux/actions/saveDraft";
import { $createCampaign } from "../../redux/actions/createCampaign";
import { Location } from "app/constants/link";
import { Locale } from "app/locale";
import { useParams } from "react-router";
import AsyncModal from "app/common/components/feedback/Modal/AsyncModal";
import { parseCondition } from "app/utils/actions/parseConditions";
import { TIME_FORMAT } from "app/constants";

const { Title } = Typography;
const { KLINE } = Locale;
const event = new Event("reset-form");

const SettingCampaignEnhanced = (props: any) => {
    const campaignDraft = useSelector(
        (state: AppStateType) => state.persist.campaignDraft
    );

    const { start_time, end_time, campaign_conditions } = campaignDraft;
    const initDraft = {
        ...campaignDraft,
        start_time: moment(start_time),
        end_time: moment(end_time),
        limit_total: campaign_conditions?.total_periods?.level_1,
        limit_card: campaign_conditions?.customer_periods || {},
        limit_merchant: campaign_conditions?.merchant_periods || {},
        limit_card_per_merchant:
            campaign_conditions?.customer_merchant_periods || {},
    };

    return isEmpty(campaignDraft) ? (
        <LoadingComponent />
    ) : (
        <SettingCampaign initDraft={initDraft} />
    );
};
export default SettingCampaignEnhanced;

const SettingCampaign = React.memo(({ initDraft }: any) => {
    const params = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const [campaignContext] = useCampaignContext("create");
    const uploaded_id = useSelector(
        (state: AppStateType) => state.klineCampaign.uploaded_id
    );
    const [modalState, setModalState] = useState({
        visible: false,
        confirmLoading: false,
        title: "",
        content: "",
    });
    const [modalHandler, setModalHandler] = useState({
        handleOk: () => {},
    });

    const hookForm = useForm({
        defaultValues: initDraft,
    });

    const { handleSubmit, getValues, reset, watch, setError } = hookForm;
    const campaign_participant = watch("participants");

    const confirmSubmit = useCallback(
        (data: any, uploaded_id) => {
            const {
                start_time,
                end_time,
                limit_total,
                limit_card,
                limit_merchant,
                limit_card_per_merchant,
                campaign_conditions,
                ...rest
            } = data;

            let st = moment(start_time);
            let end = moment(end_time);

            const conditions = { ...campaign_conditions } as CampaignCondition;
            const temp_campaign_conditions = {
                ...conditions,
            } as CampaignCondition;
            temp_campaign_conditions["total_periods"] = conditions.total_periods
                ?.level_1?.total
                ? parseCondition(conditions.total_periods)
                : {};
            temp_campaign_conditions["customer_periods"] = conditions
                .customer_periods?.level_1?.total
                ? parseCondition(conditions.customer_periods)
                : {};
            temp_campaign_conditions["merchant_periods"] = conditions
                .merchant_periods?.level_1?.total
                ? parseCondition(conditions.merchant_periods)
                : {};
            temp_campaign_conditions["customer_merchant_periods"] = conditions
                .customer_merchant_periods?.level_1?.total
                ? parseCondition(conditions.customer_merchant_periods)
                : {};

            const body = {
                ...rest,
                campaign_conditions: temp_campaign_conditions,
                start_time: st,
                end_time: end,
                commit_id: uploaded_id,
                draft_id: params.id,
            } as CampaignInfo;

            return body;
        },
        [params.id]
    );

    const onSubmit = (data: any) => {
        console.log("data", JSON.stringify(data, undefined, 2));
        const params = confirmSubmit(data, uploaded_id);
        console.log("submit", JSON.stringify(params, undefined, 2));

        const campaign_conditions = params.campaign_conditions as CampaignCondition;
        const {
            total_periods,
            customer_periods,
            merchant_periods,
            customer_merchant_periods,
        } = campaign_conditions;
        if (
            isEmpty(total_periods) &&
            isEmpty(customer_periods) &&
            isEmpty(merchant_periods) &&
            isEmpty(customer_merchant_periods)
        ) {
            setError(
                "campaign_conditions",
                "required",
                KLINE.CREATE_CAMPAIGN.LIMIT_ERROR_MESSAGE
            );

            return;
        }

        const modalProps = {
            title: "Confirm",
            content: "Confirm to Create Campaign",
            visible: true,
            confirmLoading: false,
        };
        setModalState({ ...modalProps });
        setModalHandler({
            handleOk: () => {
                setModalState({
                    ...modalProps,
                    confirmLoading: true,
                });

                dispatch(
                    $createCampaign(params, () => {
                        setModalState({
                            ...modalProps,
                            visible: false,
                            confirmLoading: false,
                        });
                    })
                );
            },
        });
    };

    const handleSaveDraft = useCallback(() => {
        const modalProps = {
            title: "Confirm",
            content: "Confirm to Save Draft",
            visible: true,
            confirmLoading: false,
        };
        setModalState({
            ...modalProps,
        });
        setModalHandler({
            handleOk: () => {
                setModalState({
                    ...modalProps,
                    confirmLoading: true,
                });
                let draft = getValues({ nest: true });
                const data = confirmSubmit(draft, uploaded_id);
                const { draft_id, ...rest } = data;
                const item = { ...rest, id: draft_id };

                function cb(draft_id) {
                    setModalState({
                        ...modalProps,
                        visible: false,
                        confirmLoading: false,
                    });

                    dispatch(
                        replace(`${Location.campaign_create}/${draft_id}`)
                    );
                }
                dispatch($saveDraftCampaign(item, cb));
            },
        });
    }, [dispatch, getValues, confirmSubmit, uploaded_id]);

    const handleResetForm = useCallback(() => {
        showConfirm({
            title: "Confirm",
            content: "Confirm to Clear Data",
            onOk: () => {
                const defaultValue = new MockData().DefaultCampaign as any;
                const customResetValue = {
                    ...defaultValue,
                    rc_code: "",
                    start_time: moment("00:00:00", TIME_FORMAT),
                    end_time: moment("23:59:59", TIME_FORMAT),
                };

                dispatch($clearDraftCampaign(customResetValue));
                reset(customResetValue);

                document.getElementById("form-reset")?.dispatchEvent(event);
            },
        });
    }, [dispatch, reset]);

    const handleCancel = useCallback(() => {
        showConfirm({
            title: "Confirm",
            content: "Confirm to Cancel Campaign",
            onOk: () => {
                dispatch(push(Location.campaign_inquiry));
            },
        });
    }, [dispatch]);

    const checkCanUpload = useCallback(() => {
        return !campaign_participant?.includes("All") &&
            campaign_participant?.length > 0
            ? true
            : false;
    }, [campaign_participant]);

    return (
        <div className="container-fluid no-breadcrumb chapter setting-campaign">
            <QueueAnim type="bottom" className="ui-animate content">
                <Title level={4}>{KLINE.CREATE_CAMPAIGN.TITLE}</Title>
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
                                <div className="campaign-paticipant"></div>
                                <CampaignParticipant
                                    hookForm={hookForm}
                                    campaignContext={campaignContext}
                                />
                                {checkCanUpload() && (
                                    <UploadTemplateBox
                                        hookForm={hookForm}
                                        campaignContext={campaignContext}
                                    />
                                )}
                                {checkCanUpload() && (
                                    <EditUploadTemplate
                                        mode={campaign_participant.join(", ")}
                                        campaignContext={campaignContext}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="page-action">
                            <Button className="action" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                className="action"
                                type="danger"
                                onClick={handleResetForm}
                                id="form-reset"
                            >
                                Reset
                            </Button>
                            <Button
                                className="action"
                                onClick={handleSaveDraft}
                            >
                                Save Draft
                            </Button>
                            <Button
                                className="action"
                                htmlType="submit"
                                type="primary"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </FormContext>
                <AsyncModal
                    title={modalState.title}
                    content={modalState.content}
                    visible={modalState.visible}
                    handleOk={modalHandler.handleOk}
                    confirmLoading={modalState.confirmLoading}
                    setModalState={setModalState}
                />
            </QueueAnim>
        </div>
    );
});
