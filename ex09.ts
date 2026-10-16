export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json); // any desativa a checagem de tipos.
  console.log(dados.temperatura.toFixed(1));
}
function falhar(mensagem: string): never { throw new Error(mensagem); } // nunca retorna normalmente.
type Clima = { cidade: string; temperatura: number };
function lerClima(json: string): Clima {
  let dados: unknown; // unknown exige validação antes do uso.
  try { dados = JSON.parse(json) as unknown; } catch { return falhar('JSON malformado'); }
  // typeof, null e in confirmam que o JSON é objeto e contém os campos esperados.
  if (typeof dados !== 'object' || dados === null || !('cidade' in dados) || !('temperatura' in dados)) return falhar('dados inválidos');
  if (typeof dados.cidade !== 'string') return falhar('campo "cidade" inválido');
  if (typeof dados.temperatura !== 'number') return falhar('campo "temperatura" inválido');
  return { cidade: dados.cidade, temperatura: dados.temperatura };
}
function mostrarClima(json: string): void {
  try {
    const clima = lerClima(json);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    // Só se lê message depois de confirmar que o valor capturado é um Error.
    if (erro instanceof Error) console.log(`Erro: ${erro.message}`);
    else console.log('Erro desconhecido');
  }
}
try { lerComAny(respostaQuebrada); } catch (erro: unknown) {
  // Com any, erro aparece em execução: temperatura.toFixed is not a function.
  if (erro instanceof Error) console.log(`Demonstração any: erro em execução (${erro.message})`);
}
mostrarClima(respostaOk);
mostrarClima(respostaQuebrada);
mostrarClima(respostaInvalida);
