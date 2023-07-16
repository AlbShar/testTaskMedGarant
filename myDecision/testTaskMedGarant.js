const busy = [
  { start: "10:30", stop: "10:50" },
  { start: "18:40", stop: "18:50" },
  { start: "14:40", stop: "15:50" },
  { start: "16:40", stop: "17:20" },
  { start: "20:05", stop: "20:20" },
];

const toTimeNum = (strTime) => {
  const [hours, minutes] = strTime.split(":");
  return +hours * 60 + +minutes;
};

const toStrTime = (timeNum) => {
  const hours = Math.trunc(timeNum / 60);
  const fillHours = hours < 10 ? `0${hours}` : hours;
  const minutes = timeNum - hours * 60;
  const fullMinutes = minutes === 0 ? `${minutes}0` : minutes;
  return `${fillHours}:${fullMinutes}`;
};

const getFreeTime = (startJobTime, endJobTime) => {
  const busyNumb = busy
    .map((busyTime) => ({
      start: toTimeNum(busyTime.start),
      stop: toTimeNum(busyTime.stop),
    }))
    .sort(function (a, b) {
      if (a.start > b.start) {
        return 1;
      }
      if (a.start < b.start) {
        return -1;
      }
      return 0;
    });
  let start = toTimeNum(startJobTime);
  let end = toTimeNum(endJobTime);

  const freeTimeNum = [];

  for (let j = 0; j < busyNumb.length; j++) {
    for (let i = start; i < end; i += 30) {
      const freeStartTime = i;
      const freeEndTime = i + 30;

      if (j + 1 === busyNumb.length && freeEndTime < end) {
        freeTimeNum.push({ start: freeStartTime, stop: freeEndTime });
        continue;
      } else if (freeEndTime <= busyNumb[j].start) {
        freeTimeNum.push({ start: freeStartTime, stop: freeEndTime });
        continue;
      } else {
        start = busyNumb[j].stop;
        break;
      }
    }
  }

  const freeTimeStr = freeTimeNum.map((busyTime) => ({
    start: toStrTime(busyTime.start),
    stop: toStrTime(busyTime.stop),
  }));

  console.log(freeTimeStr);
};

getFreeTime("09:00", "21:00");
