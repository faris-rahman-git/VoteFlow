import { Option } from "./Option";
import { OptionResult } from "./OptionResult";
import { Poll } from "./Poll";
import { Vote } from "./Vote";

Poll.hasMany(Option, { foreignKey: "pollId", onDelete: "CASCADE" });
Option.belongsTo(Poll, { foreignKey: "pollId" });

Poll.hasMany(Vote, { foreignKey: "pollId", onDelete: "CASCADE" });
Vote.belongsTo(Poll, { foreignKey: "pollId" });

Option.hasMany(Vote, { foreignKey: "optionId", onDelete: "CASCADE" });
Vote.belongsTo(Option, { foreignKey: "optionId" });

Option.hasMany(Vote, { foreignKey: "optionId", onDelete: "CASCADE" });
Vote.belongsTo(Option, { foreignKey: "optionId" });

Option.hasOne(OptionResult, { foreignKey: "optionId", onDelete: "CASCADE" });
OptionResult.belongsTo(Option, { foreignKey: "optionId" });

Poll.hasMany(OptionResult, { foreignKey: "pollId", onDelete: "CASCADE" });
OptionResult.belongsTo(Poll, { foreignKey: "pollId" });
