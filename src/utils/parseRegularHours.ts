import dayjs from "dayjs";

const days: TDayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * parse and map [regularHours] to strings for displaying
 */
export const parseRegularHours = (
  regularHours: Record<
    TDayOfWeek,
    {
      duration: string;
      startTime: string;
    }[]
  >
) => {
  const currentDay = new Date().getDay();
  const { duration, startTime } = regularHours?.[days[currentDay]]?.[0] || {};

  let openTime = `Opens at ${startTime}`;
  if (!startTime) {
    // get the next closed day
    let nextCloseDay = 0;
    for (let i = 0; i < 7; i++) {
      // day will be one of 7 days until now
      let day = currentDay + i < 7 ? days[currentDay + i] : days[currentDay + i - 7];
      // find the next open day, stop counting
      if (regularHours[day]?.length) break;
      // count the next close days
      nextCloseDay += 1;
    }
    openTime = `Closed for the next ${nextCloseDay} days`;
  }

  let openningStatus: "open" | "closing_soon" | "closed" = "closed";
  if (duration) {
    // check the store is "open" or not
    // parse [duration], get "hours" and "minutes" number
    const durationTime = duration.replace("PT", "");
    const [durationHours, durationMinutes] = durationTime.split(/H|M/);

    const currentDate = dayjs().format(`MM-DD-YYYY`);
    const openDateTime = dayjs(`${currentDate} ${startTime}`).unix();
    const closeDateTime = dayjs(openDateTime)
      .add(Number(durationHours), "hour")
      .add(Number(durationMinutes), "minute")
      .unix();

    // check if is store openning at now
    if (openDateTime <= dayjs().unix() && dayjs().unix() <= closeDateTime) {
      openningStatus = "open";

      if (closeDateTime - dayjs().unix() < 60 * 60) {
        openningStatus = "closing_soon";
      }
    }
  }

  return { openTime, openningStatus };
};
