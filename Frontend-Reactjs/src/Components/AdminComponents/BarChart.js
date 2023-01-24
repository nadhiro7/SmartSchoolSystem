import React from "react";
import ReactApexChart from "react-apexcharts";

// export default class BarChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.theme = props.theme;
//     this.state = {
//       series: [
//         {
//           name: "number",
//           data: props.data,
//         },
//       ],
//       options: {
//         chart: {
//           height: 350,
//           type: "bar",
//           responsive: [
//             {
//               breakpoint: 480,
//               options: {
//                 legend: {
//                   position: "bottom",
//                   offsetX: -10,
//                   offsetY: 0,
//                 },
//               },
//             },
//           ],
//         },
//         plotOptions: {
//           bar: {
//             borderRadius: 7,
//             dataLabels: {
//               position: "top", // top, center, bottom
//             },
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           formatter: function (val) {
//             return val;
//           },
//           offsetY: -20,
//           style: {
//             fontSize: "12px",
//             colors: [props.theme.palette.text.primary],
//           },
//         },

//         xaxis: {
//           categories: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ],
//           position: "top",
//           axisBorder: {
//             show: false,
//           },
//           axisTicks: {
//             show: false,
//           },
//           crosshairs: {
//             fill: {
//               type: "gradient",
//               gradient: {
//                 colorFrom: props.theme.palette.grey[400],
//                 colorTo: props.theme.palette.grey[200],
//                 stops: [0, 100],
//                 opacityFrom: 0.4,
//                 opacityTo: 0.5,
//               },
//             },
//           },
//           tooltip: {
//             enabled: true,
//           },
//         },
//         yaxis: {
//           axisBorder: {
//             show: false,
//           },
//           axisTicks: {
//             show: false,
//           },
//           labels: {
//             show: false,
//             formatter: function (val) {
//               return val;
//             },
//           },
//         },
//         title: {
//           text: "Monthly New Parent, 2022",
//           floating: true,
//           offsetY: 330,
//           align: "center",
//           style: {
//             color: props.theme.palette.text.primary,
//           },
//         },
//       },
//     };
//   }

//   render() {
//     return (
//       <div id="chart">
//         <ReactApexChart
//           options={this.state.options}
//           series={this.state.series}
//           type="bar"
//           height={350}
//         />
//       </div>
//     );
//   }
// }
// import React from 'react'

function BarChart(props) {
  const theme = props.theme;
  const [state, setState] = React.useState({
    series: [
      {
        name: "number",
        data: props.data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
      },
      plotOptions: {
        bar: {
          borderRadius: 7,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: [props.theme.palette.text.primary],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: props.theme.palette.grey[400],
              colorTo: props.theme.palette.grey[200],
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: "Monthly New Parent, 2022",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: props.theme.palette.text.primary,
        },
      },
    },
  });
  React.useEffect(() => {
    setState({
      ...state,
      series: [
        {
          name: "number",
          data: props.data,
        },
      ],
    });
  }, [props.data]);
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default BarChart;
