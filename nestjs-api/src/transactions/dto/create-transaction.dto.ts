import { IsIn, IsISO8601, IsNotEmpty, MaxLength } from 'class-validator';

enum TransationCategory {
  CATEGORY1 = 'category1',
  CATEGORY2 = 'category2',
}
const TransationCategoryList = Object.values(TransationCategory);

enum TransationType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}
const TransationTypeList = Object.values(TransationType);

export class CreateTransactionDto {
  @IsISO8601()
  @IsNotEmpty()
  payment_date: Date;

  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsIn(TransationCategoryList)
  @IsNotEmpty()
  category: TransationCategory;

  @IsNotEmpty()
  amount: number;

  @IsIn(TransationTypeList)
  @IsNotEmpty()
  type: TransationType;
}
