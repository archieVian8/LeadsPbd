<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  <!-- <div
    id="chartTotal"></div> -->
</template>

<script>
import { ref } from 'vue'
import {api} from 'boot/axios'
import {apexChart } from 'vue3-apexcharts'

  export default {
    name : 'stackedChart',
      data(){
          return{
          data1:[12,23,14],

          series: [
          {
            name: 'Kebutuhan',
            data: [12,23,14]
          }, 
          {
            name: 'Terpenuhi',
            data: [21, 7, 25]
          }
          ],

          chartOptions: {
          chart: {
            id: 'stackedChart',
            type: 'bar',
            height: 350,
            stacked: false,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },

          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],

          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 0,
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
            },
          },
          xaxis: {
            // type: 'datetime',
            categories: ["Obat", "Pangan", "Sandang"
            ],
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
          },
          }
        },

        methods:{
          async updateChart(){

          let dataKebutuhan =[]
          let dataTerpenuhi=[]

          const payload = {
            "locId" : 1, 
          }
          console.log(payload)

          await api.post('/user/getTotalMedicineByLocationId', payload).then((response) => {
            const dataIn = response.data
            
            //dataKebutuhan=[12,13,16]
            //dataTerpenuhi=[9,10,14]
            console.log(dataIn)
            console.log(dataIn[0].TotalKebutuhanObat)
            dataKebutuhan.push(dataIn[0].TotalKebutuhanObat)
            dataTerpenuhi.push(dataIn[0].TotalTerpenuhiObat)
            //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

            ApexCharts.exec('stackedChart','updateSeries',
              [{
                name: 'Kebutuhan',
                data:dataKebutuhan
             },
             {
                name: 'Terpenuhi',
                data:dataTerpenuhi
             }])

            //  ApexCharts.exec('stackedChart','appendSeries',
            //   [{
            //     name: 'Kebutuhan1',
            //     data:[12,12]
            //  }])

          })

          await api.post('/user/getTotalFoodsByLocationId', payload).then((response) => {
            const dataIn = response.data
            
            //dataKebutuhan=[12,13,16]
            //dataTerpenuhi=[9,10,14]
            console.log(dataIn)
            console.log(dataIn[0].TotalKebutuhanPangan)
            dataKebutuhan.push(dataIn[0].TotalKebutuhanPangan)
            dataTerpenuhi.push(dataIn[0].TotalTerpenuhiPangan)
            //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

            ApexCharts.exec('stackedChart','updateSeries',
              [{
                name: 'Kebutuhan',
                data:dataKebutuhan
             },
             {
                name: 'Terpenuhi',
                data:dataTerpenuhi
             }])

            //  ApexCharts.exec('stackedChart','appendSeries',
            //   [{
            //     name: 'Kebutuhan1',
            //     data:[12,12]
            //  }])

          })

          await api.post('/user/getTotalClothingByLocationId', payload).then((response) => {
            const dataIn = response.data
            
            //dataKebutuhan=[12,13,16]
            //dataTerpenuhi=[9,10,14]
            console.log(dataIn)
            console.log(dataIn[0].TotalKebutuhanSandang)
            dataKebutuhan.push(dataIn[0].TotalKebutuhanSandang)
            dataTerpenuhi.push(dataIn[0].TotalTerpenuhiSandang)
            //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

            ApexCharts.exec('stackedChart','updateSeries',
              [{
                name: 'Kebutuhan',
                data:dataKebutuhan
             },
             {
                name: 'Terpenuhi',
                data:dataTerpenuhi
             }])

            //  ApexCharts.exec('stackedChart','appendSeries',
            //   [{
            //     name: 'Kebutuhan1',
            //     data:[12,12]
            //  }])

          })

        },

      },

      mounted() {
        this.updateChart();
  
      }

  }
</script>
