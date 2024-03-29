const getDaysInMonth = (year: string | null, month: string | null) => {
  // NOTE: どちらか入力なしの場合は、一律31を返す.
  if (year === null || month === null) {
    return 31;
  }

  const isLeapYear = (year: number): boolean => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };
  return Number(month) === 2
    ? isLeapYear(Number(year))
      ? 29
      : 28
    : [4, 6, 9, 11].includes(Number(month))
      ? 30
      : 31;
};

const calcAcademicPeriodDate = (y: number, m: number, d: number) => {
  let year = +y;
  const month = +m;
  const day = +d;

  if (month < 4 || (month === 4 && day === 1)) {
    year -= 1;
  }

  // YYYYMMDD
  return year * 10000 + 400 + 1;
};

export { getDaysInMonth, calcAcademicPeriodDate };
