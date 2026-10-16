export {};

type Tamanho = 'P' | 'M' | 'G' | 'GG';
// União de tipos literais: somente esses quatro tamanhos são aceitos.
const codigo: number | string = 'CLI-0042';
const camiseta: Tamanho = 'M';
// const tamanhoInvalido: Tamanho = 'XG'; // Erro: XG não faz parte dos tamanhos.
function formatarCodigo(c: number | string): string {
  // typeof estreita a união para escolher a conversão correta.
  const numero = typeof c === 'number' ? c : Number(c.replace(/^CLI-/, ''));
  return `CLI-${String(numero).padStart(4, '0')}`;
}
function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte': return 25;
    case 'nordeste': return 20;
    case 'centro-oeste': return 18;
    case 'sudeste': return 12;
    case 'sul': return 15;
  }
}
const complemento: string | null = null;
// null representa a ausência do complemento; ?? escolhe o texto alternativo.
const endereco = `Rua das Flores, 100 - ${complemento ?? '(sem complemento)'}`;
function limparTelefone(tel: string | number): string { return String(tel).replace(/\D/g, ''); }
// const mantém o literal 'sul'; let vira string mais geral. as const preserva o literal.
const r = 'sul'; calcularFrete(r);
let r2 = 'sul' as const; calcularFrete(r2);
console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: ${endereco}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
