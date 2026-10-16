export {};

// A anotação após : define qual tipo de valor a variável pode guardar.
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;
const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;
// Sem anotação, o TypeScript deduz boolean a partir do valor true.
const aberta = true; // Inferido pelo TypeScript: boolean.

// Cada subtotal é preço vezes quantidade; o total soma os dois subtotais.
const subtotal1 = precoUnitario1 * quantidade1;
const subtotal2 = precoUnitario2 * quantidade2;
const total = subtotal1 + subtotal2;
const paesNoAno = 1_250_000; // O separador _ facilita a leitura e não muda o valor.
const categoriaPanificacao = 0x1A; // O prefixo 0x indica hexadecimal; aqui vale 26 em decimal.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesNoAno}`);
console.log(`Categoria: ${categoriaPanificacao}`);

// Erro TS2322: string não pode ser atribuída a number.
// quantidade1 = 'doze';
