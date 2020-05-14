function sortingRedemption(a, b) {
    if (a.paid_amount < b.paid_amount) {
        return -1;
    }
    if (a.paid_amount > b.paid_amount) {
        return 1;
    }
    return 0;
}

export { sortingRedemption };
