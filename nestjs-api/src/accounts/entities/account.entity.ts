import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { ToNumber } from '../../common/db/to-number.decorator';

@Table({
  tableName: 'accounts',
  createdAt: 'create_at',
  updatedAt: 'update_at',
})
export class Account extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @ToNumber
  @Default(0)
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  balance: number;

  @Column({ allowNull: false })
  subdomain: string;
}
