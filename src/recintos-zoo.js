class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] },
        ];
    }

    tamanhoAnimal(animal) {
        const tamanhos = {
            'MACACO': 1,
            'GAZELA': 2,
            'LEOPARDO': 2,
            'LEAO': 3,
            'CROCODILO': 3,
            'HIPOPOTAMO': 4,
        };
        return tamanhos[animal.toUpperCase()] || null;
    }

    AnimalCarnivoro(animal) {
        const carnivoros = ['LEAO', 'CROCODILO', 'LEOPARDO'];
        return carnivoros.includes(animal.toUpperCase());
    }

    biomaAdequado(animal, bioma) {
        const biomasPermitidos = {
            'LEAO': ['savana'],
            'LEOPARDO': ['savana'],
            'CROCODILO': ['rio'],
            'MACACO': ['savana', 'floresta', 'savana e rio'],
            'GAZELA': ['savana', 'savana e rio'],
            'HIPOPOTAMO': ['savana', 'rio', 'savana e rio']
        };

        return biomasPermitidos[animal.toUpperCase()] && biomasPermitidos[animal.toUpperCase()].includes(bioma);
    }

    analisaRecintos(animal, quantidade, recintoEscolhido = null) {
        animal = animal.toUpperCase();
    
        if (!this.tamanhoAnimal(animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
    
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
    
        const espacoAnimal = this.tamanhoAnimal(animal);
        const isCarnivoro = this.AnimalCarnivoro(animal);
    
        // Filtra os recintos viáveis
        const recintosViaveis = this.recintos
            .filter(recinto => {
                if (!this.biomaAdequado(animal, recinto.bioma)) {
                    return false;
                }
    
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * espacoAnimal;
                const espacoLivre = recinto.tamanho - espacoOcupado;
    
                // O recinto é viável se o espaço livre é suficiente
                if (espacoLivre < espacoNecessario) {
                    return false;
                }
    
                // Verifica se já existe um carnívoro ou herbívoro no recinto
                const existeCarnivoro = recinto.animais.some(a => this.AnimalCarnivoro(a.especie));
                
                if (isCarnivoro) {
                    // Permite carnívoros da mesma espécie no mesmo recinto
                    const mesmaEspecie = recinto.animais.some(a => a.especie === animal);
                    if (existeCarnivoro && !mesmaEspecie) {
                        return false;
                    }
                } else {
                    // Herbívoros não podem estar no mesmo recinto que carnívoros
                    if (existeCarnivoro) {
                        return false;
                    }
                }
    
                return true;
            })
            .map(recinto => {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * espacoAnimal;
                const espacoLivre = recinto.tamanho - espacoOcupado - espacoNecessario;
    
                return { numero: recinto.numero, espacoLivre };
            });
        
        if (recintoEscolhido) {
            // Verifica se o recinto escolhido é um dos recintos viáveis
            const recintoEscolhidoViavel = recintosViaveis.find(r => r.numero === recintoEscolhido);
            if (recintoEscolhidoViavel) {
                return { erro: null, recintosViaveis: [`Recinto ${recintoEscolhidoViavel.numero} (espaço livre: ${recintoEscolhidoViavel.espacoLivre} total: ${this.recintos.find(r => r.numero === recintoEscolhidoViavel.numero).tamanho})`] };
            } else {
                return { erro: "Recinto escolhido não é viável", recintosViaveis: null };
            }
        }
    
        // Retorna recintos viáveis normalmente se nenhum recinto específico for escolhido
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
    
        return {
            erro: null,
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${this.recintos.find(re => re.numero === r.numero).tamanho})`)
        };
    }
}

export { RecintosZoo };
