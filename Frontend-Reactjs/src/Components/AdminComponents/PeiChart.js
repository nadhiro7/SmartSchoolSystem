import React from 'react';
import ReactApexChart from 'react-apexcharts';

// export default class PeiChart extends React.Component
// {
//     constructor ( props )
//     {
//         super( props );
//         console.log(props.numbers)
//         this.state = {

//             series: props.numbers,
//             options: {
//                 chart: {
//                     width: 300,
//                     type: 'pie',
//                 },
//                 labels: props.keys,
//                 color: [ props.theme.palette.text.primary ],
//                 responsive: [ {
//                     breakpoint: 480,
//                     options: {
//                         chart: {
//                             width: 300
//                         },
//                         legend: {
//                             position: 'bottom'
//                         }
//                     }
//                 } ]
//             },


//         };
//     }



//     render ()
//     {
//         return (


//             <div id="chart">
//                 <ReactApexChart options={ this.state.options } series={ this.state.series } type="pie" width={ 380 } />
//             </div>


//         );
//     }
// }
function PeiChart(props) {
    const [states,setStates] = React.useState({series: props.numbers,
            options: {
                chart: {
                    width: 300,
                    type: 'pie',
                },
                labels: props.keys,
                color: [ props.theme.palette.text.primary ],
                responsive: [ {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                } ]
            },}) 
            React.useEffect(() => {
                setStates({ ...states, series: props.numbers });
            }, [props.numbers]);
  return (
    <div id="chart">
                <ReactApexChart options={ states.options } series={ states.series } type="pie" width={ 380 } />
    </div>
  )
}

export default PeiChart