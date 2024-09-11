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

    AnimalCarnivoro(animal) {
        const carnivoros = ['LEAO', 'CROCODILO', 'LEOPARDO'];
        return carnivoros.includes(animal.toUpperCase());
    }

    getRecintosViaveis(animal, quantidade) {
        const espacoAnimal = this.tamanhoAnimal(animal);
        const isCarnivoro = this.AnimalCarnivoro(animal);

        const recintosViaveis = this.recintos
            .filter(recinto => {
                if (!this.biomaAdequado(animal, recinto.bioma)) {
                    return false;
                }

                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * espacoAnimal;
                const espacoLivre = recinto.tamanho - espacoOcupado;

                if (espacoLivre < espacoNecessario) {
                    return false;
                }

                if (animal === 'HIPOPOTAMO') {
                    if (recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
                        return false;
                    }
                }

                const existeCarnivoro = recinto.animais.some(a => this.AnimalCarnivoro(a.especie));
                const existeHerbivoro = recinto.animais.some(a => !this.AnimalCarnivoro(a.especie));

                if (isCarnivoro && existeHerbivoro) {
                    return false;
                }

                if (!isCarnivoro && existeCarnivoro) {
                    return false;
                }

                if (isCarnivoro) {
                    const mesmaEspecie = recinto.animais.some(a => a.especie === animal);
                    if (existeCarnivoro && !mesmaEspecie) {
                        return false;
                    }
                }

                // Nova regra para hipopótamo
                if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio') {
                    return false;
                }

                return true;
            })
            .map(recinto => {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * espacoAnimal;
                const espacoLivre = recinto.tamanho - espacoOcupado - espacoNecessario;

                return { numero: recinto.numero, espacoLivre };
            });

        if (recintosViaveis.length === 0) {
            return "Não há recinto viável para alocar o animal.";
        }

        return recintosViaveis
            .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${this.recintos.find(re => re.numero === r.numero).tamanho})`);
    }

    analisaRecintos(animal, quantidade, recintoEscolhido = null) {
        animal = animal.toUpperCase();
    
        // Regra para impedir que um macaco seja colocado sozinho
        const isMacaco = animal === 'MACACO';
    
        if (isMacaco && quantidade === 1) {
            // Continue o processamento, mas certifique-se de que o macaco não seja colocado sozinho
        }
    
        if (!this.tamanhoAnimal(animal)) {
            return { erro: "Animal inválido", recintosViaveis: [] };
        }
    
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: [] };
        }
    
        const espacoAnimal = this.tamanhoAnimal(animal);
        const isCarnivoro = this.AnimalCarnivoro(animal);
    
        let recintosViaveis = this.recintos
            .filter(recinto => {
                if (!this.biomaAdequado(animal, recinto.bioma)) {
                    return false;
                }
    
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * espacoAnimal;
                const espacoLivre = recinto.tamanho - espacoOcupado;
    
                if (espacoLivre < espacoNecessario) {
                    return false;
                }
    
                const existeCarnivoro = recinto.animais.some(a => this.AnimalCarnivoro(a.especie));
    
                if (isCarnivoro) {
                    const mesmaEspecie = recinto.animais.some(a => a.especie === animal);
                    if (existeCarnivoro && !mesmaEspecie) {
                        return false;
                    }
                } else {
                    if (existeCarnivoro) {
                        return false;
                    }
                }
    
                // Nova regra para macaco: se quantidade == 1, pode ser colocado com outros macacos ou com herbívoros
                if (isMacaco && quantidade === 1) {
                    const outrosMacacosOuHerbivoros = recinto.animais.some(a => a.especie === 'MACACO' || !this.AnimalCarnivoro(a.especie));
                    if (!outrosMacacosOuHerbivoros) {
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
    
        // Ordenar os recintos viáveis pelo número do recinto
        recintosViaveis = recintosViaveis.sort((a, b) => a.numero - b.numero);
    
        if (recintoEscolhido) {
            const recintoEscolhidoViavel = recintosViaveis.find(r => r.numero === recintoEscolhido);
            if (recintoEscolhidoViavel) {
                return { erro: null, recintosViaveis: [`Recinto ${recintoEscolhidoViavel.numero} (espaço livre: ${recintoEscolhidoViavel.espacoLivre} total: ${this.recintos.find(r => r.numero === recintoEscolhidoViavel.numero).tamanho})`] };
            } else {
                return { erro: "Recinto escolhido não é viável", recintosViaveis: this.getRecintosViaveis(animal, quantidade) };
            }
        }
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: [] };
        }
    
        return {
            erro: isMacaco && quantidade === 1 ? "Macaco não pode ficar sozinho" : null,
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${this.recintos.find(re => re.numero === r.numero).tamanho})`)
        };
    }
    
    
}
export { RecintosZoo as RecintosZoo };
