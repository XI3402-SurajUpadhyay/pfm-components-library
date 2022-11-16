import {
  RenderSunburstChart,
  SunburstChartProps,
} from "../../../Library/SunburstChart";
import {
  fetchSunburstChartData,
  FetchConfig,
} from "../../../api-service/api-calls";

export type Config = {
  endpoint: string;
  payload: Object;
  width: number;
  targetId: string;
};

const defaultConfig = {
  endpoint: "https://api.xpsapps.xebia.com/api/v2/transaction/searchSA",
  payload: {
    filterList: [
      {
        filterType: "CustIdFilter",

        filterValues: ["3019"],
      },
    ],
  },
  width: 600,
  targetId: "sunburst-chart",
};

export const Sunburst = async (config: Config = defaultConfig) => {
  if (
    !config ||
    typeof config !== "object" ||
    !config.endpoint ||
    !config.targetId
  ) {
    const e =
      "config structure is not as defined: " + JSON.stringify(defaultConfig);
    console.log(e);
    throw new Error(e);
  }

  const fetchConfig: FetchConfig = {
    endpoint: config.endpoint,
    payload: config.payload,
  };

  const res: any = await fetchSunburstChartData(fetchConfig);

  console.log("suraj");
  console.log(res);

  let _config: SunburstChartProps = {
    data: res.data,
    width: config.width,
    targetId: config.targetId,
  };
  RenderSunburstChart(_config);
};

