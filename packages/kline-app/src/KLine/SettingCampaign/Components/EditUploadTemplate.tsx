import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppStateType, CampaignContextType } from "app/common/types";
import UploadTemplateTable from "./UploadTemplateTable";
import {
    setUploadedID,
    getTempUploadedDataFinish,
    getActualUploadedDataFinish,
} from "../../redux/reducers/KLineCampaignReducer";
import { getActualUploadedMCC } from "../../redux/actions/getUploadedMCC";

type EditUploadTemplateProps = {
    mode: string;
    campaignContext: CampaignContextType;
    commit_id?: string;
};
const EditUploadTemplate = ({
    mode,
    campaignContext,
    commit_id,
}: EditUploadTemplateProps) => {
    const { uploaded_info, total_upload, uploaded_id } = useSelector(
        (state: AppStateType) => state.klineCampaign
    );
    const dispatch = useDispatch();

    const onPageChange = useCallback(
        (page, pageSize) => {
            if (uploaded_id) {
                dispatch(
                    setUploadedID({
                        result: uploaded_id,
                        meta: { page, pageSize },
                    })
                );
            } else if (commit_id) {
                let index = page - 1;
                dispatch(
                    getActualUploadedMCC({ commit_id, page: index, pageSize })
                );
            }
        },
        [commit_id, dispatch, uploaded_id]
    );

    useEffect(() => {
        if (campaignContext === "view" && commit_id) {
            dispatch(
                getActualUploadedMCC({ commit_id, page: 0, pageSize: 15 })
            );
        }
    }, [campaignContext, commit_id, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(getTempUploadedDataFinish({ success: false }));
            dispatch(getActualUploadedDataFinish({ success: false }));
        };
    }, [dispatch]);

    return (
        <UploadTemplateTable
            mode={mode}
            uploaded_info={uploaded_info}
            total_upload={total_upload}
            onPageChange={onPageChange}
        />
    );
};

export default React.memo(EditUploadTemplate);
