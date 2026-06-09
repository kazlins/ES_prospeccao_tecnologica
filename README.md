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
O repositório está dividido em duas partes fundamentais que exemplificam esta tecnologia:

### poc_chaos_agent.py (Script de Automação):
- Desenvolvido em Python.
- Simula a lógica de um agente cognitivo de IA a analisar uma infraestrutura de microsserviços.
- Identifica automaticamente qual o serviço vulnerável com base no número de réplicas e criticidade do tráfego.
- Gera em tempo de execução um manifesto declarativo em YAML compatível com o LitmusChaos (experimento pod-delete).

### poc_visual_chaos.jsx (Dashboard Interativo):
- Desenvolvido em React.
- Fornece um painel gráfico iterativo que simula visualmente a infraestrutura a sofrer o ataque planeado pela IA.
- Excelente para fins de demonstração, exibindo uma consola de logs do raciocínio do "Chaos-Bot" em tempo real.

## Como Executar a PoC

### 1. Executar o Script do Agente (Python)
Este script pode ser executado em qualquer ambiente com Python 3 instalado, sem a necessidade de dependências externas (utiliza bibliotecas nativas da linguagem).

No Windows (PowerShell):

```
python poc_chaos_agent.py
```

No Linux / macOS:

```
python3 poc_chaos_agent.py
```

### O que esperar da saída do terminal?

O script irá simular uma varredura na topologia, imprimindo os logs da análise de IA. Ao final, imprimirá no terminal o manifesto YAML do LitmusChaos gerado automaticamente para o microsserviço vulnerável detetado (auth-service).

### 2. Executar o Simulador Visual (React)

Para abrir o simulador gráfico do terminal de caos no seu navegador local:  
**Pré-requisitos**:  
* Node.js (versão LTS)

- No terminal do VS Code, dentro da pasta do projeto (poc-caos-visual), inicie o servidor de desenvolvimento local executando:

```
npm run dev
```

- Abra o seu navegador de preferência e acesse o endereço fornecido no terminal (geralmente http://localhost:5173).
- Com a tela aberta, basta clicar em "Injetar Caos via IA" para iniciar a simulação visual em tempo real e acompanhar a inteligência artificial analisando a arquitetura, detectando a vulnerabilidade no "Auth Service" e derrubando o servidor de forma totalmente controlada para avaliar o impacto em cascata.

## Tabela de Comparação 

| Critério | LitmusChaos (Tradicional) | Engenharia de Caos com IA |
| :--- | :--- | :--- |
| **Seleção de Falhas** | Manual (configurada por um engenheiro) | Autônoma (a IA detecta o elo mais fraco) |
| **Criação de Testes** | Escrita estática de manifestos YAML | Geração dinâmica de YAML via LLM |
| **Adaptabilidade** | Baixa (limita-se ao que foi planejado) | Alta (adapta-se a mudanças na arquitetura) |
| **Foco Tecnológico** | Automação da execução de falhas | Automação da descoberta de vulnerabilidades |

## Tecnologias Utilizadas
* Linguagem Principal: Python 3 (simulação de lógica lógica do agente)
* Interface Gráfica: React / Tailwind CSS (simulação visual)
* Ferramenta de Caos Prospectada: LitmusChaos (Manifestos de Caos)

