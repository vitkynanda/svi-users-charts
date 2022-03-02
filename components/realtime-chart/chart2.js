import React, { useEffect, useRef, useState } from "react";
import MindFusion from "mindfusion-common";
import $ from "jquery";
import * as Charting from "chart-library";

const RealtimeChart = () => {
  const el = useRef(null);
  const [rawData, setRawData] = useState({
    chart: {},
    data: [],
  });

  const updateStock = (rawData) => {
    const json = fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=demo"
    );

    // (json) => {
    //   let times = json["Time Series (1min)"];

    //   let update = false;

    //   if (rawData?.chart?.series?.length > 0) update = true;
    //   for (let time in times) {
    //     let stock_info = times[time];

    //     let dataItem = new Charting.StockPrice(
    //       stock_info["1. open"],
    //       stock_info["4. close"],
    //       stock_info["3. low"],
    //       stock_info["2. high"],
    //       new Date(time)
    //     );

    //     if (!update) setRawData({ ...rawData, data: dataItem });
    //     else {
    //       setRawData({ ...rawData, data: [...rawData.data, ...dataItem] });
    //       const values = [...rawData.data];
    //       values.shift();
    //       setRawData({ ...rawData, data: values });

    //       break;
    //     }
    //   }

    //   let series = new Charting.StockPriceSeries(rawData.data);
    //   series.dateTimeFormat = Charting.DateTimeFormat.ShortTime;

    //   let data = new Charting.Collections.ObservableCollection();
    //   data.add(series);

    //   rawData.chart.series = data;
    //   rawData.chart.draw();
    // }
  };

  useEffect(() => {
    let stockChart = new Charting.Controls.CandlestickChart(el.current);
    stockChart.title = "The Big Corporation";
    stockChart.theme.titleFontSize = 16;
    stockChart.candlestickWidth = 12;
    stockChart.showLegend = false;
    stockChart.showXCoordinates = false;
    stockChart.xAxisLabelRotationAngle = 30;
    stockChart.xAxis.minValue = 0;
    stockChart.xAxis.interval = 1;
    stockChart.xAxis.maxValue = 40;
    stockChart.xAxis.title = "Time";
    stockChart.yAxis.title = "Price";
    stockChart.gridType = Charting.GridType.Horizontal;
    stockChart.theme.gridColor1 = new Charting.Drawing.Color("#ffffff");
    stockChart.theme.gridColor2 = new Charting.Drawing.Color("#fafafa");
    stockChart.theme.gridLineColor = new Charting.Drawing.Color("#cecece");
    stockChart.theme.gridLineStyle = Charting.Drawing.DashStyle.Dash;
    stockChart.plot.seriesStyle = new Charting.CandlestickSeriesStyle(
      new Charting.Drawing.Brush("#ff2f26"),
      new Charting.Drawing.Brush("#00b140"),
      new Charting.Drawing.Brush("#2e2e2a"),
      2,
      Charting.Drawing.DashStyle.Solid,
      stockChart.plot.seriesRenderers.item(0)
    );

    stockChart.theme.axisLabelsBrush =
      stockChart.theme.axisTitleBrush =
      stockChart.theme.axisStroke =
        new Charting.Drawing.Brush("#2e2e2e");
    stockChart.theme.highlightStroke = new Charting.Drawing.Brush("#cecece");

    let dataList = new Charting.Collections.List();

    let intervalId = setInterval(() => updateStock(rawData), 60000);
    setRawData({
      chart: stockChart,
      data: dataList,
      intervalId: intervalId,
    });
    updateStock(rawData);
  }, [rawData]);
  return (
    <div>
      <canvas width="1000px" height="800px" ref={el}></canvas>
    </div>
  );
};

export default RealtimeChart;
