import { Table, Model, Column, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';

export enum OrderStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
}

@Table({
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Order extends Model {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id: string;

    @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
    amount: number;

    @Column({ allowNull: false })
    credit_card_number: string;

    @Column({ allowNull: false })
    credit_card_name: string;

    @Column({ allowNull: false, defaultValue: OrderStatus.Pending })
    status: OrderStatus;

    @ForeignKey(() => Account)
    @Column({ allowNull: false, type: DataType.UUID })
    account_id: string;

    @BelongsTo(() => Account)
    account: Account;
}
