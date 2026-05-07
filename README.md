# 💰 Sistema de Conta Bancária

Sistema bancário simples desenvolvido em JavaScript utilizando arquitetura MVC (Model-View-Controller), persistência de dados com MySQL, testes unitários com Jest e pipeline de Integração Contínua (CI) com GitHub Actions.

---

# 📌 Funcionalidades

- Criar conta bancária
- Depositar valores
- Sacar valores
- Consultar saldo
- Persistência de dados no MySQL

---

# 🛠️ Tecnologias Utilizadas

- JavaScript (Node.js)
- MySQL
- Jest
- GitHub Actions

---

# ⚙️ Configuração e Execução do Projeto

## 1️. Clonar o repositório

```bash
git clone https://github.com/damasceno635/Sistema_Bancario.git
```

---

## 2️. Instalar dependências

```bash
npm install
```

---

# 3. Configuração do Banco de Dados

## Criar banco

```sql
CREATE DATABASE banco;
USE banco;
```

---

## Criar tabela

```sql
CREATE TABLE contas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titular VARCHAR(100),
    saldo DECIMAL(10,2)
);
```

---

# 4. Executar o Projeto

```bash
npm start
```

---

# 🧪 Executar Testes

```bash
npm test
```

---

# 🔄 Integração Contínua (CI)

O projeto utiliza GitHub Actions para:

- Instalar dependências automaticamente
- Executar testes unitários
- Impedir merge em caso de falha
