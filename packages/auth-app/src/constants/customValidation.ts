export const TextIncludes = (value: string, excepts: string[]) => {
    if (!value) {
        return true;
    }

    let fail = excepts.some(v => value.includes(v));

    return fail ? `ไม่อนุญาตให้กรอกอักขระ " และ |` : true;
};
