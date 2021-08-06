import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { AppService } from './app.service';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @UseGuards(FirebaseAuthGuard)
  login() {
    return '123';
  }
}
