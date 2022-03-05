import { CondominoParams } from "./condomino.model"

export type LeituraAguaParams = {
  id?: number
  dataLeitura: string
  dataVencimento: string
  condomino: CondominoParams
}