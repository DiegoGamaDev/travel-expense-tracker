import * as SQLite from "expo-sqlite"




// ------------------------------------------------------- CREATE SCRIPTS ----------------------------------------------------------------//




export async function databaseCreate(){                                                                 // OK CREATE DATABASE
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    try {
        await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS diario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    local varchar(100),
    comentario varchar(2000),
    favorito boolean NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS despesa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS abastecimento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data VARCHAR(11) NOT NULL,
    descricao VARCHAR(200),
    valor REAL NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    metodoPagamento VARCHAR(30),
    local VARCHAR(100),
    quantidadeCombustivel REAL NOT NULL,
    valorPorLitro REAL NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS alimentacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoAlimentacao varchar(30) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS estacionamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    quantidadeHoras INTEGER,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS hospedagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoHospedagem varchar(20),
    quantidadeDeDiarias INTEGER NOT NULL,
    nomeHospedagem varchar(120) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS manutencao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoDeManutencao TEXT NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS passeio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    nomePasseio TEXT NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS pedagio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    qualidadeDaVia varchar(12) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

CREATE TABLE IF NOT EXISTS viagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome varchar(100) NOT NULL,
    dataDeInicio varchar(11) NOT NULL,
    dataDeTermino varchar(11),
    localDePartida varchar(80) NOT NULL,
    destinoFinal varchar(80),
    kilometragemInicial REAL NOT NULL,
    kilometragemParcial REAL,
    kilometragemFinal REAL,
    gastoParcial REAL,
    gastoTotal REAL,
    status boolean NOT NULL
);
`)
        console.log('Banco de dados criado com sucesso')
       
    } catch (error) {
        console.error('ERRO: ', error)
    }
}


export async function createTripDB({data,nome,local,destino,kmInicial}){                                //OK CREATE TRIP
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    
    try {
        await db.runAsync(
            'INSERT INTO viagem (nome,dataDeInicio,localDePartida,destinoFinal,kilometragemInicial,status) VALUES(?,?,?,?,?,?);',
            [nome, data, local, destino, kmInicial, true]
        )
        console.log('Viagem '+ nome + ' criada com sucesso no banco de dados.')
        
    } catch (error) {
        console.error('Erro ao criar viagem no banco de dados: ', error )
    }finally {
      
    }


}


export async function createAbastecimentoDB(props){                                                     // OK CREATE ABASTECIMENTO
    
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'abastecimento';
    try {   
            console.log();
            await db.runAsync(
            'INSERT INTO abastecimento (data,valor,descricao,categoria,metodoPagamento,local,quantidadeCombustivel,valorPorLitro,id_viagem) VALUES(?,?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.quantidade,props.valorPorLitro,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir abastecimento: ', error )
    }

}


export async function createAlimentacaoDB(props){                                                        // OK CREATE ALIMENTACAO
    /*
    CREATE TABLE IF NOT EXISTS alimentacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoAlimentacao varchar(30) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);
    */

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'alimentacao';
    try {   
            console.log();
            await db.runAsync(
            'INSERT INTO alimentacao (data,valor,descricao,categoria,metodoPagamento,local,tipoAlimentacao,id_viagem) VALUES(?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.tipoAlimentacao,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir alimentacao: ', error )
    }

}


export async function createDespesaDB(props){                                                            // OK CREATE DESPESA
    
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'despesa';
    try {   
            console.log();
            await db.runAsync(
            'INSERT INTO despesa (data,valor,descricao,categoria,metodoPagamento,local,id_viagem) VALUES(?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir despesa: ', error )
    }

}


export async function createDiarioDB(props){                                                             // OK CREATE DIARIO
   
    /*
    CREATE TABLE IF NOT EXISTS diario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    local varchar(100),
    comentario varchar(2000),
    favorito boolean NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);
    */

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'diario';
    try {   
            console.log();
            await db.runAsync(
            'INSERT INTO diario (data,local,comentario,favorito,id_viagem) VALUES(?,?,?,?,?);',
            [props.data, props.local, props.comentario, props.favorito ,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir diario: ', error )
    }


}


export async function createEstacionamentoDB(props){                                                     // OK CREATE ESTACIONAMENTO
    /*
    CREATE TABLE IF NOT EXISTS estacionamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    quantidadeHoras INTEGER,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

     */
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'estacionamento';
    
    try {   
            console.log();
            await db.runAsync(
            'INSERT INTO estacionamento (data,valor,descricao,categoria,metodoPagamento,local,quantidadeHoras,id_viagem) VALUES(?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.quantidadeHoras,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir estacionamento: ', error )
    }


}


export async function createHospedagemDB(props){                                                         // OK CREATE HOSPEDAGEM
    /*
CREATE TABLE IF NOT EXISTS hospedagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoHospedagem varchar(20),
    quantidadeDeDiarias INTEGER NOT NULL,
    nomeHospedagem varchar(120) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);
    */
    console.log(props)
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'hospedagem';
    try {   
            
            await db.runAsync(
            'INSERT INTO hospedagem (data,valor,descricao,categoria,metodoPagamento,local,tipoHospedagem,quantidadeDeDiarias,nomeHospedagem,id_viagem) VALUES(?,?,?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.tipoHospedagem,props.quantidadeDeDiarias,props.nomeHospedagem,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir hospedagem: ', error )
    }

}


export async function createManutencaoDB(props){                                                         // OK CREATE MANUTENCAO 
    
    /*
    CREATE TABLE IF NOT EXISTS manutencao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    tipoDeManutencao TEXT NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);
    */

    
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'manutencao';
    try {   
            await db.runAsync(
            'INSERT INTO manutencao (data,valor,descricao,categoria,metodoPagamento,local,tipoDeManutencao,id_viagem) VALUES(?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.tipoDeManutencao,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir manutencao: ', error )
    }


}


export async function createPasseioDB(props){                                                               // OK CREATE PASSEIO
    
    /*

    CREATE TABLE IF NOT EXISTS passeio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    nomePasseio TEXT NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);


    */
    console.log(props)
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'passeio';
    
    try {   
            
            await db.runAsync(
            'INSERT INTO passeio (data,valor,descricao,categoria,metodoPagamento,local,nomePasseio,id_viagem) VALUES(?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.nomePasseio,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir passeio: ', error )
    }


}


export async function createPedagioDB(props){                                                               // OK CREATE PEDAGIO
    /*

    CREATE TABLE IF NOT EXISTS pedagio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data varchar(11) NOT NULL,
    descricao varchar(200) NOT NULL,
    valor REAL NOT NULL,
    categoria varchar(50),
    metodoPagamento varchar(30),
    local varchar(100),
    qualidadeDaVia varchar(12) NOT NULL,
    id_viagem INTEGER,
    FOREIGN KEY (id_viagem) REFERENCES viagem(id)
);

    */

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    const categoria = 'pedagio';
    try {   
            
            await db.runAsync(
            'INSERT INTO pedagio (data,valor,descricao,categoria,metodoPagamento,local,qualidadeDaVia,id_viagem) VALUES(?,?,?,?,?,?,?,?);',
            [props.data, props.valor, props.comentario, categoria, props.pagamento,props.local,props.qualidadeDaVia,props.idViagem]
        
        )
         
    } catch (error) {
        console.error('Erro ao inserir pedagio: ', error )
    }


}




// ---------------------------------------------------------- DELETE SCRIPTS ------------------------------------------------- //




export async function deleteTripDB(props) {
    
    const db = await SQLite.openDatabaseAsync('controleoverland.db');

    try {
        db.runAsync('DELETE from viagem WHERE id= ?', [props.viagemId])
        console.log('Viagem deletada com sucesso.')
    } catch (error) {
        console.error('Erro ao deletar viagem: ', error)
    } 
    
}


export async function deleteByTableId({table,id}) {
    
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    try { 
        await db.runAsync(`DELETE FROM ${table} WHERE id = ?;`, [id]);
        console.log(`Registro da tabela ${table} com ID ${id} deletado com sucesso.`);
    } catch (error) {
        console.error('Erro ao deletar registro: ', error);
        throw error;
    } 
}


// -----------------------------------------------------------   GET SCRIPTS ------------------------------------------------------------//





export async function getViagemById(id) {
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    try {
        const viagem = await db.getFirstAsync('SELECT * FROM viagem WHERE id = ?', [id]);
        console.log(viagem)
        return viagem; 
    } catch (error) {
        return null; 
    }
}


export async function getAllViagens(){
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    try {
        const viagens = await db.getAllAsync(
            'SELECT * FROM viagem ORDER BY dataDeInicio ASC, id ASC ;' 
        )
        return viagens;
        
    } catch (error) {

        console.error('ERRO: '+ error)
        return [];
    
    }
 
}


export async function getAllAbastecimentoByIdViagem(viagemId) { // GET ALL ABASTECIMENTO
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync(
            "SELECT * FROM abastecimento WHERE id_viagem = ? ORDER BY data, id;",
            [viagemId]
        );
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getAbastecimentoById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM abastecimento WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaAbastecimentoIdViagem(idViagem) {             // GET SOMA ABASTECIMENTO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   

    
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM abastecimento where id_viagem = ?;", [idViagem]);
}

export async function getAllAlimentacaoByIdViagem(viagemId) { // GET ALL ALIMENTACAO
    try {
        
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM alimentacao WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        console.log('Erro: ', error)
        throw error; 
    }
}

export async function getAlimentacaoById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM alimentacao WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaAlimentacaoIdViagem(idViagem) { // GET SOMA ALIMENTACAO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   

    
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM alimentacao where id_viagem = ?;", [idViagem]);
}

export async function getAllDespesaByIdViagem(viagemId) { // GET ALL DESPESA
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM despesa WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getDespesaById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM despesa WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaDespesaIdViagem(idViagem) { // GET SOMA DESPESA
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM despesa WHERE id_viagem = ?;", [idViagem]);
}


export async function getAllDiarioByIdViagem(viagemId) { // GET ALL DESPESA
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM diario WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getDiarioById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM diario WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}


export async function getAllEstacionamentoByIdViagem(viagemId) { // GET ALL ESTACIONAMENTO
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM estacionamento WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getEstacionamentoById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM estacionamento WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaEstacionamentoIdViagem(idViagem) { // GET SOMA ESTACIONAMENTO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM estacionamento WHERE id_viagem = ?;", [idViagem]);
}

export async function getAllHospedagemByIdViagem(viagemId) { // GET ALL HOSPEDAGEM
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM hospedagem WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getHospedagemById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM hospedagem WHERE id = ?;", [id]);
        console.log(result)
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaHospedagemIdViagem(idViagem) { // GET SOMA HOSPEDAGEM
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM hospedagem WHERE id_viagem = ?;", [idViagem]);
}

export async function getAllManutencaoByIdViagem(viagemId) { // GET ALL MANUTENCAO
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM manutencao WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getManutencaoById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM manutencao WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaManutencaoIdViagem(idViagem) { // GET SOMA MANUTENCAO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM manutencao WHERE id_viagem = ?;", [idViagem]);
}

export async function getAllPasseioByIdViagem(viagemId) { // GET ALL PASSEIO
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM passeio WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getPasseioById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM passeio WHERE id = ?;", [id]);
        console.log('Passeio:', result)
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaPasseioIdViagem(idViagem) { // GET SOMA PASSEIO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM passeio WHERE id_viagem = ?;", [idViagem]);
}

export async function getAllPedagioByIdViagem(viagemId) { // GET ALL PEDAGIO
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 
        const result = await db.getAllAsync("SELECT * FROM pedagio WHERE id_viagem = ? ORDER BY data, id;", [viagemId]);
        return result;
    } catch (error) {
        throw error; 
    }
}

export async function getPedagioById(id){
    try {
        const db = await SQLite.openDatabaseAsync('controleoverland.db'); 

        const result = await db.getFirstAsync("SELECT * FROM pedagio WHERE id = ?;", [id]);
        return result;
    } catch (error) {
        
        throw error; 
    }
}

export async function getSomaPedagioIdViagem(idViagem) { // GET SOMA PEDAGIO
    const db = await SQLite.openDatabaseAsync('controleoverland.db');   
    return await db.getFirstAsync("SELECT SUM (valor) as total FROM pedagio WHERE id_viagem = ?;", [idViagem]);
}

export async function calcularGastoTotal(idViagem) {
    try {
        const [
            abastecimento,
            alimentacao,
            despesa,
            estacionamento,
            hospedagem,
            manutencao,
            passeio,
            pedagio
        ] = await Promise.all([
            getSomaAbastecimentoIdViagem(idViagem),
            getSomaAlimentacaoIdViagem(idViagem),
            getSomaDespesaIdViagem(idViagem),
            getSomaEstacionamentoIdViagem(idViagem),
            getSomaHospedagemIdViagem(idViagem),
            getSomaManutencaoIdViagem(idViagem),
            getSomaPasseioIdViagem(idViagem),
            getSomaPedagioIdViagem(idViagem)
        ]);

        // Logar os valores de cada categoria
       

        // Calcular o gasto total utilizando os valores de 'total' de cada categoria, garantindo que sejam números
        const gastoTotal = (
            (abastecimento?.total ? Number(abastecimento.total) : 0) +
            (alimentacao?.total ? Number(alimentacao.total) : 0) +
            (despesa?.total ? Number(despesa.total) : 0) +
            (estacionamento?.total ? Number(estacionamento.total) : 0) +
            (hospedagem?.total ? Number(hospedagem.total) : 0) +
            (manutencao?.total ? Number(manutencao.total) : 0) +
            (passeio?.total ? Number(passeio.total) : 0) +
            (pedagio?.total ? Number(pedagio.total) : 0)
        );

        console.log('Gasto Total:', gastoTotal); // Log do gasto total

        return gastoTotal;

    } catch (error) {
        console.error('Erro ao calcular o gasto total:', error);
        return 0; // Retorne 0 ou um valor apropriado em caso de erro
    }
}




export async function calcularGastosPorMesByIdViagem(idViagem, mes, ano) {
    let totalGastos = 0.0;
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    // Formatar a data para comparar com o formato "MM/yyyy"
    const mesAno = `${String(mes).padStart(2, '0')}/${ano}`;

    // Array com os nomes das tabelas
    const tabelas = ["abastecimento", "alimentacao", "despesa", "estacionamento", "hospedagem", "manutencao", "passeio", "pedagio"];

    // Iterar sobre as tabelas e calcular o total de gastos
    for (const tabela of tabelas) {
        const result = await db.getFirstAsync(`SELECT SUM(valor) as total FROM ${tabela} WHERE id_viagem = ? AND strftime('%m/%Y', data) = ?`, [idViagem, mesAno]);
        totalGastos += result ? result.total : 0.0; 
    }

    return totalGastos;
}


// -------------------------------------- UPDATES ------------------------------------

export async function updateAbastecimentoDB(props){
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
    'UPDATE abastecimento SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, quantidadeCombustivel = ?, valorPorLitro = ?  WHERE id= ?;',
     [props.data, props.valor, props.comentario, props.pagamento,props.local,props.quantidade,props.valorPorLitro,props.id])
}

export async function updateAlimentacaoDB(props){
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
    'UPDATE alimentacao SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, tipoAlimentacao =? WHERE id= ?;',
     [props.data, props.valor, props.comentario, props.pagamento,props.local,props.tipoAlimentacao,props.id])
}

export async function updateDespesaDB(props){

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
    'UPDATE despesa SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?  WHERE id= ?;',
     [props.data, props.valor, props.comentario, props.pagamento,props.local,props.id])
}

export async function updateDiarioDB(props){
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
   try {
     await db.runAsync('UPDATE diario SET data = ?, local = ?, comentario = ?, favorito = ?  WHERE id= ?;',
     [props.data, props.local, props.comentario, props.favorito, props.id])
 
   } catch (error) {
    console.error(error)
   }
}

export async function updateEstacionamentoDB(props){
    //'INSERT INTO estacionamento (data,valor,descricao,categoria,metodoPagamento,local,quantidadeHoras,id_viagem) VALUES(?,?,?,?,?,?,?,?);',

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
    'UPDATE estacionamento SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, quantidadeHoras = ?  WHERE id= ?;',
     [props.data, props.valor, props.comentario, props.pagamento,props.local,props.quantidadeHoras,props.id])
}

export async function updateHospedagemDB(props){
//            'INSERT INTO hospedagem (data,valor,descricao,categoria,metodoPagamento,local,tipoHospedagem,quantidadeDeDiarias,nomeHospedagem,id_viagem) VALUES(?,?,?,?,?,?,?,?,?,?);',

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
    'UPDATE hospedagem SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, tipoHospedagem = ?, quantidadeDeDiarias = ?, nomeHospedagem = ?  WHERE id= ?;',
     [props.data, props.valor, props.comentario, props.pagamento,props.local,props.tipoHospedagem, props.quantidadeDeDiarias, props.nomeHospedagem, props.id])
}

export async function updateManutencaoDB(props){
    
        const db = await SQLite.openDatabaseAsync('controleoverland.db');
        await db.runAsync( 
        'UPDATE manutencao SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, tipoDeManutencao = ?  WHERE id= ?;',
         [props.data, props.valor, props.comentario, props.pagamento,props.local,props.tipoDeManutencao, props.id])
    }

export async function updatePasseioDB(props){
    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync( 
        'UPDATE passeio SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, nomePasseio = ?  WHERE id= ?;',
         [props.data, props.valor, props.comentario, props.pagamento,props.local,props.nomePasseio, props.id])
    }

export async function updatePedagioDB(props){
        const db = await SQLite.openDatabaseAsync('controleoverland.db');
        await db.runAsync( 
            'UPDATE pedagio SET data = ?, valor = ?, descricao = ?, metodoPagamento = ?, local = ?, qualidadeDaVia = ?  WHERE id= ?;',
             [props.data, props.valor, props.comentario, props.pagamento,props.local,props.qualidadeDaVia, props.id])
        }

export async function updateTripDB(props) {
            const db = await SQLite.openDatabaseAsync('controleoverland.db');
            await db.runAsync(
                'UPDATE viagem SET nome = ?, dataDeInicio = ?, localDePartida = ?, destinoFinal = ?, kilometragemInicial = ?, kilometragemParcial =? WHERE id = ?;',
                [props.nome, props.data, props.local, props.destino, props.kmInicial, props.kmParcial, props.id] 
            );
        }

export async function updateRodagemDB(props){

    const db = await SQLite.openDatabaseAsync('controleoverland.db');
    await db.runAsync(
            'UPDATE viagem SET kilometragemParcial = ? WHERE id = ?;',
            [props.novaRodagem, props.viagemId]

    )

}

