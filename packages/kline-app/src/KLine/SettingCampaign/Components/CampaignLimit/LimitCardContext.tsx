import React, { useState, useCallback } from "react";
import LimitPerCard from "./LimitPerCard";
import LimitPerShop from "./LimitPerShop";
import LimitCardPerShop from "./LimitCardPerShop";
import { LevelLimit } from "app/common/types";

function LimitContext({
    component: Component,
    name,
    campaignConditions,
    ...rest
}) {
    const limitItem = campaignConditions[name] as LevelLimit | undefined;
    const level = limitItem && Object.keys(limitItem).length;

    const init = level && level > 1 ? level : 1;
    const [allLevel, setAllLevel] = useState(init);
    const [subItem, setSubItem] = useState(init > 1 ? 1 : 0);
    const handleAddLimitLevel = useCallback(() => {
        setAllLevel(allLevel + 1);
    }, [allLevel]);
    const handleRemoveLevel = useCallback(() => {
        setAllLevel(allLevel - 1);
        setSubItem(subItem - 1);
    }, [allLevel, subItem]);
    const items = new Array(allLevel).fill(0);

    return (
        <Component
            {...rest}
            items={items}
            handleAddLimitLevel={handleAddLimitLevel}
            handleRemoveLevel={handleRemoveLevel}
            subItem={subItem}
            setSubItem={setSubItem}
        />
    );
}

const LimitPerCardWrapper = ({ items, handleAddLimitLevel, ...rest }: any) => (
    <div>
        {items.map((_, id) => {
            const level = id + 1;
            return (
                <LimitPerCard
                    {...rest}
                    onLevelChange={handleAddLimitLevel}
                    level={level}
                    key={level}
                />
            );
        })}
    </div>
);
export const EnhancedLimitPerCard = props => (
    <LimitContext
        name={"customer_periods"}
        component={LimitPerCardWrapper}
        {...props}
    ></LimitContext>
);

const LimitPerShopWrapper = ({ items, handleAddLimitLevel, ...rest }: any) => (
    <div>
        {items.map((_, id) => {
            const level = id + 1;
            return (
                <LimitPerShop
                    {...rest}
                    onLevelChange={handleAddLimitLevel}
                    level={level}
                    key={level}
                />
            );
        })}
    </div>
);
export const EnhancedLimitPerShop = props => (
    <LimitContext
        name="merchant_periods"
        component={LimitPerShopWrapper}
        {...props}
    ></LimitContext>
);

const LimitCardPerShopWrapper = ({
    items,
    handleAddLimitLevel,
    ...rest
}: any) => (
    <div>
        {items.map((_, id) => {
            const level = id + 1;
            return (
                <LimitCardPerShop
                    {...rest}
                    onLevelChange={handleAddLimitLevel}
                    level={level}
                    key={level}
                />
            );
        })}
    </div>
);
export const EnhancedLimitCardPerShop = props => (
    <LimitContext
        name="customer_merchant_periods"
        component={LimitCardPerShopWrapper}
        {...props}
    ></LimitContext>
);
