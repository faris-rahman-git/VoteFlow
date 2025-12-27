import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConnection";

export class Vote extends Model {
  public id!: number;
  public voterId!: string;
  public pollId!: number;
  public optionId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vote.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },

    voterId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    pollId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    optionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "votes",
    timestamps: true,
  }
);
