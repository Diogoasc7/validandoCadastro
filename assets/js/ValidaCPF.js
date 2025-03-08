// 705.484.450-52 070.987.720-03
// Classe responsável por validar um CPF
class ValidaCPF {
  constructor(cpfEnviado) {
    // Define uma propriedade cpfLimpo que armazena o CPF apenas com números
    Object.defineProperty(this, 'cpfLimpo', { // O método Object.defineProperty() é usado para definir uma propriedade de um objeto com características específicas, como se ela pode ser modificada, enumerada ou reconfigurada.
      writable: false,  // Não pode ser alterada depois de definida
      enumerable: true, // Pode ser acessada publicamente
      configurable: false, // Não pode ser redefinida ou deletada
      value: cpfEnviado.replace(/\D+/g, '') // Remove todos os caracteres que não sejam números
    });
  }

  // Método para verificar se o CPF é uma sequência de números repetidos, como "111.111.111-11"
  éSequência() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo; // O método .charAt(0) retorna o primeiro caractere de uma string. Se o primeiro número repetido 11 vezes for igual ao CPF, então é uma sequência
  }

  // Método para gerar um novo CPF válido baseado nos 9 primeiros dígitos do CPF recebido
  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2); // Remove os dois últimos dígitos do CPF
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos); // Calcula o primeiro dígito verificador
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1); // Calcula o segundo dígito verificador
    this.novoCPF = cpfSemDigitos + digito1 + digito2; // Concatena os 9 primeiros dígitos com os dois novos dígitos verificadores
  }

  // Método estático que gera um dígito verificador baseado nos cálculos matemáticos do CPF
  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1; // Começa do tamanho da string + 1 para fazer o cálculo

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica); // Multiplica cada número pelo seu peso correspondente
      reverso--; // Diminui o peso a cada iteração
    }

    const digito = 11 - (total % 11); // Aplica a regra do módulo 11
    return digito <= 9 ? String(digito) : '0'; // Se o dígito for maior que 9, ele deve ser 0
  }

  // Método que verifica se o CPF é válido
  valida() {
    if (!this.cpfLimpo) return false; // Se não houver CPF, retorna falso
    if (typeof this.cpfLimpo !== 'string') return false; // Se não for uma string, retorna falso
    if (this.cpfLimpo.length !== 11) return false; // Se não tiver 11 caracteres, retorna falso
    if (this.éSequência()) return false; // Se for uma sequência de números iguais, retorna falso
    this.geraNovoCpf(); // Gera um novo CPF baseado nos cálculos

    return this.novoCPF === this.cpfLimpo; // Se o CPF gerado for igual ao CPF informado, retorna verdadeiro
  }
}

// Instância da classe com um CPF para teste
let validacpf = new ValidaCPF('070.987.720-03');
// validacpf = new ValidaCPF('999.999.999-99'); // Teste com um CPF inválido

// Verifica se o CPF é válido e exibe a mensagem correspondente
/*
if (validacpf.valida()) {
  console.log('CPF válido');
} else {
  console.log('CPF inválido');
}
  */
