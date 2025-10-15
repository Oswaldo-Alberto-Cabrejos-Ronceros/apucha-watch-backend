import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CaredProfileService } from './cared-profile.service';
import { CreateCaredProfileDto } from './dto/create-cared-profile.dto';
import { UpdateCaredProfileDto } from './dto/update-cared-profile.dto';
import { AssignTokenDeviceRequest } from './dto/assign-token-device-request.dto';

@Controller('cared-profile')
export class CaredProfileController {
  constructor(private readonly caredProfileService: CaredProfileService) {}

  @Post()
  create(@Body() createCaredProfileDto: CreateCaredProfileDto) {
    return this.caredProfileService.create(createCaredProfileDto);
  }

  @Get()
  findAll() {
    return this.caredProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.findOne(id);
  }

  @Get('by-user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.caredProfileService.findByUserId(userId);
  }

  @Post('assign-token-device')
  assignTokenDevice(
    @Body() assignTokenDeviceRequest: AssignTokenDeviceRequest,
  ) {
    return this.caredProfileService.assignTokenDevice(assignTokenDeviceRequest);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCaredProfileDto: UpdateCaredProfileDto,
  ) {
    return this.caredProfileService.update(id, updateCaredProfileDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.restore(id);
  }
}
