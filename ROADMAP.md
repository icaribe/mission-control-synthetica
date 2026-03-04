# ROADMAP.md

## Visão Geral
Este documento descreve o roadmap formal do **Mission Control**, alinhado ao estado atual do repositório GitHub e às necessidades do projeto **Synthética**. Cada sprint inclui metas claras, entregáveis e indicadores de sucesso.

---

## Sprint 1 – CI/CD & Testes Automatizados
- **Objetivo:** Implementar pipeline CI/CD robusta e cobertura de testes ≥ 80 %.
- **Tarefas:**
  - Adicionar GitHub Actions para lint, type‑checking e testes unitários.
  - Integrar `pytest` com cobertura (`pytest-cov`).
  - Configurar badge de cobertura no README.
- **Entregáveis:** 
  - Workflow `ci.yml` em `.github/workflows/`.
  - Badge de cobertura no `README.md`.
- **Critério de conclusão:** Todas as alterações aprovadas em PR e cobertura mínima de 80 %.

---

## Sprint 2 – Integração PostgreSQL & Persistência de Memória
- **Objetivo:** Consolidar a camada de persistência e tornar a dashboard em tempo real.
- **Tarefas:**
  - Refatorar módulo `db.py` para abstrair conexões.
  - Criar scripts de migração (Alembic) para versionamento de esquema.
  - Sincronizar arquivos `memory/*.md` com a dashboard via API.
- **Entregáveis:**
  - Pacote `db/` com funções CRUD.
  - Documentação de uso na wiki.
- **Critério de conclusão:** Dashboard exibe memórias recentes sem refresh manual.

---

## Sprint 3 – UI/UX da Taskboard & Internacionalização
- **Objetivo:** Melhorar a experiência de usuário e suportar português e inglês.
- **Tarefas:**
  - Reestruturar UI da Taskboard (uso de TailwindCSS ou similar).
  - Implementar toggle de idioma (`pt` / `en`).
  - Traduzir strings existentes e atualizar documentação.
- **Entregáveis:**
  - Novo layout responsivo em `taskboard/`.
  - Arquivos de tradução (`locale/pt/LC_MESSAGES/messages.po`, `locale/en/...`).
- **Critério de conclusão:** Usuário pode alternar idioma e visualizar a taskboard sem bugs visuais.

---

## Sprint 4 – Extensão de Sub‑Agentes (Alerts, Commands, Queries, Updates)
- **Objetivo:** Enriquecer o ecossistema de sub‑agentes com funcionalidades avançadas.
- **Tarefas:**
  - Adicionar novos **routes** em `routing.json` (ex.: “feedback”, “survey”).
  - Implementar lógica de prioridade baseada em pesos de palavras‑chave.
  - Atualizar `router.py` para suportar expressões regulares e fallback inteligente.
- **Entregáveis:**
  - `routing.json` versión 2 com novos campos `priority` e `regex`.
  - Testes de integração que validam roteamento correto.
- **Critério de conclusão:** Mensagens são direcionadas ao sub‑agente correto em > 95 % dos casos de teste.

---

## Sprint 5 – **Coding Sub‑Agent** (GPT‑5‑nano)
- **Objetivo:** Criar um sub‑agente dedicado à geração de código seguro e testável.
- **Tarefas:**
  1. **Configurar** `subagents/coding/config.json` (modelo `gpt-5-nano`, endpoint, chave API).
  2. **Desenvolver** `coding_agent.py`:
     - Receber mensagens via API de mensagens.
     - Formatar prompt padrão (temperatura, max_tokens).
     - Chamar API OpenAI e retornar resposta.
  3. **Implementar** cache de prompts (`memory/coding_cache.json`).
  4. **Adicionar** sandbox de execução (Docker/nsjail) para código gerado.
  5. **Documentar** uso via `EXAMPLES.md`.
- **Entregáveis:**
  - Wrapper funcional (`coding_agent.py`).
  - Configuração segura de API key.
  - Documentação de exemplos de prompt e resposta.
- **Critério de conclusão:** Usuário pode solicitar “crie uma função X” e receber código pronto para revisão.

---

## Sprint 6 – Curadoria de MEMORY.md & Long‑Term Memory
- **Objetivo:** Transformar notas diárias em memória de longo prazo estruturada.
- **Tarefas:**
  - Criar heartbeat que execute `memory_curator.py`.
  - `memory_curator.py` deve:
    - Ler arquivos `memory/YYYY‑MM‑DD.md`.
    - Extrair insights relevantes (ex.: “pede mais exemplos REST”).
    - Atualizar `MEMORY.md` com aprendizados curados.
    - Marcar entradas obsoletas para depuração após 30 dias.
  - Agendar heartbeat (ex.: a cada 6 h) via `HEARTBEAT.md`.
- **Entregáveis:**
  - Script `memory_curator.py`.
  - Linha no `HEARTBEAT.md` para disparar a curadoria.
- **Critério de conclusão:** `MEMORY.md` reflete apenas insights estratégicos e não‑obsoletos.

---

## Sprint 7 – Monitoramento, Rate‑Limiting e Segurança de Execução
- **Objetivo:** Garantir operação segura e estável em produção.
- **Tarefas:**
  - Implementar **circuit‑breaker** para chamadas à API OpenAI.
  - Definir limites de taxa (ex.: 5 req/s) e registrar métricas.
  - Revisar sandbox de código (Dockerfile, perfis de segurança).
  - Auditar logs de execução de código gerado.
- **Entregáveis:**
  - Módulo `monitoring.py` com funcionalidades de rate‑limit e alertas.
  - Docker image hardened para execução de código.
- **Critério de conclusão:** Nenhuma fuga de memória ou abuso de API em ambiente de teste.

---

## Cronograma Resumido (2 semanas)

| Dia | Sprint | Atividade Principal |
|-----|--------|----------------------|
| 1‑2 | 1 | CI/CD + testes unitários |
| 3‑5 | 2 | PostgreSQL & persistência de memória |
| 6‑8 | 3 | UI/UX Taskboard + i18n |
| 9‑11| 4 | Extensão de sub‑agentes (routes, regex) |
| 12‑13| 5 | Coding Sub‑Agent (config + wrapper) |
| 14 | 6 | Curadoria de MEMORY.md (heartbeat) |

---

## Próximos Passos Imediatos
1. **Criar `ROADMAP.md`** (concluído).  
2. **Atualizar `AGENTS.md`** com o nome do sub‑agente de codificação (`CódigoNano`).  
3. **Implementar `coding_agent.py`** baseado no `config.json` já existente.  
4. **Adicionar heartbeat** para curadoria de `MEMORY.md`.  

---  

*Este roadmap será revisado a cada sprint durante o planejamento de release.*  