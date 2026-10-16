export {};

type Placa = string;
type Periodo = [entrada: number, saida: number];
// Aliases dão nomes reutilizáveis a tipos; cada variante tem seu próprio campo tipo.
// tipo identifica a variante e informa quais propriedades de veículo existem.
type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;
enum SituacaoTicket { Aberto = 'ABERTO', Pago = 'PAGO' }
type Ticket = { veiculo: Veiculo; periodo: Periodo; selo: boolean; situacao: SituacaoTicket; valor?: number };
function calcularTarifa(v: Veiculo, horas: number): number {
  // A primeira hora tem tarifa fixa; adicionais são cobrados conforme o tipo.
  const adicionais = Math.max(0, horas - 1);
  switch (v.tipo) {
    case 'carro': return 8 + adicionais * 5;
    case 'moto': return 4 + adicionais * 2;
    case 'caminhao': return 15 + adicionais * 10;
    default: { const _naoTratado: never = v; return _naoTratado; }
  }
}
// Se Van entrar na união sem um case, v deixa de ser never: a verificação acusa omissão.
// type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
// type VeiculoComVan = Carro | Moto | Caminhao | Van;
// Para testar, use VeiculoComVan no parâmetro de calcularTarifa sem adicionar case 'van'.
// Erro no default: TS2322 — Type 'Van' is not assignable to type 'never'.
function fecharTicket(t: Ticket): Ticket {
  // O spread cria outro ticket, preservando o original e atualizando valor/situação.
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  const cheio = calcularTarifa(t.veiculo, horas);
  return { ...t, valor: t.selo ? cheio * 0.5 : cheio, situacao: SituacaoTicket.Pago };
}
function registrar(msg: string): void { console.log(msg); }
function falhar(mensagem: string): never { throw new Error(mensagem); }
function lerVeiculo(json: string): Veiculo {
  // JSON externo começa como unknown e só é aceito após validar tipo e propriedades.
  let dado: unknown;
  try { dado = JSON.parse(json) as unknown; } catch { return falhar('JSON malformado'); }
  if (typeof dado !== 'object' || dado === null || !('tipo' in dado) || !('placa' in dado)) return falhar('dados do veículo inválidos');
  if (typeof dado.placa !== 'string') return falhar('placa inválida');
  if (dado.tipo === 'carro' && 'portas' in dado && (dado.portas === 2 || dado.portas === 4)) return { placa: dado.placa, tipo: 'carro', portas: dado.portas };
  if (dado.tipo === 'moto' && 'cilindradas' in dado && typeof dado.cilindradas === 'number') return { placa: dado.placa, tipo: 'moto', cilindradas: dado.cilindradas };
  if (dado.tipo === 'caminhao' && 'eixos' in dado && typeof dado.eixos === 'number') return { placa: dado.placa, tipo: 'caminhao', eixos: dado.eixos };
  if (dado.tipo !== 'carro' && dado.tipo !== 'moto' && dado.tipo !== 'caminhao') return falhar(`tipo "${String(dado.tipo)}" desconhecido`);
  return falhar('dados do veículo inválidos');
}
const veiculos: Veiculo[] = [
  { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 },
  { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, { placa: 'XYZ4E56', tipo: 'carro', portas: 2 },
];
const periodos: Periodo[] = [[8, 11], [9, 10], [7, 12], [14, 16]];
const selos = [false, false, false, true];
const tickets: Ticket[] = veiculos.map((veiculo, i) => ({ veiculo, periodo: periodos[i], selo: selos[i], situacao: SituacaoTicket.Aberto }));
const fechados = tickets.map(fecharTicket);
const pagos = fechados.filter((t) => t.situacao === SituacaoTicket.Pago);
// map imprime; reduce soma faturamento e conta veículos por categoria.
pagos.map((t) => {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  registrar(`[PAGO] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horas}h - R$ ${t.valor!.toFixed(2)}${t.selo ? ' (selo -50%)' : ''}`);
});
const faturamento = pagos.reduce((s, t) => s + (t.valor ?? 0), 0);
const entradas = pagos.reduce((c, t) => { c[t.veiculo.tipo]++; return c; }, { carro: 0, moto: 0, caminhao: 0 });
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);
console.log(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);
try { lerVeiculo('{"placa":"BIC1234","tipo":"bicicleta"}'); } catch (erro: unknown) {
  if (erro instanceof Error) console.log(`Erro ao ler veículo: ${erro.message}`);
}
