# Youtan

## 🔧 Como rodar o Backend

O backend desse projeto foi feito com [json-server](https://github.com/typicode/json-server).

### 📝 Pré-requisitos

- Ter o **Node.js** instalado (versão 14 ou superior).
- npm (gerenciador de pacotes que já vem com o Node).

### ▶️ Rodando o Backend

1. Abra o terminal.
2. Navegue até a pasta do backend.

```bash
cd CRUD-To-Do-List/Backend
```

3. Rode o comando **npm start**.

# 🔧 Subindo a aplicação Frontend

### 📝 Pré-requisitos

- Ter o **Node.js** instalado (versão 14 ou superior).
- npm (gerenciador de pacotes que já vem com o Node).

### ▶️ Rodando o Frontend

1. Abra o terminal.
2. Navegue até a pasta do frontend.
   
```bash
cd CRUD-To-Do-List/Frontend
```

3. Rode o comando **yarn** para instalar as dependências e pacotes.
4. Rode o comando **yarn dev** para buildar a aplicação.

Será criado 2 url's locais, uma para acessar a web e a outra mobile.

Exemplo:

**Local:** *http://localhost:4200/account/login*

**Network**: *http://192.168.15.8:4200/account/login*

**Observações**: A aplicação não tem autenticação para o login é apenas exibição. Então poderá realizar o seu login com qualquer **CPF** válido e qualquer senha.






# 📄 Documentação de Decisões Técnicas (DDT)  
## Projeto: CRUD de Tarefas - Angular 19  
**Data de início:** 30/05/2026
**Data final:** 02/06/2025

---

### 🧱 1. Framework Front-end  
**Decisão:** Angular 19.

**Motivo:** Familiaridade com o framework e recursos robustos para desenvolvimento SPA.

---

### 🗂️ 2. Estrutura do Projeto  
**Decisão:** Estrutura modular com Lazy Loading.

**Motivo:** Organização mais clara do código, separando funcionalidades em módulos distintos. Lazy loading melhora desempenho inicial da aplicação.  

---

### 🔗 3. Requisições HTTP  
**Decisão:** Uso do HttpClient. 

**Motivo:** Solução oficial e integrada, com suporte a interceptors, observables, e tratamento de erros.

---

### 🔄 4. Reatividade e Estado  
**Decisão:** Utilizado `signal()` do Angular (Angular Core Signals).

**Motivo:**  Signals são mais simples, com melhor performance e integração direta com o Angular. 

---

### 🧾 5. Formulários  
**Decisão:** Uso do FormBuilder com Reactive Forms.

**Motivo:**  Mais controle sobre as validações e melhor escalabilidade.  

---

### 🎨 6. Layout e Estilização  
**Decisão:** Angular Material + SCSS puro. 

**Motivo:** Material traz componentes prontos e responsivos. SCSS facilita a organização do estilo com variáveis, mixins e estrutura modular.  

---

### 🗃️ 7. Backend e Armazenamento  
**Decisão:** JSON.SERVER como API fake.  

**Motivo:**  Permite simular um backend REST de forma rápida e leve para desenvolvimento local.  

---

### ✅ Considerações Finais  
Essa documentação será atualizada conforme novas decisões forem tomadas no decorrer do projeto. O objetivo é manter a rastreabilidade técnica e justificar cada escolha feita no código.
