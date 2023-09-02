export function dateDiffInDays(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24));
}

// const startDate = new Date('2023-08-01');  // 第一个日期
// const endDate = new Date('2023-08-15');    // 第二个日期
//
// const daysBetween = dateDiffInDays(startDate, endDate);
// console.log(`相隔的天数为: ${daysBetween}`);
