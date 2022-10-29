import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as HighCharts from 'highcharts';
import { Observable } from "rxjs";
import { LeituraAguaReportParams } from "../../../../model/leitura-agua.model";
import { UserParamsAuth } from "../../../../model/user.model";
import { LocalStorageService } from "../../../../service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['../../../../../assets/css/default.scss']
})
export class BarChartCompoent implements OnInit, OnChanges {
  @Input() chartData: LeituraAguaReportParams[]

  public user: UserParamsAuth;
  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem('user'));
  }

  ngOnInit() {
    this.prepareChartData(this.chartData)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartData = changes.chartData.currentValue
    this.prepareChartData(this.chartData)
  }

  groupBy(xs, key: string): LeituraAguaReportParams[] {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  prepareChartData(data: LeituraAguaReportParams[]) {
    let series: SerieParams[] = []
    let categories: string[] = []
    let consumoTotal: number[] = []

    let sortedData = data.sort((a, b) => {
      return a.dataleitura > b.dataleitura ? 1 : -1
    })

    let groupedData = this.groupBy(sortedData, 'dataleitura')
    const keys = Object.keys(groupedData);

    keys.forEach(key => {
      const serieData = groupedData[key]
      const name: string = this.dateFull(serieData[0].mesreferencia)
      categories.push(name)

      consumoTotal.push(serieData.reduce((a, b) => a + parseInt(b.consumo), 0))
    })

    series.push({
      name: 'Consumo Total',
      data: consumoTotal
    })

    const consumeAVG = this.consumeAVG(series)
    this.columnChart(categories, series, consumeAVG)
  }

  private dateFull(date: string): string {
      const newDate = new Date(date)
      const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][newDate.getMonth()];
      const year = newDate.getFullYear();
      return `${month}/${year}`
  }

  private consumeAVG(series: SerieParams[]) {
    const consumoTotal = series[0].data
    const consumoAVG = consumoTotal.reduce((a, b) => a + b, 0) / consumoTotal.length
    return consumoAVG
  }

  columnChart(categories: string[], seriesData: SerieParams[], consumeAVG: number) {
    HighCharts.chart('columnChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Histórico Consumo de Água'
      },
      xAxis: {
        categories: categories,
        labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Consumo (m³)',
          align: 'high'
        },
        plotLines: [
          {
            value: consumeAVG,
            color: 'black',
            zIndex: 4,
            label: {
              text: `Consumo médio no período ${consumeAVG.toFixed(1)} m³`,
              align: 'right',
              y: -10,
              x: -10,
              style: {
                fontSize: '12px',
                color: 'black',
                fontWeight: 'bold'
              }
            }
          }
        ]
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