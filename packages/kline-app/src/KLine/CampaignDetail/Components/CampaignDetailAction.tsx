import React from "react";
import { Button } from "antd";
import { CampaignContextType, CampaignInfo } from "app/common/types";
import PermissionEnhancer from "../../Enhancer/PermissionEnhancer";
import { KEY_PERMISSION } from "app/constants/menusItems";

function CampaignDetailAction({
    selectedCampaign,
    campaignContext,
    setModalState,
    handleEditForm,
}: {
    selectedCampaign: CampaignInfo;
    campaignContext: CampaignContextType;
    setModalState;
    handleEditForm;
}) {
    const { status } = selectedCampaign;
    const disableAll = status?.toLowerCase() === "deleted" ? true : false;

    return (
        <div className="page-action">
            {campaignContext === "edit" && (
                <Button
                    className="action"
                    htmlType="submit"
                    type="primary"
                    disabled={disableAll}
                >
                    Submit
                </Button>
            )}
            <PermissionEnhancer
                permissionName={KEY_PERMISSION.RE_KLINE_DELETE_CAMPAIGN}
                render={({ permission }) =>
                    permission && (
                        <Button
                            className="action"
                            type="danger"
                            onClick={() =>
                                setModalState({
                                    open: true,
                                    title: "Delete",
                                    haveSelect: true,
                                    requireReason: true,
                                })
                            }
                            disabled={disableAll}
                        >
                            Delete
                        </Button>
                    )
                }
            />

            {selectedCampaign.status?.toLowerCase() === "hold" ? (
                <Button
                    className="action"
                    type="danger"
                    onClick={() =>
                        setModalState({
                            open: true,
                            title: "Unhold",
                            haveSelect: false,
                            requireReason: false,
                        })
                    }
                    disabled={disableAll}
                >
                    Unhold
                </Button>
            ) : (
                <PermissionEnhancer
                    permissionName={KEY_PERMISSION.RE_KLINE_HOLD_CAMPAIGN}
                    render={({ permission }) =>
                        permission && (
                            <Button
                                className="action"
                                type="danger"
                                onClick={() =>
                                    setModalState({
                                        open: true,
                                        title: "Hold",
                                        haveSelect: true,
                                        requireReason: true,
                                    })
                                }
                                disabled={disableAll}
                            >
                                Hold
                            </Button>
                        )
                    }
                />
            )}
            <PermissionEnhancer
                permissionName={KEY_PERMISSION.RE_KLINE_EDIT_CAMPAIGN}
                render={({ permission }) =>
                    permission && (
                        <Button
                            className="action"
                            onClick={handleEditForm}
                            disabled={disableAll}
                        >
                            {campaignContext === "view" ? "Edit" : "Cancel"}
                        </Button>
                    )
                }
            ></PermissionEnhancer>
        </div>
    );
}

export default React.memo(CampaignDetailAction);
