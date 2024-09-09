import { RecintosZoo } from '../src/recintos-zoo.js';

describe('Recintos do Zoologico', () => {
    
    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Deve encontrar recintos viáveis para 1 gazela', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1, 3);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 3 total: 7)');

    });


    test('Deve dar erro se colocar um herbivoro com um carnivoro', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1, 5);
        expect(resultado.recintosViaveis).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 4 total: 9)');
        expect(resultado.recintosViaveis).toBeFalsy();

    });

    test('Deve colocar somente carnivoros da mesma especie', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 1, 5);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
    });
    
    test('Deve dar erro ao colocar  carnivoros de  especies diferentes', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 1, 5);
        expect(resultado.recintosViaveis).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 4 total: 9)');

    });

    test('Deve dar erro ao colocar uma animal fora de seu bioma', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1, 4);
        expect(resultado.recintosViaveis).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 8 total: 8)');

    });

    test('Deve dar erro ao colocar uma animal e nao possuir espaço', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 6, 2);
        expect(resultado.recintosViaveis).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 2 (espaço livre: 0 total: 5)');

    });


    test('Deve dar erro ao colocar O hipopotamo junto com outras especies sem ser savana e rio', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1, 1);
        expect(resultado.recintosViaveis).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe(1); 
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 3 total: 10)');

    });
});
