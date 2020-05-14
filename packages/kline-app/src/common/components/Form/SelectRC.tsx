import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Select } from "antd";
import { ErrorMessage, Controller, FormContextValues } from "react-hook-form";

import { FormItemLabel } from "common/components/Form/FormItemLabel";
import { AppStateType, RC_TYPE } from "common/types";
import { Locale } from "locale";
import { getRCList } from "KLine/redux/actions/getRCList";
const FormItem = Form.Item;
const { KLINE } = Locale;

type SelectRCProps = {
  hookForm: FormContextValues<any>;
  name: string;
  defaultFilter?: RC_TYPE;
  requireMessage?: string;
  editable?: boolean;
  mock?: Array<any>;
};
function SelectRC({
  hookForm,
  name,
  requireMessage,
  editable = true,
  defaultFilter = "All",
  mock = [],
}: SelectRCProps) {
  const { control, errors } = hookForm;
  const dispatch = useDispatch();

  const allRC = useSelector((state: AppStateType) =>
    state.adminRC.search_rc_list?.map((value, id) => ({
      Key: id.toString(),
      RC_CD: value.RC_CD,
      TH_CNTR_NM: value.TH_CNTR_NM,
    }))
  );

  useEffect(() => {
    dispatch(getRCList({ status: defaultFilter, term: "" }));
  }, [defaultFilter, dispatch]);

  return (
    <FormItem
      label={
        requireMessage ? (
          <FormItemLabel label={KLINE.LABEL.RC} />
        ) : (
          KLINE.LABEL.RC
        )
      }
      extra={<ErrorMessage errors={errors} name={name} />}
      className="form-item"
      htmlFor="select-rc-form-item"
    >
      <Controller
        as={
          <Select
            placeholder={KLINE.PLACEHOLDER.SELECT_RC}
            disabled={!editable}
            getPopupContainer={(trigger) =>
              trigger.parentNode ||
              (document.getElementById("select-rc-form-item") as any)
            }
            data-cy={"select-rc"}
          >
            {(allRC || mock).map((v) => (
              <Select.Option
                key={v.Key}
                value={v.RC_CD}
              >{`${v.RC_CD} : ${v.TH_CNTR_NM}`}</Select.Option>
            ))}
          </Select>
        }
        name={name}
        control={control}
        rules={{ required: requireMessage }}
      />
    </FormItem>
  );
}

export default React.memo(SelectRC);
