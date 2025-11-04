# 🏥 Sistema de Agendamento Médico

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-yellow?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-enabled-blue?logo=docker)](https://www.docker.com/)
[![React Query](https://img.shields.io/badge/React%20Query-5.0.0-orange?logo=reactquery)](https://tanstack.com/query/v5)

Sistema de **agendamento médico**, construído com **React + TypeScript + Vite**, com **Tailwind CSS** para estilização, **React Query** para controle das requisições, e **MSW** para mocks de API.  
Suporte completo a **Docker**.

---

## 🎬 Demonstração

Caso queira ver o sistema sem precisar rodar o docker poderá acessar através desse link: https://sistema-agendamento-liga.netlify.app/

---

## ✨ Funcionalidades

- Listar **especialidades** e **convênios**.  
- Ver **disponibilidade de horários** filtrando por especialidade, data e médico (opcional).  
- **Agendar consultas** médicas.  
- Listar agendamentos realizados.  
- Marcar agendamento como **atendido**.  
- Interface **moderna, simples e responsiva**.  
- Mock API com **MSW** para desenvolvimento offline.  
- Suporte completo a **Docker** (dev e produção).  

---

## ⚡ Tecnologias

- **Frontend:** React + TypeScript + Vite  
- **Estilização:** Tailwind CSS + Ant Design  
- **Gerenciamento de requisições:** React Query  
- **Mock API:** MSW (Mock Service Worker)  
- **Containerização:** Docker / Docker Compose  
- **Lint & Formatação:** ESLint + Prettier  

---

## 🐳 Executando com Docker (Desenvolvimento)

1. Certifique-se de ter [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.
2. Na raiz do projeto, rode:

```bash
docker-compose up --build
``` 

3. abra o navegador: http://localhost:5173




## 🧩 Como rodar o projeto localmente

1. Clonar o repositório

```bash
    git clone https://github.com/huilde/desafio-tecnico-liga.git
    cd desafio-tecnico-liga
```

2.  Instalar dependências 
```bash
    npm install
```

- 3️⃣ Rodar em modo desenvolvimento
```bash
    npm run dev
```

- Abra no navegador: http://localhost:5173


## 🧩 Configuração do Projeto
- MSW (Mock API): As chamadas da API são interceptadas em mocks/handlers.ts, permitindo testar funcionalidades offline.

- React Query: Gerencia o estado das chamadas à API, mesmo mocks, com caching e refetch automático.

- Tailwind CSS: Estilização moderna com utilitários, responsiva e de fácil manutenção.

- ESLint + Prettier: Padronização de código e identação automática, integrado ao VSCode.
