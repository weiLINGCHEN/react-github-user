import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Pie3d = ({ data }) => {
  const chartConfigs = {
    type: "pie3d",
    width: "100%",
    height: "100%",
    caption: "languages",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Languages",
        subCaption: "the percentage of languages in the user repos",
        numberPrefix: "$",
        showPercentInTooltip: "0",
        decimals: "1",
        useDataPlotColorForLabels: "1",
        theme: "fusion",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Pie3d;
