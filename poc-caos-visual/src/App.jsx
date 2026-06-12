import React, { useState, useRef, useEffect } from 'react';
import { Server, Database, ShieldAlert, Activity, Cpu, TerminalSquare, Play, RefreshCcw } from 'lucide-react';

export default function App() {
  // Estado que simula a arquitetura do sistema (Vindo do antigo Python)
  const [architecture, setArchitecture] = useState({
    service_name: "auth-service",
    replicas: 1, // Ponto Único de Falha (SPOF)
    dependencies: ["database"],
    status: "healthy"
  });

  // Estados da Interface
  const [logs, setLogs] = useState([]);
  const [yamlManifest, setYamlManifest] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemState, setSystemState] = useState('healthy'); // healthy, analyzing, degraded
  
  const logsEndRef = useRef(null);

  // Auto-scroll no terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Função para adicionar logs ao terminal
  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [...prev, { time: timestamp, message, type }]);
  };

  // --- LÓGICA DO AGENTE IA (Antigo poc_chaos_agent.py) ---
  const runChaosExperiment = async () => {
    if (isAnalyzing || systemState === 'degraded') return;
    
    setIsAnalyzing(true);
    setLogs([]); // Limpa logs anteriores
    setYamlManifest("");
    setSystemState('analyzing');

    addLog("🚀 Iniciando a Prova de Conceito de AI-Driven Chaos...", "system");
    await new Promise(r => setTimeout(r, 1000));

    // 1. Capturar Arquitetura
    addLog(`📦 Capturando o estado atual do cluster Kubernetes...`, "info");
    addLog(`-> Serviço: ${architecture.service_name} | Réplicas: ${architecture.replicas}`, "info");
    await new Promise(r => setTimeout(r, 1500));

    // 2. Análise do Agente
    addLog("🤖 [Agente IA] Analisando a topologia e a resiliência do sistema...", "ai");
    await new Promise(r => setTimeout(r, 2000));

    if (architecture.replicas < 2) {
      addLog("⚠️ [ALERTA] Ponto Único de Falha detectado! (Apenas 1 réplica no Auth-Service).", "warning");
      await new Promise(r => setTimeout(r, 1500));
      
      addLog("💡 [Agente IA] Decisão: Gerar experimento 'Pod Delete' para testar a disponibilidade sob estresse.", "ai");
      
      // 3. Geração Dinâmica do YAML (Simulação LLM)
      const generatedYaml = `apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: ${architecture.service_name}-pod-delete
  namespace: default
spec:
  appinfo:
    appns: 'default'
    applabel: 'app=${architecture.service_name}'
    appkind: 'deployment'
  chaosServiceAccount: pod-delete-sa
  experiments:
    - name: pod-delete
      spec:
        components:
          env:
            - name: TOTAL_CHAOS_DURATION
              value: '30'
            - name: CHAOS_INTERVAL
              value: '10'
            - name: FORCE
              value: 'false'`;
      
      await new Promise(r => setTimeout(r, 1000));
      setYamlManifest(generatedYaml);
      addLog("📝 Manifesto LitmusChaos gerado com sucesso.", "success");
      
      await new Promise(r => setTimeout(r, 1000));
      addLog("💥 Injetando o caos no cluster...", "warning");
      
      // Atualiza o estado visual para degradado
      setTimeout(() => {
        setSystemState('degraded');
        setIsAnalyzing(false);
        addLog("✅ PoC Finalizada: O Auth-Service caiu. O API Gateway entrou em estado degradado devido à falha em cascata.", "system");
      }, 1500);

    } else {
      addLog("✅ Nenhuma vulnerabilidade óbvia encontrada.", "success");
      setIsAnalyzing(false);
      setSystemState('healthy');
    }
  };

  // Função para reiniciar a simulação
  const resetSimulation = () => {
    setSystemState('healthy');
    setLogs([]);
    setYamlManifest("");
    addLog("🔄 Sistema reiniciado. Infraestrutura restaurada para estado saudável.", "system");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6">
      {/* Cabeçalho */}
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-sky-400 flex items-center gap-3">
              <Cpu className="w-8 h-8" />
              Painel de Monitoramento: AI-Driven Chaos
            </h1>
            <p className="text-slate-400 mt-2 text-lg">GCC188 - Prova de Conceito Acadêmica • UFLA</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Módulo Integrado: Lógica + Visualização</p>
            <p>Estudante: Karyna Morais Lins</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: Topologia Visual */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Topologia do Sistema
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                systemState === 'healthy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                systemState === 'analyzing' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 animate-pulse' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {systemState === 'healthy' ? 'Saudável' : systemState === 'analyzing' ? 'Analisando...' : 'Degradado'}
              </span>
            </div>

            {/* Representação dos Nós */}
            <div className="relative flex flex-col items-center gap-12 py-4 z-10">
              
              {/* API Gateway */}
              <div className={`w-64 p-4 rounded-lg border-2 transition-all duration-500 flex items-center gap-4 bg-slate-950 shadow-lg ${
                systemState === 'degraded' ? 'border-yellow-500/50 shadow-yellow-500/20' : 'border-emerald-500/50 shadow-emerald-500/20'
              }`}>
                <Server className={`w-8 h-8 ${systemState === 'degraded' ? 'text-yellow-400' : 'text-emerald-400'}`} />
                <div>
                  <h3 className="font-bold text-slate-100">API Gateway</h3>
                  <p className="text-xs text-slate-400">Ponto de Entrada</p>
                  {systemState === 'degraded' && <p className="text-xs text-yellow-400 mt-1 font-mono">Status: Degraded</p>}
                </div>
              </div>

              {/* Conector */}
              <div className={`absolute top-[80px] bottom-[200px] w-1 border-l-2 border-dashed left-1/2 -ml-[1px] ${
                systemState === 'degraded' ? 'border-red-500/50' : 'border-slate-700'
              }`}></div>

              {/* Auth Service (Alvo) */}
              <div className={`w-64 p-4 rounded-lg border-2 transition-all duration-500 flex items-center justify-between bg-slate-950 shadow-lg relative ${
                systemState === 'degraded' 
                  ? 'border-red-500/80 shadow-red-500/30 scale-95 opacity-50' 
                  : systemState === 'analyzing' ? 'border-sky-500 shadow-sky-500/40 scale-105' : 'border-emerald-500/50 shadow-emerald-500/20'
              }`}>
                <div className="flex items-center gap-4">
                  <ShieldAlert className={`w-8 h-8 ${
                    systemState === 'degraded' ? 'text-red-500' : systemState === 'analyzing' ? 'text-sky-400' : 'text-emerald-400'
                  }`} />
                  <div>
                    <h3 className="font-bold text-slate-100">Auth Service</h3>
                    <p className="text-xs text-slate-400">Réplicas: {architecture.replicas}</p>
                    {systemState === 'degraded' && <p className="text-xs text-red-500 mt-1 font-mono">Status: Offline (Pod Deleted)</p>}
                  </div>
                </div>
                {/* Indicador de SPOF constante */}
                {systemState === 'healthy' && (
                  <span className="absolute -top-3 -right-3 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-900 shadow-sm shadow-amber-500/50" title="Single Point of Failure">
                    SPOF
                  </span>
                )}
              </div>

              {/* Conector Banco de Dados */}
              <div className="absolute bottom-[80px] top-[250px] w-1 border-l-2 border-dashed border-slate-700 left-1/2 -ml-[1px]"></div>

              {/* Banco de Dados */}
              <div className="w-64 p-4 rounded-lg border-2 border-emerald-500/50 transition-all duration-500 flex items-center gap-4 bg-slate-950 shadow-lg shadow-emerald-500/20">
                <Database className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-slate-100">Banco de Dados</h3>
                  <p className="text-xs text-slate-400">PostgreSQL Clusters</p>
                </div>
              </div>

            </div>

            {/* Fundo decorativo animado quando em análise */}
            {systemState === 'analyzing' && (
               <div className="absolute inset-0 bg-sky-500/5 mix-blend-overlay z-0 animate-pulse pointer-events-none"></div>
            )}
            {systemState === 'degraded' && (
               <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay z-0 pointer-events-none"></div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <button 
              onClick={runChaosExperiment}
              disabled={isAnalyzing || systemState === 'degraded'}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg ${
                isAnalyzing || systemState === 'degraded' 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20 hover:shadow-red-500/40 active:scale-95'
              }`}
            >
              <Play className="w-5 h-5" />
              Injetar Caos via Agente IA
            </button>

            {systemState === 'degraded' && (
              <button 
                onClick={resetSimulation}
                className="px-6 py-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95 flex items-center gap-2 border border-slate-700"
              >
                <RefreshCcw className="w-5 h-5" />
                Restaurar
              </button>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: Terminal e YAML */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full">
          
          {/* Terminal Logs */}
          <div className="bg-[#0c0c0c] border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl flex-1 min-h-[300px]">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono text-slate-400">chaos-agent-stdout</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-y-auto flex-1 flex flex-col gap-2">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic mt-auto mb-auto text-center">
                  Aguardando execução do agente...
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span className={`
                      ${log.type === 'system' ? 'text-slate-300' : ''}
                      ${log.type === 'info' ? 'text-sky-300' : ''}
                      ${log.type === 'ai' ? 'text-fuchsia-400 font-semibold' : ''}
                      ${log.type === 'warning' ? 'text-red-400 font-bold' : ''}
                      ${log.type === 'success' ? 'text-emerald-400' : ''}
                    `}>
                      {log.message}
                    </span>
                  </div>
                ))
              )}
              {isAnalyzing && (
                <div className="flex gap-3 animate-pulse">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString('pt-BR')}]</span>
                  <span className="text-slate-400">_</span>
                </div>
              )}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* YAML Output */}
          <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl flex-1 min-h-[250px]">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">manifesto-gerado-ia.yaml</span>
              <span className="text-[10px] uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">LitmusChaos</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-y-auto flex-1">
              {!yamlManifest ? (
                <div className="text-slate-600 italic h-full flex items-center justify-center">
                  Nenhum manifesto gerado.
                </div>
              ) : (
                <pre className="text-emerald-400 whitespace-pre-wrap">
                  {yamlManifest}
                </pre>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}