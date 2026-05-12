// Configurações ideais para Alface
const IDEAL = {
    tempMin: 18,
    tempMax: 24,
    umidadeMin: 60,
    umidadeMax: 80
};

// Estado inicial do sistema
let estadoEstufa = {
    temperatura: 22,
    umidade: 70,
    luz: true,
    crescimento: 0, // 0 a 100%
    saude: 100
};

// Função para atualizar os sensores visualmente no HTML
function atualizarInterface() {
    document.getElementById('temp-val').innerText = `${estadoEstufa.temperatura}°C`;
    document.getElementById('umid-val').innerText = `${estadoEstufa.umidade}%`;
    document.getElementById('luz-status').innerText = estadoEstufa.luz ? "Ligada" : "Desligada";
    
    const barraCrescimento = document.getElementById('progresso-crescimento');
    barraCrescimento.style.width = `${estadoEstufa.crescimento}%`;
    
    document.getElementById('saude-val').innerText = `${estadoEstufa.saude}%`;
}

// Lógica de simulação (roda a cada ciclo)
function simularCiclo() {
    // 1. Oscilação natural dos sensores (aleatoriedade)
    estadoEstufa.temperatura += (Math.random() - 0.5) * 2;
    estadoEstufa.umidade += (Math.random() - 0.5) * 5;

    // 2. Verificar saúde da planta
    let condicoesRuins = false;

    if (estadoEstufa.temperatura < IDEAL.tempMin || estadoEstufa.temperatura > IDEAL.tempMax) {
        condicoesRuins = true;
    }
    if (estadoEstufa.umidade < IDEAL.umidadeMin) {
        condicoesRuins = true;
    }

    // 3. Atualizar Crescimento e Saúde
    if (!condicoesRuins && estadoEstufa.luz) {
        if (estadoEstufa.crescimento < 100) estadoEstufa.crescimento += 1;
        if (estadoEstufa.saude < 100) estadoEstufa.saude += 0.5;
    } else {
        estadoEstufa.saude -= 1;
    }

    // Garantir que os valores não saiam do limite
    estadoEstufa.saude = Math.max(0, Math.min(100, estadoEstufa.saude));
    
    atualizarInterface();
    verificarStatus();
}

// Funções de Controle (Botões)
function alternarLuz() {
    estadoEstufa.luz = !estadoEstufa.luz;
    atualizarInterface();
}

function regarPlanta() {
    estadoEstufa.umidade = 75; // Reseta para o ideal
    atualizarInterface();
}

function verificarStatus() {
    if (estadoEstufa.saude <= 0) {
        alert("A planta morreu. Verifique os controles da estufa!");