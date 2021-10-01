import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsIn } from 'sequelize-typescript';
import { CreateReportDto } from './create-report.dto';

export enum ReportStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  ERROR = '  error',
}

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsIn([Object.values(ReportStatus)])
  @IsNotEmpty()
  status: ReportStatus;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  file_url: string;
}
