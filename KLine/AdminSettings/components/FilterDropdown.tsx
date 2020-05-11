import React, { useCallback, useState } from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';

const menus = ['available', 'removed', 'all'];

// used "Other elments" example instead of "Basic"
const Box = ({ onSelect }: any) => {
    const [selected, setSelected] = useState(menus[0]);
    const onClick = useCallback(
        e => {
            const { key } = e;
            setSelected(menus[key]);
            onSelect(menus[key]);
        },
        [onSelect]
    );
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="0">{menus[0]}</Menu.Item>
            <Menu.Item key="1">{menus[1]}</Menu.Item>
            <Menu.Item key="2">{menus[2]}</Menu.Item>
        </Menu>
    );
    return (
        <Dropdown className="item-row" overlay={menu}>
            <Button>
                {selected} <Icon type="down" />
            </Button>
        </Dropdown>
    );
};

export default Box;
