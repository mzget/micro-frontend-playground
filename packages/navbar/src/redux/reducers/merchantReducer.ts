import { createAction } from 'redux-actions';
import { AnyAction } from 'redux';
import produce from 'immer';

const GET_MERCHANT = 'merchant/getMerchant';
export const getMerchant = createAction(GET_MERCHANT);

const authInitState = {
    user: undefined,
    mid: '',
    role: '',
};
export const merchantReducer = (state = authInitState, action: AnyAction) => {
    return produce(state, draft => {
        switch (action.type) {
        }
    });
};
