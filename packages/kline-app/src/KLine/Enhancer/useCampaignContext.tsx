import React, { useState } from "react";

import { CampaignContextType } from "app/common/types";

export function useCampaignContext(state: CampaignContextType) {
    return useState(state);
}
