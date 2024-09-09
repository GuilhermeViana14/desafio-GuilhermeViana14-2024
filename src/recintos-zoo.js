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

    // Função que retorna o tamanho do animal
    tamanhoAnimal(animal) {
        const tamanhos = {
            'MACACO': 1,
            'GAZELA': 2,
            'LEAO': 3,
            'CROCODILO': 3,
            'HIPOPOTAMO': 4,
        };
        return tamanhos[animal.toUpperCase()] || null;
    }

    // Verifica se o animal é carnívoro
    AnimalCarnivoro(animal) {
        const carnivoros = ['LEAO', 'CROCODILO'];
        return carnivoros.includes(animal.toUpperCase());
    }

    // Verifica se o bioma é adequado para o animal
    biomaAdequado(animal, bioma) {
        if (animal === 'HIPOPOTAMO' && bioma !== 'savana e rio') return false;
        return true;
    }

    // Função principal que analisa os recintos viáveis
    analisaRecintos(animal, quantidade) {
        animal = animal.toUpperCase();

        // Verifica se o animal é válido
        if (!this.tamanhoAnimal(animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        // Filtra os recintos viáveis
        const recintosViaveis = this.recintos
            .filter(recinto => {
                // Verifica o bioma adequado para o animal
                if (!this.biomaAdequado(animal, recinto.bioma)) {
                    return false;
                }

                // Verifica se o espaço é suficiente após a adição dos novos animais
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoNecessario = quantidade * this.tamanhoAnimal(animal);
                const espacoLivre = recinto.tamanho - espacoOcupado - espacoNecessario;

                if (espacoLivre < 0) {
                    return false;
                }

                // Verifica se os animais carnívoros estão sozinhos
                if (this.AnimalCarnivoro(animal) && recinto.animais.length > 0) {
                    return false;
                }

                // Verifica se os animais no recinto continuarão confortáveis
                for (let a of recinto.animais) {
                    if (this.AnimalCarnivoro(a.especie) && animal !== a.especie) {
                        return false;
                    }

                    // Verifica regra dos macacos
                    if (animal === 'MACACO' && recinto.animais.length === 0) {
                        return false;
                    }

                    if (a.especie === 'MACACO' && animal !== 'MACACO' && recinto.animais.length === 1) {
                        return false;
                    }
                }

                return true;
            })
            .map(recinto => {
                // Calcula o espaço livre após adicionar o animal
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                const espacoLivre = recinto.tamanho - espacoOcupado - (quantidade * this.tamanhoAnimal(animal));

                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
            })
            .sort((a, b) => a.numero - b.numero); // Ordena pelo número do recinto

        // Verifica se existem recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }
}

// Exemplo de uso
const zoologico = new RecintosZoo();
const resultado = zoologico.analisaRecintos('MACACO', 2);
console.log(resultado);