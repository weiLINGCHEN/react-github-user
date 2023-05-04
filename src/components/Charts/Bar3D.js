import React from "react";

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Bar3d = ({ data }) => {
  const chartConfigs = {
    type: "bar2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Folks",
        subCaption: "having the most folks",
        xAxisName: "Repos",
        yAxisName: "Folks",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",
        theme: "fusion",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Bar3d;
