import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions } from 'sequelize/types';
import { Report } from '../entities/report.entity';

@Injectable()
export class RequestReportGenerateService {
    constructor(
        @InjectModel(Report) private reportModel: typeof Report,
        @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer
    ) {
        this.reportModel.afterCreate((instance: Report, options: CreateOptions<any>) => {
            this.afterCreate(instance);
        })
    }

    async afterCreate(instance: Report) {
        await this.kafkaProducer.send({
            topic: 'report.requested',
            messages: [{
                key: 'reports',
                value: JSON.stringify({
                    id: instance.id,
                    start_date: instance.start_date,
                    end_date: instance.end_date,
                    account_id: instance.account_id
                })
            }]
        });
    }
}
