# Plano de Aperfeiçoamento do Mission Control

## Visão Geral
Documento que descreve as etapas para elevar o Mission Control a um sistema mais robusto, baseado no estágio atual do repositório GitHub e no roadmap do projeto.

## Objetivos
1. **Codificação e Automação** – Criar wrapper para a API GPT‑5‑nano e disponibilizar um sub‑agente de codificação.
2. **Roteamento Inteligente** – Implementar módulo de roteamento de mensagens entre agentes.
3. **Monitoramento e Reporting** – Gerar dashboards de uso e curadoria de memórias.
4. **Documentação** – Manter AGENTS.md, ROADMAP.md e MEMORY.md sempre atualizados.

## Etapas (Sprints)

| Sprint | Duração | Principais Tarefas |
|--------|---------|--------------------|
| **Sprint 1** | 1 semana | - Criar sub‑agente *Architect*<br>- Desenvolver `router.py` e `routing.json`<br>- Gerar `IMPROVEMENT_PLAN.md` |
| **Sprint 2** | 2 semanas | - Implementar `coding_agent.py` (wrapper da API GPT‑5‑nano)<br>- Testar geração de código<br>- Integrar ao painel |
| **Sprint 3** | 1 semana | - Atualizar `AGENTS.md` com novos sub‑agentes<br>- Adicionar heartbeat para curadoria de `MEMORY.md` |
| **Sprint 4** | 1 semana | - Deploy final no Railway<br>- Documentar processos e versionar entregáveis |

## Roadmap (ROADMAP.md)
- **Sprint 1** – Setup de arquitetura e plano de ação.  
- **Sprint 2** – Codificação e integração da API GPT‑5‑nano.  
- **Sprint 3** – Roteamento inteligente e monitoramento de memórias.  
- **Sprint 4** – Finalização, release e documentação completa.

## Métricas de Sucesso
- Redução de ~30 % no tempo de resposta de tarefas de codificação.  
- 90 % das mensagens roteadas para o sub‑agente correto.  
- Documentação 100 % versionada e revisada.

## Próximos Passos
- Revisar este plano com Igor e definir prioridades.  
- Alocar recursos de desenvolvimento conforme necessidade.  
- Iniciar a implementação das sprints conforme cronograma.
