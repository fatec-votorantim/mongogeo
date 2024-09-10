use('geo')
db.municipios.find().count() //5570

//Listar todos os municipios terminados em tu ordenados pelo estado e nome
use('geo') //$ que termine - i = insensitive case
db.municipios.find({nome: /tu$/i},{nome:1, codigo_uf:1, _id:0})
             .sort({codigo_uf:-1, nome:1}) //1 -> Ordem Ascendente, -1->Descend

use('geo')
db.municipios.find().sort({nome:-1}) 

/* count */
use('geo')
db.municipios.find({capital: true}).count() //27

/* limit - limitar o número de registros retornados */ 
use('geo')
db.municipios.find({capital: true},{nome:1})
             .limit(10)
/* skip - Pula n registros ao obter a consulta */
const registros = 10
const pagina = 102
use('geo')
db.municipios.find({capital: true},{nome:1})
             .limit(registros)
             .skip(registros*pagina)

/*Expressão Regular - Que comece com Tu */
use('geo') //^ que inicie com
db.municipios.find({nome: /^tu/i},{nome:1,_id:0})
//Usando o operador $regex
use('geo')
db.municipios.find({nome: {$regex: /^tu/i}},{nome:1, _id:0})

use('geo')
db.municipios.find({nome: {$regex: /lu[zt]/i}},{nome:1, _id:0})