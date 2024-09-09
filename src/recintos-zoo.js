class RecintosZoo {

    constructor(){

        this.recintos = [
            {numero: 1, bioma:'savana', tamanho: 10, animais: [{especie: 'MACACO', quantidade: 3, tamanho: 1}] },
            {numero: 2, bioma:'floresta', tamanho: 5, animais: [] },
            {numero: 3, bioma:'savana e rio', tamanho: 7, animais: [{especie: 'GAZELA', quantidade: 1, tamanho: 2}] },
            {numero: 4, bioma:'rio', tamanho: 8, animais: [] },
            {numero: 5, bioma:'savana', tamanho: 9, animais: [{especie: 'LEAO', quantidade: 1, tamanho: 3}] },




         ]
    
    }


    //função para verificar biomas
    biomasAdequados(animal) {
        const mapaBiomas = {
            'LEAO': ['savana'],
            'LEOPARDO': ['savana'],
            'CROCODILO': ['rio'],
            'MACACO': ['savana', 'floresta'],
            'GAZELA': ['savana'],
            'HIPOPOTAMO': ['savana', 'rio']
        };
        return mapaBiomas[animal.toUpperCase()] || [];
    }
    
    
    

analisaRecintos(animal, quantidade) {
    const biomas = this.biomasAdequados(animal);

    // Verifica o erro para animal inválido
    if (biomas.length === 0) {
        return { erro: "Animal inválido" };
    }

    // Verifica o erro para quantidade inválida
    if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.recintos
        .filter(recinto => {
            // Verifica se o bioma é adequado
            if (!biomas.some(bioma => recinto.bioma.includes(bioma))) {
                return false;
            }

            // Calcula o espaço total ocupado no recinto
            let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);

            // Se tiver mais de uma espécie adicione 1 de espaço extra
            if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal.toUpperCase()) {
                espacoOcupado += 1;
            }

            const espacoNecessario = quantidade * this.tamanhoAnimal(animal);

            // Verifica se tem espaço suficiente no recinto
            return (recinto.tamanho - espacoOcupado) >= espacoNecessario;
        })

        .map(recinto => {

            const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
            const espacoLivre = recinto.tamanho - espacoOcupado - (quantidade * this.tamanhoAnimal(animal));

            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        });

        // Verifica o erro para caso não haja recinto viável
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

}



export { RecintosZoo as RecintosZoo };
