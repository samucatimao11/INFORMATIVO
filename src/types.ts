export interface InformativoData {
  dataDaAtividade: string;
  frente: string;
  setor: string;
  operacao: string;
  equipamentos: string[];
  caminhao: string[];
  areaVivencia: string;
  areaTotal: number | string;
  areaRealizado: number | string;
  areaARealizar: number | string;
  recomendacao: string;
  sequencias: string;
  turnoA: number | string;
  obsTurnoA: string;
  turnoB: number | string;
  obsTurnoB: string;
  turnoC: number | string;
  obsTurnoC: string;
}
