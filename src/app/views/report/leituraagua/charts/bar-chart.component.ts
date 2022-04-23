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
  @Input() chartData: LeituraAguaReportParams[]

  public user: UserParamsAuth;
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(this.localStorageService.getItem('user'));
    this.prepareChartData(this.chartData)
  }

  prepareChartData(data: LeituraAguaReportParams[]) {
    if (this.user.perfil.sigla === 'ADMIN' || this.user.perfil.sigla === 'SIND') {
      this.prepareSindicoChartData(data)
    }
  }

  groupBy(xs, key: string): LeituraAguaReportParams[] {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  prepareSindicoChartData(data: LeituraAguaReportParams[]) {
    let series: SerieParams[] = []
    let categories: string[] = []
    let consumoTotal: number[] = []

    let sortedData = data.sort((a, b) => {
      return a.dataleitura > b.dataleitura ? 1 : -1
    })

    let groupedData = this.groupBy(sortedData, 'dataleitura')
    const keys = Object.keys(groupedData);

    keys.forEach(key => {
      const name: string = this.dateFull(key)
      categories.push(name)

      const serieData = groupedData[key]
      consumoTotal.push(serieData.reduce((a, b) => a + parseInt(b.consumo), 0))
    })

    series.push({
      name: 'Consumo Total',
      data: consumoTotal
    })

    this.columnChart(categories, series)
  }

  private dateFull(date: string): string {
      const newDate = new Date(date)
      const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][newDate.getMonth()];
      const year = newDate.getFullYear();
      return `${month}/${year}`
  }

  columnChart(categories: string[], seriesData: SerieParams[]) {
    HighCharts.chart('columnChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Histórico Consumo de Água'
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Consumo (m³)',
          align: 'middle'
        }
      },
      tooltip: {
        valueSuffix: ' m³'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: false
          }
        }
      },
      series: seriesData as HighCharts.Options['series']
    });
  }
}

export type SerieParams = {
  type?: string,
  name?: string,
  data: number[]
}