import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';

export enum ReportStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  ERROR = '  error',
}

@Table({
  tableName: 'reports',
  createdAt: 'create_at',
  updatedAt: 'update_at',
})
export class Report extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false })
  start_date: Date;

  @Column({ allowNull: false })
  end_date: Date;

  @Default(ReportStatus.PENDING)
  @Column({ allowNull: false })
  status: ReportStatus;

  @Column({ allowNull: true })
  file_url: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  account_id: string;

  @BelongsTo(() => Account)
  account: Account;
}
