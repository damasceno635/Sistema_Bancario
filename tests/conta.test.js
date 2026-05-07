const Conta = require('../src/model/Conta');
const db = require('../src/config/db');

// Mock do banco
jest.mock('../src/config/db', () => ({
  execute: jest.fn()
}));

describe('Conta', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Criar conta', async () => {
    db.execute.mockResolvedValue([{ insertId: 1 }]);

    const conta = await Conta.criarConta("João");

    expect(conta.id).toBe(1);
    expect(conta.titular).toBe("João");
    expect(conta.saldo).toBe(0);
  });

  test('Depositar valor válido', async () => {
    const conta = new Conta(1, "Maria", 100);

    db.execute.mockResolvedValue([]);

    await conta.depositar(50);

    expect(conta.saldo).toBe(150);
    expect(db.execute).toHaveBeenCalled();
  });

  test('Erro ao depositar valor inválido', async () => {
    const conta = new Conta(1, "Maria", 100);

    await expect(conta.depositar(0))
      .rejects
      .toThrow("Valor inválido");
  });

  test('Sacar valor válido', async () => {
    const conta = new Conta(1, "Carlos", 200);

    db.execute.mockResolvedValue([]);

    await conta.sacar(50);

    expect(conta.saldo).toBe(150);
  });

  test('Erro ao sacar sem saldo', async () => {
    const conta = new Conta(1, "Carlos", 50);

    await expect(conta.sacar(100))
      .rejects
      .toThrow("Saldo insuficiente");
  });

  test('Ver saldo', () => {
    const conta = new Conta(1, "Ana", 300);
    expect(conta.verSaldo()).toBe(300);
  });

});