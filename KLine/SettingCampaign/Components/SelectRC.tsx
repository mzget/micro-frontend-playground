import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Row, Col, Radio, Checkbox, Select, Button } from 'antd';
import { ErrorMessage, Controller } from 'react-hook-form';

import { FormItemLabel } from 'app/common/components/Form/FormItemLabel';
import { AppStateType } from 'app/common/types';
const FormItem = Form.Item;

export default function SelectRC({ hookForm }) {
    const { register, errors, setValue } = hookForm;
    const allRC = useSelector((state: AppStateType) =>
        state.loyalty.billPayments?.map(value => ({
            RC_CD: value.RC_CD,
            TH_CNTR_NM: value.TH_CNTR_NM,
        }))
    );

    useEffect(() => {
        register({ name: 'rc' }, { required: 'สังกัด(RC) is required' });
    }, [register]);

    function handleChange(value) {
        setValue('rc', value);
    }

    return (
        <div className="select-wrap">
            <FormItem
                label={<FormItemLabel label="สังกัด(RC)" />}
                extra={<ErrorMessage errors={errors} name="rc" />}
            >
                <Select placeholder="กรุณาเลือกสังกัด" onChange={handleChange}>
                    {allRC?.map(v => (
                        <Select.Option
                            key={v.RC_CD}
                            value={v.RC_CD}
                        >{`${v.RC_CD} : ${v.TH_CNTR_NM}`}</Select.Option>
                    ))}
                </Select>
            </FormItem>
        </div>
    );
}
