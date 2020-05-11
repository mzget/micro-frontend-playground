import React from "react";

export function useCheckUploadTemplate(campaign_participant: Array<string>) {
    return !campaign_participant?.includes("All") &&
        campaign_participant?.length > 0
        ? true
        : false;
}
