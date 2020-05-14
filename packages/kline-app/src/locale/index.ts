export const Locale = {
    KLINE: {
        CAMPAIGN_INQUIRY: {
            CREATE_CAMPAIGN: "Create Campaign",
            CAMPAIGN_START_DATE: "ช่วงเวลาที่ต้องการดูข้อมูล (เริ่ม)",
            CAMPAIGN_END_DATE: "ช่วงเวลาที่ต้องการดูข้อมูล (สิ้นสุด)",
        },
        LABEL: {
            CAMPAIGN: "ชื่อแคมเปญ",
            CAMPAIGN_CODE: "รหัสแคมเปญ",
            CAMPAIGN_CHANNEL: "ช่องทางการชำระเงิน",
            CAMPAIGN_TYPE: "ประเภทแคมเปญ",
            CURRENCY: "สกุลเงิน",
            RC: "สังกัด (RC)",
            RC_ALIAS: "สังกัดย่อ (TH)",
            CAMPAIGN_START_DATE: "วันที่เริ่ม",
            CAMPAIGN_START_DATE_LABEL: "วันที่เริ่มแคมเปญ",
            CAMPAIGN_END_DATE: "วันที่สิ้นสุด",
            CAMPAIGN_END_DATE_LABEL: "วันที่สิ้นสุดแคมเปญ",
            CAMPAIGN_START_TIME: "เวลาเริ่ม",
            CAMPAING_START_TIME_LABEL: "เวลาที่เริ่มแคมเปญในแต่ละวัน",
            CAMPAIGN_END_TIME: "เวลาสิ้นสุด",
            CAMPAIGN_END_TIME_LABEL: "เวลาสิ้นสุดแคมเปญในแต่ละวัน",
            Campaign_Name: "ชื่อแคมเปญ",
            Campaign_Name_TH: "ชื่อแคมเปญใน Notification TH",
            Campaign_Name_EN: "ชื่อแคมเปญใน Notification EN",
            Campaign_Detail_TH: "รายละเอียดแคมเปญ TH",
            Campaign_Detail_EN: "รายละเอียดแคมเปญ EN",
            CAMPAIGN_STATUS: "สถานะ",
            REDEMPTION: "เงื่อนไขการคืนเงิน",
            CASHBACK_TYPE: "เลือกประเภท",
            PAID_AMOUNT: "จำนวนเงินที่จ่าย (บาท)",
            CASHBACK_AMOUNT: "จำนวนเงินที่คืน (บาท)",
            PERCENT_AMOUNT: "เปอร์เซนต์ (%)",
            LIMIT_CASHBACK_AMOUNT: "จำนวนเงินคืนสูงสุด (บาท)",
            LIMIT_REDEMPTION: "ลิมิตการคืนเงิน",
            CAMPAIGN_PARTICIPANT: "ร้านค้า / ประเภทธุรกิจที่ร่วมแคมเปญ",
            LAST_EDIT_DATETIME: "แก้ไขข้อมูลล่าสุด",
            CREATOR: "ผู้สร้าง",
            LIMIT_TOTAL: "ลิมิตทั้งหมด",
            LIMIT_CARD: "ลิมิตต่อบัตร",
            LIMIT_SHOP: "ลิมิตต่อร้านค้า",
            LIMIT_CARD_PER_SHOP: "ลิมิตต่อบัตรต่อร้านค้า",
            CAMPAIGN_PERIOD: "ระยะเวลา",
            TOTAL: "ทั้งหมด",
            USED: "ใช้ไป",
            REMAIN: "คงเหลือ",
            MONEY_USED: "จำนวนเงินที่ใช้ไปทั้งหมด",
            FUNCTION: "Function",
            ACTION: "Action",
            USER_ID: "User ID",
            DATE: "Date",
            TIME: "Time",
        },
        PLACEHOLDER: {
            START_DATE: "กรุณาเลือกวันที่เริ่มต้น",
            END_DATE: "กรุณาเลือกวันที่สิ้นสุด",
            PAYMENT_CHANNEL: "กรุณาเลือกช่องทางชำระเงิน",
            LIMIT_TYPE: "กรุณาเลือกประเภท",
            SELECT_RC: "กรุณาเลือกสังกัด",
            SELECT_FUNCTION: "กรุณาเลือก Function",
            SELECT_ACTION: "กรุณาเลือก Action",
        },
        CREATE_CAMPAIGN: {
            TITLE: "Create Campaign",
            NEW_REDEMPTION: "เพิ่มเงื่อนไขการคืนเงิน",
            START_TIME: "เวลาที่เริ่มแคมเปญในแต่ละวัน",
            END_TIME: "เวลาสิ้นสุดแคมเปญในแต่ละวัน",
            REDEMTION_TABLE: {
                CAMPAIGN_TYPE: "ประเภท",
                PAID_AMOUNT: "จำนวนเงินที่จ่าย (บาท)",
                CASHBACK_AMOUNT: "จำนวนเงินที่คืน (บาท)",
                CASHBACK_PERCENT: "จำนวนเงินที่คืน (%)",
                LIMIT_CASHBACK_AMOUNT: "จำนวนเงินคืนสูงสุด (บาท)",
            },
            REDEMPTION_FORM: {
                ERR_CASHBACK_AMOUNT_NotGreaterThanOrEqualTo:
                    "ไม่สามารถกรอกจำนวนเงินที่คืนน้อยกว่า 0.01 ได้",
                ERR_CASHBACK_PERCENT_NotGreaterThanOrEqualTo:
                    "ไม่สามารถกรอกเปอร์เซนต์น้อยกว่า 0.01 ได้",
                ERR_LIMIT_CASHBACK_AMOUNT_NotGreaterThanOrEqualTo:
                    "ไม่สามารถกรอกจำนวนเงินคืนสูงสุดน้อยกว่า 0.01 ได้",
                ERR_DUPLICATE_PAID_AMOUNT:
                    "ไม่อนุญาตให้กำหนดจำนวนเงินที่จ่ายเป็นจำนวนเดียวกันได้",
            },
            LIMIT_ERROR_MESSAGE: "กรุณากรอกลิมิตอย่างน้อย 1 ประเภท",
            END_DATE_ERROR_MESSAGE:
                "เวลาที่สิ้นสุดแคมเปญในแต่ละวัน ต้องมากกว่า เวลาที่เริ่ม",
            LIMIT_TOTAL_INVALID_MESSAGE: "รูปแบบของลิมิตทั้งหมดไม่ถูกต้อง",
            LIMIT_CARD_INVALID_MESSAGE: "รูปแบบของลิมิตต่อบัตรไม่ถูกต้อง",
            LIMIT_SHOP_INVALID_MESSAGE: "รูปแบบของลิมิตต่อร้านค้าไม่ถูกต้อง",
            LIMIT_CARD_PER_SHOP_INVALID_MESSAGE:
                "รูปแบบของลิมิตต่อบัตรต่อร้านค้าไม่ถูกต้อง",
            LIMIT_LEVEL_2_LESS_THAN_LEVEL_1_FUNC: (name: string) =>
                `${name} (ขั้นที่2) ต้องน้อยกว่า ${name} (ขั้นที่1) เท่านั้น`,
        },
        CAMPAIGN_DETAIL: {
            REASON: "เหตุผล",
            ERROR_HOLD_CAMPAIGN: "กรุณาระบุเหตุผลของการ Hold Campaign",
            ERROR_DELETE_CAMPAIGN: "กรุณาระบุเหตุผลของการ Delete Campaign",
        },
        TRANSACTION_INQ: {
            TITLE: "Transaction Inquiry",
            SEARCHFORM_CAMPAIGN_ID: "รหัสแคมเปญ",
            SEARCHFORM_CREDIT_CARD_NO: "เลขบัตรเดบิต",
            SEARCHFORM_ACCOUNT_NO: "เลขที่บัญชี",
            SEARCHFORM_MERCHANT_ID: "รหัสร้านค้า (Merchant ID)",
            SEARCHFORM_START_PAY_DATE: "วันที่จ่ายเงิน (เริ่มต้น)",
            SEARCHFORM_END_PAY_DATE: "วันที่จ่ายเงิน (สิ้นสุด)",
            SEARCHFORM_START_RECEIVE_DATE: "วันที่คืนเงิน (เริ่มต้น)",
            SEARCHFORM_END_RECEIVE_DATE: "วันที่คืนเงิน (สิ้นสุด)",
            SEARCHFORM_REFUND_STATUS: "สถานะการคืนเงิน",
            TABLE_HEADER_INDEX: "#",
            TABLE_HEADER_CAMPAIGN_ID: "รหัสแคมเปญ",
            TABLE_HEADER_CAMPAIGN_NAME: "ชื่อแคมเปญ",
            TABLE_HEADER_CAMPAIGN_TYPE: "ประเภทแคมเปญ",
            TABLE_HEADER_CREDIT_CARD_NO: "เลขบัตรเดบิต",
            TABLE_HEADER_ACCOUNT_NO: "เลขที่บัญชี",
            TABLE_HEADER_MERCHANT_ID: "รหัสร้านค้า",
            TABLE_HEADER_MERCHANT_NAME: "ชื่อร้านค้า",
            TABLE_HEADER_MCC: "MCC",
            TABLE_HEADER_TXN_AMOUNT: "จำนวนเงินต้นทาง",
            TABLE_HEADER_CURRENCY_ORIGIN: "สกุลเงินต้นทาง",
            TABLE_HEADER_PAY_AMOUNT: "จำนวนเงินที่จ่าย(บาท)",
            TABLE_HEADER_DATE_PAY: "วันที่จ่ายเงิน",
            TABLE_HEADER_DATE_SETTLEMENT: "วันที่เข้าเงิน(Settlement)",
            TABLE_HEADER_APPROVAL_CODE: "Approval Code",
            TABLE_HEADER_POS_ENTRY_MODE: "POS Entry Mode",
            TABLE_HEADER_PAYMENT_CHANNEL: "ช่องทางการชำระเงิน",
            TABLE_HEADER_REFUND_AMOUNT: "จำนวนเงินที่คืน",
            TABLE_HEADER_DATE_REFUND: "วันที่คืนเงิน",
            TABLE_HEADER_RC: "สังกัด (RC)",
            TABLE_HEADER_REFUND_STATUS: "สถานะการคืนเงิน",
            TABLE_HEADER_ERROR_MSG: "Error message",
            TABLE_HEADER_DATE_SYS_RECEIVED: "วันที่ระบบได้รับข้อมูล",
            SEARCH_TRANS_RES: "Search Transactions Result",
        },
        LIMIT_INQ: {
            TITLE: "Limit Inquiry",
            TABS_CAMPAIGN: "Campaign",
            TABS_CARD: "Card",
            TABS_MERCHANT: "Merchant",
            TABLE_TITLE_CAMPAIGN_LIMIT: "Campaign Limit",
            TABLE_TITLE_CARD_LIMIT: "Card Limit",
            TABLE_TITLE_CARD_PER_MERCHANT_LIMIT: "Card per Merchant Limit",
            TABLE_TITLE_MERCHANT_LIMIT: "Merchant Limit",
            SEARCHFORM_CAMPAIGN_ID: "รหัสแคมเปญ",
            SEARCHFORM_PAY_DATE: "วันที่จ่ายเงิน",
            SEARCHFORM_CREDIT_CARD_NO: "เลขบัตรเดบิต",
            SEARCHFORM_ACCOUNT_NO: "เลขที่บัญชี",
            SEARCHFORM_MERCHANT_ID: "รหัสร้านค้า (Merchant ID)",
            SEARCHFORM_MERCHANT_ID_NO_PARENTHESIS: "รหัสร้านค้า",
            TABLE_HEADER_PERIOD: "Period",
            TABLE_HEADER_FROM_DATE: "From Date",
            TABLE_HEADER_TO_DATE: "To Date",
            TABLE_HEADER_LIMIT_TYPE: "Limit Type (ลิมิตการคืนเงิน)",
            TABLE_HEADER_TOTAL: "Total",
            TABLE_HEADER_USED: "Used",
            TABLE_HEADER_REMAINING: "Remaining",
            TABLE_HEADER_MERCHANT_ID: "Merchant ID",
        },
        SETTING_RC: {
            CREATE_RC: "Create RC",
            SETTING_RC: "Setting RC",
        },
        AUDIT_LOG: {
            NAME: "Audit Log",
            RC: "รหัสสังกัด (RC)",
            END_DATE_INVALID_MESSAGE:
                "วันทีสิ้นสุดต้องมากกว่าหรือเท่ากับวันที่เริ่ม",
        },
        FUNC_LOCALE: {
            WARNING_VALIDATOR_MESSAGE: (
                type: "form" | "numbers" | "alphabets and numbers" | string,
                field
            ) => {
                if (type === "alphabets and numbers") {
                    return `กรุณากรอกรูปแบบของ${field}ให้ถูกต้อง`;
                } else if (type === "numbers") {
                    return `กรุณากรอก${field}เป็นตัวเลขเท่านั้น`;
                } else if (type === "form") {
                    return `รูปแบบของ${field} ไม่ถูกต้อง`;
                } else {
                    return `กรุณากรอก${field}ให้ถูกต้อง`;
                }
            },
            WARNING_REQUIRED_FIELD: field => `กรุณากรอก${field}`,
        },
        SEARCH: "Search",
        CLEAR: "Clear",
        EXPORT: "Export",
        ALPHANUMERIC: "alphabets and numbers",
        NUMERIC: "numbers",
        ALPHABET: "alphabets",
        NO_DATA: "No Data",
    },
    ERROR_KLINE: {
        DIBIT_CARD_INVALID_MESSAGE: "กรุณากรอกเลขบัตรเดบิต จำนวน 16 หลัก",
        PROMO_CODE_INVALID_MESSAGE: "กรุณากรอกรหัสแคมเปญ จำนวน 9 หลัก",
        ACCOUNT_NO_INVALID_MESSAGE: "กรุณากรอกเลขที่บัญชี จำนวน 10 หลัก",
        MERCHANT_ID_INVALID_MESSAGE:
            "กรุณากรอกรหัสร้านค้า (Merchant ID) จำนวน 9 หลัก",
    },
};