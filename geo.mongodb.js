use('geo') //Criando os índices 2dsphere
db.estados.createIndex({local: '2dsphere'})
db.municipios.createIndex({local: '2dsphere'})

//Encontrar um ponto próximo a uma localização específica
use('geo')
db.municipios.find({
    local: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-47.4495, -23.5313] //Fatec
            },
            $maxDistance: 50000 //em metros (50km)
        }
    }
},{nome:1, _id:0})
//Encontrar pontos em um raio (círculo)
use('geo')
db.municipios.find({
    local: {
        $geoWithin: {
            $centerSphere: [[-47.4495, -23.5313],
                            20 / 6378.1] //raio em radianos
        }
    }
},{nome:1, _id:0}).sort({nome:1})
//6378.10 é o raio médio da Terra em km, necessário para converter
//em radianos

//Encontrar pontos dentro de um polígono
use('geo')
db.municipios.find({
    local: {
        $geoWithin: {
            $polygon: [[
                -49.748779083859546,
                -22.422936366211644
              ],
              [
                -49.92206885638325,
                -23.075422562596927
              ],
              [
                -49.05573399837672,
                -23.95582683304778
              ],
              [
                -46.976995703444544,
                -23.301083727551244
              ],
              [
                -47.193105891577034,
                -22.5563992670279
              ],
              [
                -49.748779083859546,
                -22.422936366211644
              ]]
        }
    }
},{nome:1, _id:0})

//Localizando todos os pontos dentro de uma caixa (box)
use('geo')
db.municipios.find({
    local: {
        $geoWithin: {
            $box: [
                [-51.58, -21.99], //canto inferior esquerdo
                [-51.20, -22.24]  //canto superior direito
            ]
        }
    }
},{nome:1, _id:0})