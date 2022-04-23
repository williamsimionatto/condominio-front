import { Component, Input, OnInit } from "@angular/core";
import * as HighCharts from 'highcharts';
import { LeituraAguaReportParams } from "../../../../model/leitura-agua.model";
import { UserParamsAuth } from "../../../../model/user.model";
import { LocalStorageService } from "../../../../service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['../../../../../assets/css/default.scss']
})
export class BarChartCompoent implements OnInit {
  @Input() chartData: LeituraAguaReportParams

  public user: UserParamsAuth;
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(this.localStorageService.getItem('user'));
    this.prepareChartData(this.chartData)
  }

  prepareChartData(data: LeituraAguaReportParams) {
    if (this.user.perfil.sigla === 'ADMIN' || this.user.perfil.sigla === 'SIND') {
      this.prepareSindicatoChartData(data)
    }
  }

  prepareSindicatoChartData(data: LeituraAguaReportParams) {
    console.log(data)
  }

  barChart() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
      }]
    });
  }

}