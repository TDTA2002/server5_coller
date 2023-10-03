import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Receipt } from '../receipts/entities/receipt.entity';
import { ReceiptDetail } from '../receipts/entities/receipt-detail.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest, Receipt, ReceiptDetail])
  ],
  controllers: [GuestController],
  providers: [GuestService, MailService],
})
export class GuestModule {}
