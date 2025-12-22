# SimpleTech AI

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3.20-00C7B7?logo=supabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)

**Descrição:**  
SimpleTech AI é um projeto de bot inteligente que aprende sobre novos temas dinamicamente, armazenando informações em um banco de dados Supabase e respondendo perguntas de usuários de forma clara e objetiva. O projeto é ideal para explicar tecnologias de maneira simples, interativa e escalável.

---

## Índice

1. [Funcionalidades](#funcionalidades)  
2. [Arquitetura do Projeto](#arquitetura-do-projeto)  
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
4. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)  
5. [Instalação e Configuração](#instalacao-e-configuracao)  
6. [Como Usar](#como-usar)  
7. [Contribuição](#contribuicao)  
8. [Licença](#licenca)  

---

## Funcionalidades

- Aprendizado dinâmico de novos temas pelo bot  
- Armazenamento de temas e informações no Supabase  
- Busca de informações por tema para responder perguntas dos usuários  
- Estrutura escalável para adicionar novas funcionalidades futuramente  

---

## Arquitetura do Projeto

````
SimpleTech AI
│
├─ backend/
│   ├─ supabaseClient.js       # Configuração do Supabase
│   ├─ temas.js                # Funções para gerenciar temas
│   └─ informacoes.js          # Funções para gerenciar informações
│
├─ frontend/
│   ├─ pages/                  # Páginas do bot ou interface web
│   └─ components/             # Componentes de interface
│
└─ README.md
`````


---

## Tecnologias Utilizadas

- **Node.js / Next.js** → Backend e frontend do bot  
- **Supabase** → Banco de dados e API REST para armazenar temas e informações  
- **JavaScript** → Lógica do bot e integração com a Supabase  

---

## Fluxo de Dados (Visão Geral)

<img width="600" height="800" alt="diagrama_fluxo" src="https://github.com/user-attachments/assets/5c6a0035-ceec-472d-a06f-d5b9abe5ad41" />

1. **Usuário:** Pode ensinar novos temas ao bot (aprendizado) ou fazer perguntas sobre temas já conhecidos (consulta).  
2. **Bot:** Processa as entradas do usuário.  
   - Para ensinar um novo tema → bot insere o tema e suas informações no banco de dados Supabase.  
   - Para consultar informações → bot busca dados no Supabase e responde ao usuário.  
3. **Supabase:** Armazena dados e retorna informações ao bot para que ele responda ao usuário.

---

## Estrutura do Banco de Dados

### Tabela: `temas`

| Coluna      | Tipo      | Descrição |
|------------|-----------|-----------|
| `id`       | UUID      | Identificador único do tema |
| `nome`     | text      | Nome do tema (ex: “JavaScript”) |
| `descricao`| text      | Breve descrição do tema |
| `criado_em`| timestamp | Data de criação do tema |

### Tabela: `informacoes`

| Coluna     | Tipo      | Descrição |
|-----------|-----------|-----------|
| `id`      | UUID      | Identificador único da informação |
| `tema_id` | UUID      | Referência ao tema correspondente (`temas.id`) |
| `conteudo`| text      | Conteúdo ou resposta sobre o tema |
| `criado_em`| timestamp| Data de criação da informação |

---

## Instalação e Configuração

1. **Clonar o projeto**
```bash
git clone https://github.com/seuusuario/simpletech-ai.git
cd simpletech-ai
````

----

## Estrutura do Banco de Dados

```
| Coluna      | Tipo      | Descrição                       |
| ----------- | --------- | ------------------------------- |
| `id`        | UUID      | Identificador único do tema     |
| `nome`      | text      | Nome do tema (ex: “JavaScript”) |
| `descricao` | text      | Breve descrição do tema         |
| `criado_em` | timestamp | Data de criação do tema         |
````
----
### Tabela: informacoes
```
| Coluna      | Tipo      | Descrição                                      |
| ----------- | --------- | ---------------------------------------------- |
| `id`        | UUID      | Identificador único da informação              |
| `tema_id`   | UUID      | Referência ao tema correspondente (`temas.id`) |
| `conteudo`  | text      | Conteúdo ou resposta sobre o tema              |
| `criado_em` | timestamp | Data de criação da informação                  |
````
----

### Instalação e Configuração

1 - Clonar o projeto
```
git clone https://github.com/seuusuario/simpletech-ai.git
cd simpletech-ai
````
2 - Instalar dependências
```
npm install
````
3 - Configurar Supabase

* Criar um projeto no Supabase

* Criar as tabelas temas e informacoes conforme a estrutura acima

* Criar o arquivo supabaseClient.js com a URL e chave anônima do Supabase:
```
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'SUA_SUPABASE_URL';
const supabaseKey = 'SUA_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
````
4 - Executar o projeto
```
npm run dev
```
----
### Como Usar

1 - Inserir novos temas:
```
await adicionarTema("JavaScript", "Linguagem de programação usada em sites");
````
2 - Adicionar informações a um tema:
```
await adicionarInformacao(tema_id, "JavaScript é usado para criar páginas interativas.");
````
3 - Buscar informações de um tema:
```
const dados = await buscarInformacoes(tema_id);
console.log(dados);
````
4 - Integrar ao bot para responder perguntas dinamicamente com base nos dados armazenados.

----
## Contribuição

Contribuições são bem-vindas!

* Faça um fork do projeto

* Crie uma branch (git checkout -b feature/nova-funcionalidade)

* Faça commit das alterações (git commit -m 'Adiciona nova funcionalidade')

* Envie o pull request (git push origin feature/nova-funcionalidade)

---
## Contato

Joelma Campos

Issues: https://github.com/jfcampos5/simpletech-ai/

---
## Licença

Este projeto está licenciado sob a MIT License.

---
