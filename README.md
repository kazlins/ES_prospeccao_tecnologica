# Prospecção Tecnológica: Engenharia do Caos Impulsionada por IA

Universidade Federal de Lavras (UFLA)  
GCC188 - Engenharia de Software  
*Curso*: Ciência da Computação  
Professor: Antonio Maria Pereira de Resende  
Estudante: Karyna Morais Lins  

Este repositório contém a Prova de Conceito (PoC) desenvolvida para o trabalho de Prospecção Tecnológica sobre Engenharia do Caos com Inteligência Artificial, comparando a abordagem tradicional estática com a tomada de decisão dinâmica assistida por agentes de IA.

## Proposta do Projeto
A Engenharia do Caos tradicional baseia-se em engenheiros humanos a definir e a agendar manualmente testes de falha na infraestrutura. Esta prospecção propõe um modelo inovador: Engenharia do Caos Impulsionada por IA, onde um agente inteligente analisa a topologia do sistema de forma contínua, identifica pontos únicos de falha (Single Points of Failure) e gera dinamicamente os manifestos de caos (YAML do LitmusChaos) mais eficientes para testar a resiliência do ecossistema.

## Estrutura da PoC (Prova de Conceito)
Para facilitar a demonstração e execução, a PoC foi unificada em uma aplicação web integrada, composta por duas camadas principais rodando em conjunto:

### Módulo Lógico:
- Integrado diretamente na aplicação via JavaScript.
- Simula a capacidade cognitiva de um agente ao analisar uma infraestrutura de microsserviços.
- Identifica automaticamente o serviço vulnerável com base no número de réplicas e criticidade do tráfego.
- Gera em tempo real um manifesto declarativo em YAML compatível com o LitmusChaos (experimento pod-delete).

### Simulador Visual:
- Desenvolvido em React e Tailwind CSS.
- Fornece um painel gráfico iterativo que simula visualmente a infraestrutura sofrendo o ataque planejado pela IA.
- Exibe um terminal de logs simulando o raciocínio (como se fosse o "pensamento") do bot do caos durante a análise.

### Como Executar a PoC

**Pré-requisitos**:  
* Node.js (versão LTS)  

Para abrir o simulador gráfico do terminal de caos no seu navegador local:  

- No terminal do VS Code, dentro da pasta do projeto (poc-caos-visual), inicie o servidor de desenvolvimento local executando:

```
npm run dev
```

- Abra o seu navegador de preferência e acesse o endereço fornecido no terminal (geralmente http://localhost:5173).
- Com a tela aberta, basta clicar em "Injetar Caos via IA" para iniciar a simulação visual em tempo real e acompanhar a inteligência artificial analisando a arquitetura, detectando a vulnerabilidade no "Auth Service", gerando o manifesto YAML e derrubando o servidor de forma totalmente controlada para avaliar o impacto em cascata.

## Tabela de Comparação 

| Critério | LitmusChaos (Tradicional) | Engenharia de Caos com IA |
| :--- | :--- | :--- |
| **Seleção de Falhas** | Manual (configurada por um engenheiro) | Autônoma (a IA detecta o elo mais fraco) |
| **Criação de Testes** | Escrita estática de manifestos YAML | Geração dinâmica de YAML via LLM |
| **Adaptabilidade** | Baixa (limita-se ao que foi planejado) | Alta (adapta-se a mudanças na arquitetura) |
| **Foco Tecnológico** | Automação da execução de falhas | Automação da descoberta de vulnerabilidades |

## Tecnologias Utilizadas
* **Plataforma base**: Node.js / JavaScript (simulação da lógica do agente)
* **Interface Gráfica**: React / Tailwind CSS (simulação visual do raio de impacto)
* **Ferramenta de Caos Prospectada**: LitmusChaos (Manifestos de Caos e lógica de Pod Delete)

