export {};

// O tipo do objeto está escrito diretamente: cada propriedade tem seu tipo.
const paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00', nome: 'Ana Souza', idade: 34, plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'João Souza', telefone: '(69) 99999-0000' },
};
// ? marca propriedades opcionais; readonly impede alterar o CPF depois de criado.
const paciente2: typeof paciente = {
  cpf: '987.654.321-00', nome: 'Carlos Lima', idade: 61, plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  // ?. acessa somente se existir; ?? usa o texto padrão quando for undefined.
  const alergias = p.alergias?.join(', ') ?? 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${p.alergias ? `Alergias: ${alergias}` : alergias}`;
}
console.log(resumo(paciente));
console.log(resumo(paciente2));

// Erro TS2540: cpf é readonly e não pode ser alterado.
// paciente.cpf = '000.000.000-00';
// Erro TS2339: propriedade peso não foi declarada no tipo.
// paciente.peso = 70;
let dados: object = paciente;
// dados.nome dá TS2339: object não declara que a propriedade nome existe.
// {} aceita qualquer valor não nulo/undefined; object (minúsculo) aceita apenas objetos.
// Object (maiúsculo) representa métodos comuns e também aceita primitivos; prefira tipos específicos.
const x: {} = 10;
// let y: object = 10; // TS2322: number não pode ser atribuído a object.
// let z: Object = 10; // Aceito, mas Object é genérico demais para este caso.
console.log(`CPF cadastrado: ${paciente.cpf}; dado é ${typeof dados}; x=${x}`);
