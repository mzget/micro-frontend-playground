import { FormContextProps } from "app/common/types";

export type LimitCardProps = {
    level: number;
    subItem?: number;
    setSubItem?: (subItem: number) => void;
    onLevelChange?: () => void;
    handleRemoveLevel?: () => void;
} & FormContextProps;
