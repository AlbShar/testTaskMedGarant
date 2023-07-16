import React, { useState, useEffect } from "react";
import { toTimeNum } from "./helpers/toTimeNum";
import { toStrTime } from "./helpers/toStrTime";

const Schedule = () => {
  type TSchedule = {
    start: string;
    stop: string;
    title: string;
  };
  const [scheduleTimeToday, setScheduleTimeToday] = useState<
    TSchedule[] | null
  >(null);

  const busyTimeToday: TSchedule[] = [
    { start: "10:30", stop: "10:50", title: "busy" },
    { start: "18:40", stop: "18:50", title: "busy" },
    { start: "14:40", stop: "15:50", title: "busy" },
    { start: "16:40", stop: "17:20", title: "busy" },
    { start: "20:05", stop: "20:20", title: "busy" },
  ];

  useEffect(() => {
    const setSchedule = (startJobTime: string, endJobTime: string) => {
      const busyNumb = busyTimeToday
        .map((busyTime) => ({
          start: toTimeNum(busyTime.start),
          stop: toTimeNum(busyTime.stop),
          title: busyTime.title,
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
            freeTimeNum.push({
              start: freeStartTime,
              stop: freeEndTime,
              title: "free",
            });
            continue;
          } else if (freeEndTime <= busyNumb[j].start) {
            freeTimeNum.push({
              start: freeStartTime,
              stop: freeEndTime,
              title: "free",
            });
            continue;
          } else {
            start = busyNumb[j].stop;
            break;
          }
        }
      }

      const scheduleTimeNumb = freeTimeNum
        .concat(busyNumb)
        .sort(function (a, b) {
          if (a.start > b.start) {
            return 1;
          }
          if (a.start < b.start) {
            return -1;
          }
          return 0;
        });
      const scheduleTimeStr: TSchedule[] = scheduleTimeNumb.map((day) => ({
        start: toStrTime(day.start),
        stop: toStrTime(day.stop),
        title: day.title,
      }));

      setScheduleTimeToday(scheduleTimeStr);
    };

    setSchedule("09:00", "21:00");
  }, []);

  return (
    <div style={{ margin: "0 auto", width: 150, marginTop: 30 }}>
      <div style={{margin: '10px 0', textAlign: 'center'}}>
        <div style={{ border: "2px solid green", margin: '0 0 5px 0' }}> Время свободно</div>
        <div style={{ border: "2px solid red" }}> Время занято</div>
      </div>
      <table style={{width: 150}}>
        <tbody>
          <tr>
            <th style={{ border: "2px solid black" }}>17 июля</th>
          </tr>
          {scheduleTimeToday?.map((scheduleTime, index) => {
            const style =
              scheduleTime.title === "busy"
                ? { border: "2px solid red" }
                : { border: "2px solid green" };
            return (
              <tr key={index}>
                <th style={style}>
                  {`${scheduleTime.start} - ${scheduleTime.stop}`}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
