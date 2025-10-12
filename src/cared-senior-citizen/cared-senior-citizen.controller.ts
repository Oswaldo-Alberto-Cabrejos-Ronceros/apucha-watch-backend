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
import { CreateCaredProfileWithUserDto } from './dto/create-cared-senior-citizen-with-user.dto';

@Controller('cared-senior-citizen')
export class CaredSeniorCitizenController {
  constructor(
    private readonly caredSeniorCitizenService: CaredSeniorCitizenService,
  ) {}

  @Post()
  create(@Body() createCaredSeniorCitizenDto: CreateCaredSeniorCitizenDto) {
    return this.caredSeniorCitizenService.create(createCaredSeniorCitizenDto);
  }

  @Post('by-user-id')
  createByUserId(
    @Body() createCaredProfileWithUserDto: CreateCaredProfileWithUserDto,
  ) {
    return this.caredSeniorCitizenService.createByUserId(
      createCaredProfileWithUserDto,
    );
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

  @Get('check-linkage/:deviceCode')
  checkLinkage(@Param('deviceCode') deviceCode: string) {
    return this.caredSeniorCitizenService.checkLinkage(deviceCode);
  }

  @Get('cared-profile/:caredProfileId')
  getAllByCaredProfileId(
    @Param('caredProfileId', ParseIntPipe) caredProfileId: number,
  ) {
    return this.caredSeniorCitizenService.getAllByCaredProfileId(
      caredProfileId,
    );
  }

  @Get('user/:userId')
  getAllByUserId(
    @Param('userId')
    userId: string,
  ) {
    return this.caredSeniorCitizenService.getAllByUserId(userId);
  }
}
