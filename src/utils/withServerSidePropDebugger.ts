import { GetServerSideProps } from "next";

const TEXT_COLOR_CODES = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

const getStringSize = (str: unknown) => Math.ceil(Buffer.byteLength(JSON.stringify(str)) / 1000);

const highLight = (value: number | string, type: "size" | "time" | "text" = "text") => {
  let colorCode = TEXT_COLOR_CODES.cyan;
  let convertedValue = `${value}`;

  if (type === "time") {
    convertedValue = `${value}(ms)`;
    if (value < 1000) colorCode = TEXT_COLOR_CODES.green;
    else if (value < 2000) colorCode = TEXT_COLOR_CODES.yellow;
    else colorCode = TEXT_COLOR_CODES.red;
  }

  if (type === "size") {
    convertedValue = `${value}(kb)`;
    if (value < 60) colorCode = TEXT_COLOR_CODES.green;
    else if (value < 128) colorCode = TEXT_COLOR_CODES.yellow;
    else colorCode = TEXT_COLOR_CODES.red;
  }
  // \x1b[0m: clear color
  return `${colorCode}${convertedValue}\x1b[0m`;
};

/**
 * To track:
 *
 * • time for loading api
 *
 * • size of data
 */
export const withServerSidePropDebugger = (callback: GetServerSideProps) => {
  const getServerSideProps: GetServerSideProps = async (context) => {
    const startTime = Date.now();
    console.log(`${context.resolvedUrl}: loading...`);

    const values = await callback(context);
    const props = (values as { props: any }).props;
    const valSizeList = Object.entries(props).map(([key, val]) => ({
      key,
      size: getStringSize(val),
    }));
    const time = Math.ceil(Date.now() - startTime);

    console.log(`${context.resolvedUrl}: loaded`);
    console.group();
    console.log(`• ${highLight("time")}:`, highLight(time, "time"));
    console.log(`• ${highLight("props")}:`, highLight(getStringSize(props), "size"));
    console.group();
    valSizeList.forEach(({ key, size }) =>
      console.log(`•  ${highLight(key)}:`, highLight(size, "size"))
    );
    console.groupEnd();
    console.groupEnd();

    return values;
  };

  return getServerSideProps;
};
