const readline = require('readline');
const ContaController = require('../controller/ContaController');

class ContaView {
  constructor() {
    this.controller = new ContaController();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.conta = null;

    this.reset = "\x1b[0m";
    this.bright = "\x1b[1m";
    this.green = "\x1b[32m";
    this.yellow = "\x1b[33m";
    this.cyan = "\x1b[36m";
    this.red = "\x1b[31m";
  }

  limpar() {
    console.clear();
  }

  linha() {
    console.log(`${this.cyan}====================================${this.reset}`);
  }

  titulo(texto) {
    this.linha();
    console.log(`${this.bright}${this.yellow}  ${texto.toUpperCase()}${this.reset}`);
    this.linha();
  }

  async iniciar() {
    this.limpar();
    this.titulo("💰 SISTEMA BANCÁRIO");

    console.log(`${this.bright}1 -${this.reset} Criar conta`);
    console.log(`${this.bright}2 -${this.reset} Acessar conta`);
    console.log(`${this.red}0 -${this.reset} Sair`);

    this.rl.question(`\n${this.bright}Escolha uma opção:${this.reset} `, async (op) => {
      if (op === "1") {
        this.rl.question("Nome do titular: ", async (nome) => {
          this.conta = await this.controller.criarConta(nome);
          this.limpar();
          this.titulo("✅ Conta criada com sucesso!");
          console.log(`Titular: ${this.bright}${this.conta.titular}${this.reset}`);
          console.log(`ID: ${this.green}${this.conta.id}${this.reset}`);
          this.aguardarEnter();
        });
      } else if (op === "2") {
        this.rl.question("Digite o ID da conta: ", async (id) => {
          try {
            this.conta = await this.controller.acessarConta(Number(id));
            this.menu();
          } catch (e) {
            console.log(`\n${this.red}❌ ${e.message}${this.reset}`);
            setTimeout(() => this.iniciar(), 2000);
          }
        });
      } else if (op === "0") {
        this.sair();
      } else {
        console.log(`${this.red}Opção inválida!${this.reset}`);
        setTimeout(() => this.iniciar(), 1000);
      }
    });
  }

  menu() {
    this.limpar();
    this.titulo(`Olá, ${this.conta.titular}`);
    
    console.log(`${this.bright}1 -${this.reset} Depositar`);
    console.log(`${this.bright}2 -${this.reset} Sacar`);
    console.log(`${this.bright}3 -${this.reset} Ver saldo`);
    console.log(`${this.red}0 -${this.reset} Sair`);

    this.rl.question(`\n${this.bright}Opção:${this.reset} `, async (op) => {
      try {
        switch (op) {
          case "1":
            this.rl.question("\nValor para depósito: R$ ", async (v) => {
              try {
                const valor = this.validarValor(v);
                await this.conta.depositar(valor);
                console.log(`${this.green}✅ Depósito realizado com sucesso!${this.reset}`);
              } catch (e) {
                console.log(`${this.red}❌ ${e.message}${this.reset}`);
              }
              this.aguardarEnter();
            });
            break;

          case "2":
            this.rl.question("\nValor para saque: R$ ", async (v) => {
              try {
                const valor = this.validarValor(v);
                await this.conta.sacar(valor);
                console.log(`${this.green}✅ Saque realizado com sucesso!${this.reset}`);
              } catch (e) {
                console.log(`${this.red}❌ ${e.message}${this.reset}`);
              }
              this.aguardarEnter();
            });
            break;

          case "3":
            this.limpar();
            this.titulo("EXTRATO");
            console.log(`Saldo atual: ${this.bright}${this.green}R$ ${Number(this.conta.verSaldo()).toFixed(2)}${this.reset}`);
            this.aguardarEnter();
            break;

          case "0":
            this.iniciar();
            break;

          default:
            console.log(`${this.red}Opção inválida!${this.reset}`);
            setTimeout(() => this.menu(), 1000);
        }
      } catch (e) {
        console.log(`${this.red}❌ ${e.message}${this.reset}`);
        this.aguardarEnter();
      }
    });
  }

  aguardarEnter() {
    this.rl.question(`\n[Pressione ${this.bright}ENTER${this.reset} para continuar]`, () => {
      this.menu();
    });
  }

  sair() {
    console.log(`\n${this.cyan}Encerrando sistema... Até logo !${this.reset}`);
    this.rl.close();
    process.exit(0);
  }

  validarValor(valor) {
    const numero = Number(valor.replace(',', '.')); // Aceita vírgula também
    if (isNaN(numero) || numero <= 0) {
      throw new Error("Digite um valor numérico válido.");
    }
    return numero;
  }
}

module.exports = ContaView;