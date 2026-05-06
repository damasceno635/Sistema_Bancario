const db = require('../config/db');

class Conta {
  constructor(id = null, titular = "", saldo = 0) {
    this.id = id;
    this.titular = titular;
    this.saldo = saldo;
  }

  static async criarConta(titular) {
    const [result] = await db.execute(
      "INSERT INTO contas (titular, saldo) VALUES (?, 0)",
      [titular]
    );

    return new Conta(result.insertId, titular, 0);
  }

  static async buscarConta(id) {
    const [rows] = await db.execute(
      "SELECT * FROM contas WHERE id = ?",
      [id]
    );

    if (rows.length === 0) throw new Error("Conta não encontrada");

    const c = rows[0];
    return new Conta(c.id, c.titular, c.saldo);
  }

  async depositar(valor) {
    if (valor <= 0) throw new Error("Valor inválido");

    this.saldo += valor;

    await db.execute(
      "UPDATE contas SET saldo = ? WHERE id = ?",
      [this.saldo, this.id]
    );
  }

  async sacar(valor) {
    if (valor > this.saldo) throw new Error("Saldo insuficiente");

    this.saldo -= valor;

    await db.execute(
      "UPDATE contas SET saldo = ? WHERE id = ?",
      [this.saldo, this.id]
    );
  }

  verSaldo() {
    return this.saldo;
  }
}

module.exports = Conta;