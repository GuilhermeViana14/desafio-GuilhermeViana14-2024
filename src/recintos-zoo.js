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


    // Adiciona função para verificar biomas
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
        if (!this.animaisPermitidos[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
            
        const { tamanho, biomas } = this.animaisPermitidos[animal];
        const espacoNecessario = tamanho * quantidade;
        
        .filter(recinto => {
            // Verifica se o bioma é adequado
            if (!biomas.some(bioma => recinto.bioma.includes(bioma))) {
                return false;
            }
        
            return true;
        })
    
    }

}

export { RecintosZoo as RecintosZoo };
