export const removeTimeZone = (date: Date) => {
  const stringWithoutTimezone = date.toISOString().slice(0, -1);
  const dateString = new Date(stringWithoutTimezone).toLocaleDateString();

  return new Date(dateString);
};

export const currentDate = (format?: boolean): Date | string => {
  const dateWithoutTimeZone = removeTimeZone(new Date());

  if (format) return formatDateForInput(dateWithoutTimeZone);

  return dateWithoutTimeZone;
};

export const addYear = (date: Date, format?: boolean): Date | string => {
  const currentTimestamp = date.getTime();
  const currentYear = date.getFullYear();

  const newDate = new Date(currentTimestamp);
  newDate.setFullYear(currentYear + 1);

  const dateWithoutTimeZone = removeTimeZone(newDate);

  if (format) return formatDateForInput(dateWithoutTimeZone);

  return dateWithoutTimeZone;
};

export const formatDateForInput = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};
