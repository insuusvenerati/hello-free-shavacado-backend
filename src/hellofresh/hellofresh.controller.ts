import { Controller, Get, Query } from '@nestjs/common';
import { HellofreshService } from './hellofresh.service';

@Controller('hellofresh')
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  findAll(@Query() query) {
    return this.hellofreshService.findAll(query.q, query.page);
  }
}
