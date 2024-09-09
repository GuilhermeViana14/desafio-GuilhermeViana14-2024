class RecintosZoo {

    constructor(){

        this.recintos = [
            {numero: 1, bioma:'savana', tamanho: 10, animais: [{especie: 'MACACO', quantidade: 3, tamanho: 1}] },
            {numero: 2, bioma:'floresta', tamanho: 5, animais: [] },
            {numero: 3, bioma:'savana e rio', tamanho: 7, animais: [{especie: 'GAZELA', quantidade: 1, tamanho: 2}] },
            {numero: 4, bioma:'rio', tamanho: 8, animais: [] },
            {numero: 5, bioma:'savana', tamanho: 9, animais: [{especie: 'LEAO', quantidade: 1, tamanho: 3}] },




         ]
    
        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] },
        };
        
    }
    
    
    
    
    analisaRecintos(animal, quantidade) {
    }

}

export { RecintosZoo as RecintosZoo };
