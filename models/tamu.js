const sequelize = require('./db')



const TamuModel = sequelize.define('tamu',{
    tamu_id:{
        type:sequelize.Sequelize.STRING,
        primaryKey:true,
    },
    tamu_identity:{
        type:sequelize.Sequelize.STRING,
    },
    tamu_name:{
        type:sequelize.Sequelize.STRING,
        allowNull:false
    },
    tamu_gender:{
        type:sequelize.Sequelize.STRING,
        allowNull:false
    },
    tamu_phoneno:{
        type:sequelize.Sequelize.STRING(20),
        allowNull:false
    },
    tamu_purpose:{
        type:sequelize.Sequelize.STRING,
        allowNull:false
    },
    tamu_date:{
        type:sequelize.Sequelize.DATEONLY,
        allowNull:false
    },
    tamu_time_in:{
        type:sequelize.Sequelize.TIME,
        allowNull:false
    },
    tamu_time_out:{
        type:sequelize.Sequelize.TIME,
    },
    tamu_filename:{
        type:sequelize.Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'tamu'
})



module. exports = {
    TamuModel
}