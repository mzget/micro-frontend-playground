function maskingIdCard(value: string = "") {
    // console.log(value);
    // console.log(value.length);
    if (value.length <= 6) {
        return value;
    } else if (value.length > 6 && value.length < 12) {
        let maskedArr: string[] = [];
        let valueSplit = value.split("");
        // console.log(valueSplit);
        // console.log(valueSplit[0]);
        for (let i = 0; i < value.length; i++) {
            if (i < 6) {
                maskedArr.push(valueSplit[i]);
            } else {
                maskedArr.push("*");
            }
        }
        return maskedArr.join("");
    } else {
        let maskedValue = value.replace(/^(.{6})(.{6})(.*)$/g, "$1******$3");
        // console.log(maskedValue);
        return maskedValue;
    }
}
export default maskingIdCard;
