import { createAction } from 'redux-actions';
import produce from 'immer';
import { ActionType, ActionPayload } from 'app/common/types';
import {
    LoyaltyMemberItem,
    InstantRedemtionItem,
} from 'app/common/types/loyaltyItems';

const GET_LOYALTY_MEMBERS = 'loyalty/getLoyaltyMembers';
const GET_LOYALTY_MEMBERS_FINISH = 'loyalty/getLoyaltyMembersFinish';
export const getLoyaltyMembers = createAction(GET_LOYALTY_MEMBERS);
export const getLoyaltyMembersFinish = createAction<ActionPayload>(
    GET_LOYALTY_MEMBERS_FINISH
);

const GET_ALL_INSTANT_ITEMS = 'loyalty/getAllInstantItems';
const GET_ALL_INSTANT_ITEMS_FINISH = 'loyalty/getAllInstantItemsFinish';
export const getAllInstantItems = createAction(GET_ALL_INSTANT_ITEMS);
export const getAllInstantItemsFinish = createAction<ActionPayload>(
    GET_ALL_INSTANT_ITEMS_FINISH
);

const loyaltyInitState = {
    memberList: [] as Array<LoyaltyMemberItem>,
    billPayments: [] as Array<InstantRedemtionItem>,
    qrs: [] as Array<InstantRedemtionItem>,
};
export const loyaltyReducer = (
    state = loyaltyInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case GET_LOYALTY_MEMBERS_FINISH: {
                let { success, result } = action.payload;
                if (success) {
                    draft.memberList = result.data;
                }
                break;
            }
            case GET_ALL_INSTANT_ITEMS_FINISH: {
                let { success, result, meta } = action.payload;
                if (success && meta === 'BILL_PAYMENT') {
                    draft.billPayments = result.data;
                } else if (success && meta === 'QR') {
                    draft.qrs = result.data;
                }
                break;
            }
        }
    });
};
