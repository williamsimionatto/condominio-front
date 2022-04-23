export type LeituraAguaParams = {
  id?: string
  dataleitura: string
  datavencimento: string
  condominio: number | string
}

export type LeituraAguaReportParams = {
  id: number
  dataleitura: string
  condominoName: string
  consumo: number,
  valorTotal: number,
  fileId: number,
  fileName: string
}
