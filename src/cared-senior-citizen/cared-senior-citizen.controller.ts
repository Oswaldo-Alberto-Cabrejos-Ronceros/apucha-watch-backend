import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';
import { CreateCaredSeniorCitizenDto } from './dto/create-cared-senior-citizen.dto';

@Controller('cared-senior-citizen')
export class CaredSeniorCitizenController {
  constructor(
    private readonly caredSeniorCitizenService: CaredSeniorCitizenService,
  ) {}

  @Post()
  create(@Body() createCaredSeniorCitizenDto: CreateCaredSeniorCitizenDto) {
    return this.caredSeniorCitizenService.create(createCaredSeniorCitizenDto);
  }

  @Get()
  findAll() {
    return this.caredSeniorCitizenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.caredSeniorCitizenService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.caredSeniorCitizenService.remove(id);
  }
}
