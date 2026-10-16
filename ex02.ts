export {};

const nomeDigitado: string = ' maria da silva ';
function formatarNome(nome: string): string {
  // trim tira espaços das pontas; split separa palavras; filter remove espaços vazios.
  const palavras = nome.trim().split(' ').filter(Boolean);
  const preposicoes = ['da', 'de', 'do'];
  // map ajusta cada palavra; as preposições ficam minúsculas no meio do nome.
  return palavras.map((palavra, i) => {
    const min = palavra.toLowerCase();
    if (i > 0 && preposicoes.includes(min)) return min;
    return min[0].toUpperCase() + min.slice(1);
  }).join(' ');
}

const precoLido = '12.40';
const quantidadeLida = '3un';
const preco = Number(precoLido); // Converte todo o texto numérico para number.
const quantidade = parseInt(quantidadeLida, 10); // Lê o inteiro inicial: 3.
const clienteFidelidade: boolean = true;
const subtotal = preco * quantidade;
// O desconto é 5% do subtotal quando o cliente é fiel; senão, é zero.
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const total = subtotal - desconto;
const numeroCupom = String(42).padStart(6, '0'); // Completa à esquerda com zeros.

// Template string com crases permite interpolar valores e fazer várias linhas.
const cupom = `CUPOM Nº ${numeroCupom}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;
console.log(cupom);
