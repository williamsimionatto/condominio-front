import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as HighCharts from 'highcharts';
import { CashFlowParams } from "../../../../model/cash-flow.model";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['../../../../../assets/css/default.scss']
})
export class BarChartCompoent implements OnInit, OnChanges {
  @Input() chartData: CashFlowParams[]

  ngOnInit() {
    this.prepareChartData(this.chartData)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartData = changes.chartData.currentValue
    this.prepareChartData(this.chartData)
  }

  prepareChartData(data: CashFlowParams[]) {
    data.sort((a: CashFlowParams, b: CashFlowParams) => {
      return parseInt(a.id) - parseInt(b.id)
    })

    let categories: string[] = data.map(d => d.name)
    let seriesNames: any[] = [
      {
        name: 'Receitas',
        field: 'total_income'
      },
      {
        name: 'Despesas',
        field: 'total_expense'
      }, {
        name: 'Saldo',
        field: 'balance'
      }
    ]

    let series: SerieParams[] = seriesNames.map(serie => {
      return {
        name: serie.name,
        type: serie.field === 'balance' ? 'spline' : 'column',
        data: []
      }
    })

    series[2].marker = {
      lineWidth: 2,
      lineColor: HighCharts.getOptions().colors[2],
      fillColor: 'white'
    }

    for (let i = 0; i < data.length; i++) {
      let item = data[i]

      seriesNames.forEach(serieName => {
        let serie = series.find(s => s.name === serieName.name)
        serie.data.push(Math.round(item[serieName.field] * 100) / 100)
      })
    }

    this.columnChart(categories, series)
  }

  columnChart(categories: string[], series: SerieParams[]) {
    HighCharts.chart('columnChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Receitas e Despesas'
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Valor R$'
        },
      },
      credits: {
        enabled: false
      },
      series: series as HighCharts.Options['series']
    })
  }
}

export type SerieParams = {
  type: string,
  name?: string,
  data: number[],
  marker?: any
}
