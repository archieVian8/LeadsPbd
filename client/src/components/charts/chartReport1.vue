<template>
    <apexchart  height="300" type="line" :options="options" :series="series"></apexchart>
    <div>
        <button @click="updateChart">refresh</button>
    </div>
  
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { getCssVar } from 'quasar'
//   import VueApexCharts from 'vue-apexcharts'
  import { api } from 'boot/axios'
  
  
  export default defineComponent({
    name: 'current-line',
    data () {
      return {
        options: {
          title: {
            text: 'Motor 1 Current ',
            align: 'left'
          },
          chart: {
            id: 'current-line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          colors: [getCssVar('primary'), getCssVar('secondary'), getCssVar('negative')],
          markers: {
            size: 4,
            hover: {
              sizeOffset: 6
            }
          },
          // xaxis: {
          //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          // }
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            min: 0,
            max: 10,
            // tickAmount: 4,
          },
          fill:{
            type: 'gradient'
          },
          dataLabels: {
            enabled: true,
          },
          theme: {
            palette: 'palette7' // upto palette10
          },
          tooltip: {
            enabled: true,
            followCursor: true,
            intersect: false,
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              //console.log(w)
              let pdate = new Date(w.globals.labels[dataPointIndex]).toISOString()
              pdate = pdate.replace("T"," ")
              pdate = pdate.substring(0,pdate.length-5)
              const tipResult =
              '<div class= "header_box">'+pdate + '</div>' +
              '<div class="value_box">'+series[seriesIndex][dataPointIndex] + '</div>'
  
              return tipResult
            }
          }
        },    // end of options
        series: [{
          name: 'Pressure Value',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        }]
      }
    },
  
    methods:{
      convertDateTime(dateInput){
        let dateStr = dateInput.replace(" ","T")
        dateStr = dateStr +"Z"
        //console.log(dateInput)
        //console.log(dateStr)
        return dateStr
      },
  
      async updateChart(){
        //console.log("update chart")
        await api.get('/getLastTen').then ((response)=>{
          // console.log(response)
          const dataIn = response.data
          //console.log(dataIn)
          let dataInArr=[]
  
          // loop to construct data array
          dataIn.forEach(element => {
            if (element.sensorName == 'S7_1200:pm1200_current'){
              let valueObj =
              {
                x: this.convertDateTime(element.sensorRcvDate),
                y: element.sensorValue
              }
              dataInArr.push(valueObj)
            }
          })
          // console.log(dataInArr)
  
          ApexCharts.exec('current-line','updateSeries',
              [{
                data:dataInArr
             }])
  
        })
  
      }
  
    },
  
    mounted() {
       setInterval(function () {
        this.updateChart();
      }.bind(this), 5000);
    }
  
  })
  </script>
  
  <style>
    .header_box {
      position: relative;
      background: rgb(245, 227, 87);
      padding: 2px;
      border: 2px solid #080808;
    }
    .value_box {
      position: relative;
      background: rgb(231, 230, 237);
      padding: 2px;
      border: 2px solid #080808;
    }
  
  
  </style>