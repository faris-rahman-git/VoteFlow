import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConnection";

export class Option extends Model {
  public id!: number;
  public pollId!: number;
  public text!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Option.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },

    pollId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "options",
    timestamps: true,
  }
);
