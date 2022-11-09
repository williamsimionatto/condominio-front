import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as HighCharts from 'highcharts';
import { Observable } from "rxjs";
import { CashFlowParams } from "../../../../model/cash-flow.model";
import { LeituraAguaReportParams } from "../../../../model/leitura-agua.model";
import { UserParamsAuth } from "../../../../model/user.model";
import { LocalStorageService } from "../../../../service";

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
    let categories: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let seriesNames: any[] = [
      {
        name: 'Receitas',
        field: 'total_income'
      },
      {
        name: 'Despesas',
        field: 'total_expense'
      },
      {
        name: 'Saldo',
        field: 'balance'
      }
    ]

    let series: SerieParams[] = seriesNames.map(serie => {
      return {
        name: serie.name,
        data: []
      }
    })

    for (let i = data.length -1; i >= 0; i--) {
      let item = data[i]

      seriesNames.forEach(serieName => {
        let serie = series.find(s => s.name === serieName.name)
        serie.data.push(item[serieName.field])
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
  name?: string,
  data: number[]
}
