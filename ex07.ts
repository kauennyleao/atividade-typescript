export {};

type Notificador = (destinatario: string, mensagem: string) => void;
// Notificador define o formato das funções que podem ser passadas como callback.
const porEmail: Notificador = (d, m) => console.log(`[E-MAIL] para ${d}: ${m}`);
const porSms: Notificador = (d, m) => {
  // return sem valor encerra a função cedo quando o SMS excede o limite.
  if (m.length > 160) { console.log('SMS ignorado: mensagem longa'); return; }
  console.log(`[SMS] para ${d}: ${m}`);
};
const porApp: Notificador = (d, m) => console.log(`[APP] para ${d}: ${m}`);
function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  // forEach chama a função enviar uma vez para cada destinatário.
  destinatarios.forEach((d) => enviar(d, mensagem));
}
// void: função termina sem devolver valor. return vazio encerra antes do fim.
// function teste(): void { return 10; } // Erro: função void não retorna um número.
// const contar: Notificador = (d, m) => m.length; // Permitido: quem chama ignora o retorno.
notificarTodos(['ana@escola.com'], 'Reunião de pais sexta às 19h', porEmail);
notificarTodos(['joao.resp'], 'Reunião de pais sexta às 19h', porApp);
notificarTodos(['(69) 99999-0000'], 'Aviso: '.padEnd(161, 'a'), porSms);
