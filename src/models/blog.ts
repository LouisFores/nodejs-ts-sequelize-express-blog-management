import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import User from "./user";
import Category from "./category";

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public categoryId!: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Tự động tăng
      primaryKey: true, // Đặt làm khóa chính
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      }
    }
  },
  {
    sequelize,
    tableName: 'blogs',
    modelName: "Blog",
  }
);

// Relationship
User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

export default Blog;
