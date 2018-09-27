const Sequelize = require('sequelize')
const sequelize  = new Sequelize('bukutamu_db','it-mor','pertamina',{
    operatorsAliases:false,
    dialect:'mysql',
    host:'webapp-db'
})

module.exports = sequelize