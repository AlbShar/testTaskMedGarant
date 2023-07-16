export const toTimeNum = (strTime: string): number => {
  const [hours, minutes] = strTime.split(":");
  return +hours * 60 + +minutes;
};
