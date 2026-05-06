const Conta = require('../model/Conta');

class ContaController {

  async criarConta(titular) {
    return await Conta.criarConta(titular);
  }

  async acessarConta(id) {
    return await Conta.buscarConta(id);
  }

}

module.exports = ContaController;