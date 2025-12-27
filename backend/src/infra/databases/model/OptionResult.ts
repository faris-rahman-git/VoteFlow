import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConnection";

export class OptionResult extends Model {
  public id!: number;
  public optionId!: number;
  public voteCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OptionResult.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },

    optionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "option_results",
    timestamps: true,
  }
);
