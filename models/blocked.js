import { UUID } from "sequelize"
import { define } from "../util/sequelize.js"

export default define("blocked", {
  clientId: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  workerId: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  }

})
