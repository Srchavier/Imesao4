import { Injectable, Param, ParseUUIDPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.findAll();
  }

  findOne(@Param('id', new ParseUUIDPipe()) id: number) {
    return this.accountModel.findByPk(id, {
      rejectOnEmpty: true,
    });
  }
}
