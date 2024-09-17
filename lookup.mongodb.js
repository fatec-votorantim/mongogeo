use('geo')
//Agregação total do documento
db.municipios.aggregate([
    {
        $lookup: {
          from: 'estados',
          localField: 'codigo_uf',
          foreignField: 'codigo_uf',
          as: 'estado'
        }
    }
])
use('geo')
//Agregação total do documento excluindo algumas colunas ($project) e filtrando os dados com ($match)
db.municipios.aggregate([
    {
        $lookup: {
          from: 'estados',
          localField: 'codigo_uf',
          foreignField: 'codigo_uf',
          as: 'estado'
        }
    },
    {
        $match: {
            nome: {$eq: "Votorantim"}
        }
    },
    {
        $project: {
          "_id": 0,
          "nome": 1,
          "local.coordinates": 1,
          "estado.nome": 1
        }
    }
])
// Carregando para cada estado, os documentos dos municipios que estão relacionados.
use('geo')
db.estados.aggregate([
    {$lookup: {
      from: 'municipios',
      localField: 'codigo_uf',
      foreignField: 'codigo_uf',
      as: 'relacaoMunicipios'
    }},
    {$match : {
        nome: {$eq: "Minas Gerais"}
    }},
    {$project: {
        _id: 0,
        nome: 1,
        "relacaoMunicipios.nome": 1
    }}
])