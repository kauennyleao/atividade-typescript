export {};

// Enum numérico: valores sequenciais; strings: valores fixos para pagamentos.
enum StatusPedido { Recebido = 1, EmPreparo, SaiuParaEntrega, Entregue, Cancelado }
enum FormaPagamento { Pix = 'PIX', Cartao = 'CARTAO', Dinheiro = 'DINHEIRO' }
// switch escolhe uma mensagem conforme o valor atual do enum.
function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido: return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo: return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega: return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue: return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado: return 'Seu pedido foi cancelado.';
  }
}
function avancar(status: StatusPedido): StatusPedido {
  // Só os três primeiros estados avançam; Entregue e Cancelado permanecem iguais.
  if (status === StatusPedido.Recebido) return StatusPedido.EmPreparo;
  if (status === StatusPedido.EmPreparo) return StatusPedido.SaiuParaEntrega;
  if (status === StatusPedido.SaiuParaEntrega) return StatusPedido.Entregue;
  return status;
}
let status = StatusPedido.Recebido;
while (true) {
  // Enum numérico permite o mapeamento reverso número -> nome.
  console.log(`[${status} - ${StatusPedido[status]}] ${mensagem(status)}`);
  if (status === StatusPedido.Entregue) break;
  status = avancar(status);
}
const pagamento: FormaPagamento = FormaPagamento.Pix;
// let pagamentoErrado: FormaPagamento = 'PIX'; // Erro: use FormaPagamento.Pix, não string.
console.log(`Pagamento: ${pagamento}`);
