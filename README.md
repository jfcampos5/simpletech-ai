# SimpleTech AI
> Projeto educacional com **Next.js + TypeScript** que aplica **IA** para simplificar conteúdos técnicos — com foco em **usabilidade**, **produtividade** e evolução para o ecossistema **Microsoft Azure**.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)
![Build](https://img.shields.io/badge/build-GitHub%20Actions-lightgrey)

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Execução (Dev)](#execução-dev)
  - [Build (Prod)](#build-prod)
- [Configuração](#configuração)
- [Exemplos de Uso](#exemplos-de-uso)
- #testes
- [Estilo de Commits & Versionamento](#estilo-de-commits--versionamento)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Boas Práticas & Segurança](#boas-práticas--segurança)
- [Licença](#licença)
- #contato
- [Referências](#referências)

----
## Visão Geral
O **SimpleTech AI** é um projeto educacional que demonstra como utilizar **Modelos de Linguagem** (LLMs) para **simplificar conteúdo técnico**, produzir resumos didáticos e apoiar o aprendizado. A base tecnológica é **Next.js + TypeScript**, com preparação para integrar **serviços de IA no Azure** (ex.: Azure OpenAI, Cognitive Services).

**Por que usar?**
- **Educacional:** mostra o passo a passo de uma aplicação prática de IA.
- **Moderno:** usa o App Router do Next.js, TypeScript, testes e CI.
- **Flexível:** arquitetura preparada para plugar provedores (Azure/OpenAI/HuggingFace).

---
## Funcionalidades
- 🔎 **Resumo & simplificação:** transforma textos técnicos em versões mais acessíveis.
- 🧠 **Agentes de fluxo (MVP):** pipeline simples *plan → execute → refine*.
- 🔌 **Integração Azure (planejada):** Azure OpenAI / Cognitive Services / Storage.
- 🛡️ **Privacidade & controle:** variáveis de ambiente, logs configuráveis.

---

## Arquitetura
```
simpletech-ai/
├─ src/
│  ├─ app/               # Rotas (App Router do Next.js)
│  │  ├─ page.tsx        # Página principal
│  │  └─ api/            # Handlers de API (ex.: /api/simplify)
│  ├─ components/        # Componentes de UI
│  ├─ lib/               # Serviços/clients (ex.: Azure/OpenAI)
│  ├─ styles/            # Estilos
│  └─ types/             # Tipos/DTOs
├─ public/               # Assets estáticos
├─ tests/                # Testes unitários/integração
├─ .env.example          # Modelo de variáveis de ambiente
├─ package.json
└─ README.md
````
---

## Começando

### Pré-requisitos
- **Node.js ≥ 18**
- **pnpm** (recomendado) ou **npm**
- (Opcional) **Docker 24+**

### Instalação
```bash
git clone https://github.com/jfcampos5/simpletech-ai.git
cd simpletech-ai
pnpm install
````
----
pnpm dev
Acesse: http://localhost:3000

Build (Prod)

pnpm build && pnpm start

----
### Configuração
Crie .env.local:
````
AZURE_OPENAI_ENDPOINT=https://<seu-endpoint>.openai.azure.com/
AZURE_OPENAI_API_KEY=<sua-chave>
AZURE_OPENAI_DEPLOYMENT_NAME=<nome-do-deployment>
AZURE_OPENAI_API_VERSION=2024-10-01-preview
NEXT_PUBLIC_APP_NAME=SimpleTech AI
LOG_LEVEL=info
````
----
### Exemplos de Uso
API — simplificação de texto técnico
````
POST /api/simplify
Content-Type: application/json

{
  "text": "Especificação do protocolo TLS 1.3...",
  "style": "didático"
}
`````
Resposta:

{ "summary": "Explica o TLS 1.3 passo a passo...", "tokens": 1024 }

---

### ✅ **Parte 4 — Testes, Commits, Roadmap e Licença**
```markdown
## Testes
```bash
pnpm test
pnpm test:coverage
````
----
Estilo de Commits & Versionamento
Usamos Conventional Commits:

feat(api): adicionar endpoint
fix(ui): corrigir bug
docs(readme): atualizar instruções

----
###Roadmap

 Integração Azure OpenAI
 Módulo “Explain Like I’m 5”
 Exportação PDF/Docx
 Painel de auditoria/logs
 Testes E2E (Playwright)

----
###Contribuição

Fork
Branch: git checkout -b feat/minha-ideia
Commits padronizados
PR com descrição clara

----

###Licença
MIT — veja LICENSE.

----
###Contato

Joelma Campos

Issues: https://github.com/jfcampos5/simpletech-ai/issues

----

###Referências

GitHub Docs — About READMEs

Conventional Commits




