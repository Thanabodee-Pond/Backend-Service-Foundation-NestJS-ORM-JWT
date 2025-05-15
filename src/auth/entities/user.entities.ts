import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number; // <--- ใช้ declare นำหน้า

  @Column({
    type: DataType.STRING(200),
    allowNull: false, // NOT NULL
  })
  declare fullname: string; // <--- ใช้ declare นำหน้า

  @Column({
    type: DataType.STRING(200),
    allowNull: false, // NOT NULL
    unique: true,
  })
  declare email: string; // <--- ใช้ declare นำหน้า

  @Column({
    type: DataType.TEXT,
    allowNull: false, // NOT NULL
  })
  declare password: string; // <--- ใช้ declare นำหน้า
}
