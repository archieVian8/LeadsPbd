import { Sequelize } from "sequelize";

const db = new  Sequelize ('leadsTwo','root','Admin123*',{
    host:"localhost",
    dialect:"mysql",
    logging: false,
    
    timestamps: false,
    createdAt: false,
    updatedAt: false,

    // dialectOptions: 
    // {
    //     useUTC: false, 
    //     timezone: '+7:00', 
    //     typeCast: function (field, next) { 
    //         if (field.type === 'DATETIME') {
    //         return field.string()
    //         }
    //         return next()
    //     },
    // },
    // timezone: '+7:00' 

})

export default db;