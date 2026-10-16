export {};

// Tupla nomeada: posição 1 cidade, posição 2 temperatura.
type Leitura = [cidade: string, temperatura: number];
const leituras: Leitura[] = [['Porto Velho', 34], ['Curitiba', 12], ['Manaus', 31], ['Porto Alegre', 9], ['Natal', 29]];
function extremos(temps: number[]): [number, number] {
  // Math.min/max recebem as temperaturas separadas pelo spread (...).
  return [Math.min(...temps), Math.max(...temps)];
}
for (const [cidade, temp] of leituras) console.log(`${cidade}: ${temp}°C`);
// ? torna o e-mail opcional; ...temperaturas aceita zero ou mais números.
const contatoComEmail: [nome: string, telefone: string, email?: string] = ['Ana', '(69) 99999-0000', 'ana@email.com'];
const contatoSemEmail: [nome: string, telefone: string, email?: string] = ['João', '(41) 98888-0000'];
const historico: [cidade: string, ...temperaturas: number[]] = ['Porto Velho', 22, 24, 23, 23];
// A média é a soma das temperaturas dividida pela quantidade delas.
const [cidadeHistorico, ...tempsHistorico] = historico;
const media = tempsHistorico.reduce((s, t) => s + t, 0) / tempsHistorico.length;
const [minima, maxima] = extremos(leituras.map(([, t]) => t));
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // Erro: tupla readonly não pode ser alterada.
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);
console.log(`Contatos: ${contatoComEmail[0]} e ${contatoSemEmail[0]}; histórico: ${cidadeHistorico}; capital: ${capitalOficial[1]}`);
