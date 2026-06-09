# PoC: Simulação de um Agente de IA para Engenharia do Caos
# Objetivo: Um agente Python analisa o "estado" de um serviço e gera um experimento de Caos automaticamente.

import json
import time

def get_system_architecture():
    """Simula a captura da arquitetura de um cluster Kubernetes"""
    return {
        "service_name": "payment-api",
        "replicas": 1,  # Ponto de falha crítico (single point of failure)
        "dependencies": ["auth-service", "database"],
        "status": "healthy"
    }

def ai_chaos_analyzer(architecture):
    """
    Simulação de uma chamada de LLM.
    Na vida real, passaríamos o JSON acima para o modelo (GPT-4) e pediríamos:
    'Gere um manifesto LitmusChaos para testar a resiliência dessa arquitetura.'
    """
    print("\n🤖 [Agente IA] Analisando arquitetura do sistema...")
    time.sleep(1.5)
    
    if architecture["replicas"] < 2:
        print("⚠️ [Alerta] Detectado Ponto Único de Falha! (Apenas 1 réplica).")
        print("💡 [Agente IA] Decisão: Gerar experimento 'Pod Delete' para testar disponibilidade.")
        
        # Simula o LLM retornando um manifesto YAML do LitmusChaos
        yaml_output = f"""
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: {architecture['service_name']}-pod-delete
  namespace: default
spec:
  appinfo:
    appns: 'default'
    applabel: 'app={architecture['service_name']}'
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
              value: 'false'
        """
        return yaml_output
    else:
        return "Nenhuma vulnerabilidade óbvia encontrada para injeção básica."

def execute_experiment():
    print("🚀 Iniciando Prova de Conceito de AI-Driven Chaos...")
    
    # 1. Obter o estado atual do sistema
    arch = get_system_architecture()
    print(f"📦 Estado atual: {json.dumps(arch, indent=2)}")
    
    # 2. Agente IA analisa e propõe o experimento
    chaos_manifest = ai_chaos_analyzer(arch)
    
    # 3. Resultado
    print("\n📝 [Manifesto de Caos Gerado pela IA]:")
    print(chaos_manifest)
    print("\n✅ PoC Finalizada. O próximo passo seria aplicar via 'kubectl apply -f chaos.yaml'")

if __name__ == "__main__":
    execute_experiment()
