import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TerraformService } from './terraform.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('terraform')
export class TerraformController {
  constructor(private readonly terraformService: TerraformService) {}

  // ==================== Generate Terraform Code ==================

  // POST: /terraform/generate
  @Post('generate')
  // @UseGuards(AuthGuard('jwt'))
  async generateTerraformCode(@Body('data') data: string) {
    try {
      const parsedData = JSON.parse(data);
      const terraformCode =
        await this.terraformService.generateTerraformCode(parsedData);
      return { success: true, data: terraformCode };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured.', 422);
    }
  }

  // COST: /terraform/cost
  @Post('cost')
  // @UseGuards(AuthGuard('jwt'))
  async terraformInfrastuctureCost(@Body('data') data: string) {
    try {
      const parsedData = JSON.parse(data);
      const terraformCost =
        await this.terraformService.terraformCodeCost(parsedData);
      return { success: true, data: terraformCost };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }
}
