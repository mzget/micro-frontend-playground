import React from 'react';
import { Input } from 'antd';

const InputBox = (props: any) => {
    return (
        <div>
            <div className="header">{props.label}</div>
            <Input placeholder="Basic usage" />
        </div>
    );
};

export default InputBox;
