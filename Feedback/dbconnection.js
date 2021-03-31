import Sequelize from "sequelize";
const sequelize = new Sequelize("exchange","root","ep34408",{dialect:"mysql",host:"localhost"})
export default sequelize;