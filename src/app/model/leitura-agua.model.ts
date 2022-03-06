import { CondominoParams } from "./condomino.model"

export type LeituraAguaParams = {
  id?: string
  dataleitura: string
  datavencimento: string
  condominio: number | string
}