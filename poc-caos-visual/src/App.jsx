import React, { useState } from 'react';

export default function PocVisualChaos() {
  const [logs, setLogs] = useState([
    'Sistema operacional estável.',
    'Aguardando comando para iniciar varredura de resiliência...'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [services, setServices] = useState({
    apiGateway: { name: 'API Gateway', replicas: 3, status: 'healthy' },
    authService: { name: 'Auth Service', replicas: 1, status: 'vulnerable' },
    paymentApi: { name: 'Payment API', replicas: 2, status: 'healthy' },
    database: { name: 'PostgreSQL BD', replicas: 3, status: 'healthy' }
  });

  const executarSimulacaoCaos = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogs([]);

    const adicionarLog = (texto, tempo) => {
      setTimeout(() => {
        setLogs(prev => [...prev, texto]);
      }, tempo);
    };

    // Linha do tempo da simulação do Agente de IA
    adicionarLog('[Chaos-Bot] Iniciando varredura autônoma de infraestrutura...', 500);
    adicionarLog('[Chaos-Bot] Analisando topologia do cluster Kubernetes...', 1500);
    adicionarLog('[Chaos-Bot] Mapeando tráfego: API Gateway -> Auth Service (Carga Alta).', 2500);
    
    setTimeout(() => {
      setLogs(prev => [...prev, '[Chaos-Bot] !!VULNERABILIDADE ENCONTRADA: "auth-service" possui apenas 1 réplica ativa no fluxo crítico!!']);
    }, 4000);

    setTimeout(() => {
      setLogs(prev => [...prev, '[Chaos-Bot] Gerando manifesto LitmusChaos (pod-delete) dinamicamente para o "auth-service"...']);
    }, 5500);

    setTimeout(() => {
      setLogs(prev => [...prev, '[Chaos-Bot] Injetando Caos! Executando: kubectl apply -f litmus-manifest.yaml']);
      setServices(prev => ({
        ...prev,
        authService: { ...prev.authService, status: 'down', replicas: 0 }
      }));
    }, 7500);

    setTimeout(() => {
      setLogs(prev => [...prev, '[Alerta] Auth Service ficou OFFLINE. Falha em cadeia detectada!']);
      setServices(prev => ({
        ...prev,
        apiGateway: { ...prev.apiGateway, status: 'degraded' }
      }));
    }, 9000);

    setTimeout(() => {
      setLogs(prev => [...prev, '[Chaos-Bot] Experimento concluído. Raio de impacto (Blast Radius) contido com sucesso.']);
      setIsSimulating(false);
    }, 11000);
  };

  const resetarSimulacao = () => {
    setServices({
      apiGateway: { name: 'API Gateway', replicas: 3, status: 'healthy' },
      authService: { name: 'Auth Service', replicas: 1, status: 'vulnerable' },
      paymentApi: { name: 'Payment API', replicas: 2, status: 'healthy' },
      database: { name: 'PostgreSQL DB', replicas: 3, status: 'healthy' }
    });
    setLogs([
      'Sistema operacional estável.',
      'Aguardando comando para iniciar varredura de resiliência...'
    ]);
    setIsSimulating(false);
  };

  const getStatusColor = (status) => {
    if (status === 'healthy') return 'bg-green-100 border-green-500 text-green-700';
    if (status === 'vulnerable') return 'bg-yellow-100 border-yellow-500 text-yellow-700 animate-pulse';
    if (status === 'degraded') return 'bg-orange-100 border-orange-500 text-orange-700';
    return 'bg-red-100 border-red-500 text-red-700';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-xl shadow-md font-sans">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Monitoramento: Engenharia do Caos Impulsionada por IA</h1>
        <p className="text-sm text-gray-500">GCC188 - Engenharia de Software - Prova de Conceito (PoC)</p>
      </div>

      {/* Grid de Microsserviços */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.values(services).map((service) => (
          <div key={service.name} className={`p-4 border-2 rounded-lg ${getStatusColor(service.status)}`}>
            <div className="font-bold text-lg">{service.name}</div>
            <div className="text-xs mt-1">Réplicas: {service.replicas}</div>
            <div className="text-xs font-semibold uppercase mt-2">
              Status: {service.status === 'vulnerable' ? 'Aviso (1 Réplica)' : service.status}
            </div>
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={executarSimulacaoCaos}
          disabled={isSimulating}
          className={`px-6 py-2 rounded-lg font-semibold text-white shadow-md ${
            isSimulating ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 transition'
          }`}
        >
          {isSimulating ? 'IA Injetando Caos...' : 'Injetar Caos via IA'}
        </button>
        <button
          onClick={resetarSimulacao}
          disabled={isSimulating}
          className="px-6 py-2 rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white shadow-md transition"
        >
          Resetar Sistema
        </button>
      </div>

      {/* Console de Logs da IA */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner h-64 overflow-y-auto">
        <div className="text-gray-500 border-b border-gray-700 pb-2 mb-2">CONSOLE DO AGENTE DE CAOS (LOGS DE PROSPECÇÃO)</div>
        {logs.map((log, index) => (
          <div key={index} className="mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
}