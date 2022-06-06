import Sequelize from "sequelize"
import sequelize from "../util/sequelize.js"
export default sequelize.define("user", {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  gender: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING, unique: true, allowNull: false },
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  country: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: false },
  line: { type: Sequelize.STRING },
  picture: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING, allowNull: false },
  profession: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
  isConfirmed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  emailConfirmationCode: { type: Sequelize.STRING },
  emailCodeExpire: { type: Sequelize.DATE },
  emailVerified: { type: Sequelize.BOOLEAN, defaultValue: false }
},
{
  indexes: [
    {
      unique: true,
      fields: ["email"]
    }
  ]
})
