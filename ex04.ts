export {};

type Item = { nome: string; preco: number; quantidade: number };
// Item[] é uma lista de objetos com as três propriedades indicadas no tipo Item.
const itens: Item[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];
// map transforma cada item; filter seleciona; reduce acumula um único total.
const nomes: string[] = itens.map((i) => i.nome);
const caros = itens.filter((i) => i.preco > 10);
const total: number = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Higiene'); // Erro: push não existe em readonly.
// number[][] é uma matriz: cada array interno representa uma prateleira.
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]]; // Matriz: lista de listas.
const totalDespensa = despensa.reduce((s, prateleira) => s + prateleira.reduce((a, n) => a + n, 0), 0);
const [primeiro, segundo] = itens; // Desestruturação pega os dois primeiros.
// ... (spread) copia os itens para uma lista nova; a lista original permanece igual.
const listaComExtra = [...itens, { nome: 'Ovos', preco: 15, quantidade: 1 }]; // spread copia.

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((i) => i.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${totalDespensa}`);
console.log(`Primeiros: ${primeiro.nome}, ${segundo.nome}; cópia tem ${listaComExtra.length}, original ${itens.length}`);
