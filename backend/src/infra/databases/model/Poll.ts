import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConnection";

export class Poll extends Model {
  public id!: number;
  public question!: string;
  public pollCode!: string;
  public expiresAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Poll.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },

    pollCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "polls",
    timestamps: true,
  }
);
