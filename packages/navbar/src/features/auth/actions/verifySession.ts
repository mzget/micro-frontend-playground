import { Dispatch } from "redux";
import { Path } from "constants/services";
import { UniversalFetch } from "utils/API";

import { verifySession, verifySessionFinish } from "../reducers/authReducer";

export const verifySessionAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(verifySession({ message: "Verifing Session..." }));

    try {
      let result = await UniversalFetch({
        url: Path.ADMIN_INSTANT.VERIFY_SESSION,
        method: "GET"
      });
      dispatch(verifySessionFinish({ success: true, result: result }));
    } catch (ex) {
      dispatch(
        verifySessionFinish({
          success: false,
          result: ex,
          message: ex.message
        })
      );
    }
  };
};
