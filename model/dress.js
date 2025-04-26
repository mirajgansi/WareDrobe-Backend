const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db"); 

// sequelize.sync({alter:true})
// .then(()=>{
//     console.log("database table synced!");
// })
// .catch((error)=>{
//     console.error("error syncing database....",error);
// });

const Dress = sequelize.define("dress", {
    
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    date:{ type: DataTypes.DATE, allowNull: true},
    comment: { type: DataTypes.TEXT, allowNull: true },
    dressimage:{  type: DataTypes.STRING,allowNull: true},
    category: { type: DataTypes.STRING, allowNull: true },
    season: { type: DataTypes.STRING, allowNull: true },
    brand: { type: DataTypes.STRING, allowNull: true },
    occasion: { type: DataTypes.STRING, allowNull: true },
    last_worn_date: { type: DataTypes.DATE, allowNull: true},
    times_worn:{ type: DataTypes.INTEGER, allowNull: true, defaultValue:0 },
    favorite: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue:false},   
    createdAt:{type: DataTypes.DATE, allowNull:false},
    updatedAt:{type: DataTypes.DATE, allowNull: false}
},
{
    tableName:"dress",
    timestamps:"true",
}  
);

module.exports = Dress;