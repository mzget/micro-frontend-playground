import notification from "antd/es/notification";

type NotiOptions = {
    type: "success" | "info" | "warning" | "error";
    message: string;
    description: string;
    duration?: number;
};
const openNotificationWithIcon = ({
    type,
    message,
    description,
    duration = 4.0,
}: NotiOptions) => {
    notification[type]({
        message: message,
        description: description,
        duration: duration,
    });
};
export { openNotificationWithIcon };
