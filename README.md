# SimpleTech AI

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3.20-00C7B7?logo=supabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)

---

## Status do Projeto

Este projeto está em **desenvolvimento ativo** 🚀  

Isso significa que:
- Funcionalidades podem mudar, ser adicionadas ou removidas  
- A estrutura pode evoluir conforme o projeto cresce  
- Feedbacks e sugestões são altamente bem-vindos  

> ⚠️ **Observação:** Não é recomendado usar este projeto em produção neste momento.

---

## Descrição

**SimpleTech AI** é um projeto de bot inteligente que aprende sobre novos temas dinamicamente, armazenando informações em um banco de dados Supabase e respondendo perguntas de usuários de forma clara e objetiva.

O objetivo do projeto é explicar tecnologias de maneira simples, interativa e escalável.

---

---

## Índice

1. [Status do Projeto](#status-do-projeto)
2. [Descrição](#descricao)
3. [Funcionalidades](#funcionalidades)  
4. [Arquitetura do Projeto](#arquitetura-do-projeto)  
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Fluxo de Dados (Visão Geral)](#fluxo-de-dados-visao-geral)
7. [Estrutura do Banco de Dados 1](#estrutura-do-banco-de-dados)
8. [Estrutura do Banco de Dados 2](#estrutura-do-banco-de-dados-2)
9. [Instalação e Configuração](#instalacao-e-configuracao)  
10. [Como Usar](#como-usar)
11. [Feature Requests](#feature-requests)
12. [Contribuição](#contribuicao)
13. [Contato](#contato)
14. [Suporte e Issues](#suporte-e-issues)
15. [Licença](#licenca)  

---

---

## Funcionalidades

- Aprendizado dinâmico de novos temas  
- Armazenamento de dados no Supabase  
- Consulta inteligente por tema  
- Arquitetura escalável  
- Base preparada para evolução futura (quase IA)
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

## Estrutura do Banco de Dados 1

Tabela: `temas`

| Coluna      | Tipo      | Descrição |
|------------|-----------|-----------|
| `id`       | UUID      | Identificador único do tema |
| `nome`     | text      | Nome do tema (ex: “JavaScript”) |
| `descricao`| text      | Breve descrição do tema |
| `criado_em`| timestamp | Data de criação do tema |

Tabela: `informações`

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

## Estrutura do Banco de Dados 2

```
| Coluna      | Tipo      | Descrição                       |
| ----------- | --------- | ------------------------------- |
| `id`        | UUID      | Identificador único do tema     |
| `nome`      | text      | Nome do tema (ex: “JavaScript”) |
| `descricao` | text      | Breve descrição do tema         |
| `criado_em` | timestamp | Data de criação do tema         |
````
----

## Tabela: informacoes

```
| Coluna      | Tipo      | Descrição                                      |
| ----------- | --------- | ---------------------------------------------- |
| `id`        | UUID      | Identificador único da informação              |
| `tema_id`   | UUID      | Referência ao tema correspondente (`temas.id`) |
| `conteudo`  | text      | Conteúdo ou resposta sobre o tema              |
| `criado_em` | timestamp | Data de criação da informação                  |
````
----

## Instalação e Configuração

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

## Como Usar

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

## Feature Requests

Quer sugerir uma nova funcionalidade ou melhoria?

Utilize o template de Feature Request disponível nas Issues do projeto.
Isso ajuda a manter as sugestões organizadas e facilita a avaliação.

👉 [Criar Feature Request](https://github.com/jfcampos5/simpletech-ai/issues/new/choose)

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

[LinkedIn](https://www.linkedin.com/in/joelma-campos-50a7277b/)

---

## Suporte e Issues

Encontrou um problema ou tem uma sugestão?  
Abra uma issue no GitHub:

👉 [Issues do projeto](https://github.com/jfcampos5/simpletech-ai/issues)

---

## Licença

Este projeto está licenciado sob a MIT License.

---
