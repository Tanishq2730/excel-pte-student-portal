import React, { useEffect, useState, useRef } from "react";
import { Chart } from "primereact/chart";
import ReactApexChart from "react-apexcharts";
import "chart.js/auto";
import { ApexOptions } from "apexcharts";
import { graphData } from "../../api/performanceAPI";

interface ProgressProps {
  progressBars: {
    speakingAvg: number;
    writingAvg: number;
    readingAvg: number;
    listeningAvg: number;
    // all detailed sub metrics:
    ReadAloudAvg: number;
    RespondtoSituationAvg: number;
    AnswerShortQuestionAvg: number;
    Re_tellLectureAvg: number;
    DescribeImageAvg: number;
    RepeatSentenceAvg: number;

    WriteEssayAvg: number;
    WriteEmailAvg: number;
    SummarizeWrittenTextAvg: number;

    MC_SelectSingleAnswerAvg: number;
    ReadingandWritingFillintheBlanksAvg: number;
    ReadingFillintheBlanksAvg: number;
    Re_orderParagraphsAvg: number;
    MC_SelectMultipleAnswerAvg: number;

    HighlightCorrectSummaryAvg: number;
    FillintheBlanksAvg: number;
    SelectMissingWordAvg: number;
    HighlightIncorrectWordsAvg: number;
    WritefromDictationAvg: number;
    SummarizeSpokenTextAvg: number;
  };
}

interface AvgLast7DaysResponse {
  status: boolean;
  dataLast7Days: {
    totalCount: number;
    AvgLast7Days: number[];
  };
}

const Progress: React.FC<ProgressProps> = ({ progressBars }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Speaking");
  const [stackedChart, setStackedChart] = useState<any>({ labels: [], datasets: [] });
  const [stackedOptions, setStackedOptions] = useState<any>({});
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [lineChartOptions, setLineChartOptions] = useState<any>({});
 
  // Categories
  const categories = ["Speaking", "Writing", "Reading", "Listening"];

  const donutSeries = [
    progressBars?.speakingAvg || 0,
    progressBars?.writingAvg || 0,
    progressBars?.readingAvg || 0,
    progressBars?.listeningAvg || 0,
  ];

  // Detailed data mapping
  const detailDataMap: Record<string, { [key: string]: number }> = {
    Speaking: {
      "Read Aloud": progressBars.ReadAloudAvg || 0,
      "Respond to Situation": progressBars.RespondtoSituationAvg || 0,
      "Answer Short Question": progressBars.AnswerShortQuestionAvg || 0,
      "Re-tell Lecture": progressBars.Re_tellLectureAvg || 0,
      "Describe Image": progressBars.DescribeImageAvg || 0,
      "Repeat Sentence": progressBars.RepeatSentenceAvg || 0,
    },
    Writing: {
      "Write Essay": progressBars.WriteEssayAvg || 0,
      "Write Email": progressBars.WriteEmailAvg || 0,
      "Summarize Written Text": progressBars.SummarizeWrittenTextAvg || 0,
    },
    Reading: {
      "MC Select Single Answer": progressBars.MC_SelectSingleAnswerAvg || 0,
      "Reading & Writing Fill in the Blanks":
        progressBars.ReadingandWritingFillintheBlanksAvg || 0,
      "Reading Fill in the Blanks": progressBars.ReadingFillintheBlanksAvg || 0,
      "Re-order Paragraphs": progressBars.Re_orderParagraphsAvg || 0,
      "MC Select Multiple Answer": progressBars.MC_SelectMultipleAnswerAvg || 0,
    },
    Listening: {
      "Highlight Correct Summary": progressBars.HighlightCorrectSummaryAvg || 0,
      "Fill in the Blanks": progressBars.FillintheBlanksAvg || 0,
      "Select Missing Word": progressBars.SelectMissingWordAvg || 0,
      "Highlight Incorrect Words": progressBars.HighlightIncorrectWordsAvg || 0,
      "Write from Dictation": progressBars.WritefromDictationAvg || 0,
      "Summarize Spoken Text": progressBars.SummarizeSpokenTextAvg || 0,
    },
  };

  // Create bar chart data for selected category
  const createBarChartData = () => {
    const details = detailDataMap[selectedCategory];
    return {
      labels: Object.keys(details),
      datasets: [
        {
          label: selectedCategory + " Details",
          backgroundColor: "#42A5F5", // or dynamically pick color
          data: Object.values(details),
        },
      ],
    };
  };

  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);

  const barChartRef = useRef<any>(null); // Ref to Chart component

  const onBarChartClick = (event: React.MouseEvent<HTMLDivElement>) => {
  if (!barChartRef.current) return;

  const chartInstance = barChartRef.current.getChart();
  if (!chartInstance) return;

  // Chart.js expects native MouseEvent from canvas, so we manually create one
  // Use event.nativeEvent and also adjust coordinates for the canvas element

  // Get canvas bounding rect to convert div click coordinates to canvas coordinates
  const canvas = barChartRef.current.container.querySelector('canvas');
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  // Calculate the mouse event relative to canvas top-left
  const canvasEvent = new MouseEvent('click', {
    clientX: event.clientX,
    clientY: event.clientY,
    bubbles: true,
    cancelable: true,
    view: window,
  });

  // Use Chart.js method with original event coordinates translated to canvas coords
  // But Chart.js getElementsAtEventForMode needs native event coordinates, so 
  // override event's offsetX and offsetY relative to canvas

  // So we use the original nativeEvent but offset relative to canvas
  // We'll create a custom object mimicking nativeEvent with offsetX and offsetY adjusted

  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Chart.js uses nativeEvent.offsetX and offsetY internally
  // So we can create a fake nativeEvent object with offsetX/offsetY
  // However, getElementsAtEventForMode expects a real event, so simplest is to patch nativeEvent

  const patchedNativeEvent = Object.create(event.nativeEvent);
  Object.defineProperty(patchedNativeEvent, 'offsetX', { get: () => offsetX });
  Object.defineProperty(patchedNativeEvent, 'offsetY', { get: () => offsetY });

  const points = chartInstance.getElementsAtEventForMode(
    patchedNativeEvent,
    "nearest",
    { intersect: true },
    false
  );

  if (points.length) {
    const firstPoint = points[0];
    const label = chartInstance.data.labels[firstPoint.index];
    console.log("Clicked subtype:", label);
  }
};
  const fetchLineChartData = async (category: string) => {
  try {
    console.log(category);
    
     const typeMapping: Record<string, { type_id: number; subtype_id: number }> = {
      Speaking: { type_id: 1, subtype_id: 4 },
      Writing: { type_id: 2, subtype_id: 5 },
      Reading: { type_id: 3, subtype_id: 6 },
      Listening: { type_id: 4, subtype_id: 7 },
    };

    const payload = typeMapping[category] || { type_id: 1, subtype_id: 4 };

    // const payload = { type_id: 1, subtype_id: 4 };
    const response = graphData(payload) as unknown as AvgLast7DaysResponse;

    if (response?.status) {
      const values = response?.dataLast7Days?.AvgLast7Days;
      const labels = values.map((_, i) => `Day ${i + 1}`);

      setLineChartData({
        labels,
        datasets: [
          {
            label: `${category} Progress Over Time`,
            data: values,
            fill: false,
            borderColor: "#42A5F5",
            tension: 0.4,
          },
        ],
      });

      const documentStyle = getComputedStyle(document.documentElement);
      setLineChartOptions({
        plugins: {
          legend: {
            labels: {
              color: documentStyle.getPropertyValue("--text-color"),
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: documentStyle.getPropertyValue("--text-color-secondary"),
            },
            grid: {
              color: documentStyle.getPropertyValue("--surface-border"),
            },
          },
          y: {
            ticks: {
              color: documentStyle.getPropertyValue("--text-color-secondary"),
            },
            grid: {
              color: documentStyle.getPropertyValue("--surface-border"),
            },
            beginAtZero: true,
            max: 100,
          },
        },
      });
    } else {
      console.warn("Invalid or empty response from API");
    }
  } catch (err) {
    console.error("Error fetching line chart data", err);
  }
};


  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    setStackedOptions({
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          beginAtZero: true,
          max: 100,
        },
      },
    });
  }, []);

  useEffect(() => {
    setStackedChart(createBarChartData());
  }, [selectedCategory, progressBars]);

  useEffect(() => {
    fetchLineChartData(selectedCategory);
  }, [selectedCategory]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      events: {
        dataPointSelection: async (_event, chartContext, config) => {
          const index = config.dataPointIndex;
          const selected = categories[index];
          if (selected) {
            setSelectedCategory(selected);
            // await fetchLineChartData(selected);
          }
        },
      },
    },
    labels: categories,
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        return opts.w.config.series[opts.seriesIndex].toFixed(1);
      },
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val.toFixed(1);
        },
      },
    },
    legend: {
      position: "right",
    },
  };

  const chartSeries = donutSeries;

 return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Progress Overview</div>
          </div>
          <div className="card-body">
            <ReactApexChart options={chartOptions} series={donutSeries} type="donut" height={350} />
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{selectedCategory} Details Report</div>
          </div>
          <div className="card-body">
            <Chart type="bar" data={stackedChart} options={stackedOptions} style={{ height: "300px" }} ref={barChartRef} />
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            {lineChartData ? (
              <Chart type="line" data={lineChartData} options={lineChartOptions} style={{ height: "300px" }} />
            ) : (
              <div>Loading line chart...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
