import { HttpException } from '@nestjs/common';
import { TerraformController } from './terraform.controller';
import { TerraformService } from './terraform.service';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('./terraform.service');

describe('TerraformController', () => {
  let controller: TerraformController;
  let service: TerraformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerraformController],
      providers: [TerraformService],
    }).compile();

    controller = module.get<TerraformController>(TerraformController);
    service = module.get<TerraformService>(TerraformService);
  });

  describe('generateTerraformCode', () => {
    it('should return generated Terraform code', async () => {
      const data = JSON.stringify({ key: 'value' });
      const terraformCode = 'generated terraform code';

      jest
        .spyOn(service, 'generateTerraformCode')
        .mockResolvedValue(terraformCode);

      const result = await controller.generateTerraformCode(data);
      expect(result).toEqual({ success: true, data: terraformCode });
    });

    it('should handle errors and throw HttpException', async () => {
      const data = JSON.stringify({ key: 'value' });
      const error = new Error('Test error');

      jest.spyOn(service, 'generateTerraformCode').mockRejectedValue(error);

      await expect(controller.generateTerraformCode(data)).rejects.toThrow(
        new HttpException('An error has occured.', 422),
      );
    });
  });

  describe('terraformInfrastuctureCost', () => {
    it('should return Terraform infrastructure cost', async () => {
      const data = JSON.stringify({ key: 'value' });
      const costOutput = 'cost details';

      jest.spyOn(service, 'terraformCodeCost').mockResolvedValue(costOutput);

      const result = await controller.terraformInfrastuctureCost(data);
      expect(result).toEqual({ success: true, data: costOutput });
    });

    it('should handle errors and throw HttpException', async () => {
      const data = JSON.stringify({ key: 'value' });
      const error = new Error('Test error');

      jest.spyOn(service, 'terraformCodeCost').mockRejectedValue(error);

      await expect(controller.terraformInfrastuctureCost(data)).rejects.toThrow(
        new HttpException('An error has occured', 422),
      );
    });
  });
});
