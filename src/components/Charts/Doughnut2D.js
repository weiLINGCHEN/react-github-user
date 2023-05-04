import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars per language",
        subCaption: "saved by other users in their list of Starred Repos.",

        bgColor: "#ffffff",
        startingAngle: "310",
        showLegend: "1",
        defaultCenterLabel: "Stars",
        centerLabel: "$value stars",
        centerLabelBold: "0",
        showTooltip: "1",
        decimals: "0",
        theme: "fusion",
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
