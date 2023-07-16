export const toStrTime = (timeNum: number): string => {
  const hours = Math.trunc(timeNum / 60);
  const fillHours = hours < 10 ? `0${hours}` : hours;
  const minutes = timeNum - hours * 60;
  const fullMinutes =
    minutes === 0 ? `${minutes}0` : minutes < 10 ? `0${minutes}` : minutes;
  return `${fillHours}:${fullMinutes}`;
};
