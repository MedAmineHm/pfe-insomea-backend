import { Test, TestingModule } from '@nestjs/testing';
import { TerraformService } from './terraform.service';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import handlebars from 'handlebars';
import { executeCommand } from 'src/utils';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    readFile: jest.fn(),
  },
  readFileSync: jest.fn(() => 'mock file content'),
}));

jest.mock('fs-extra');
jest.mock('handlebars');
jest.mock('src/utils');

describe('TerraformService', () => {
  let service: TerraformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerraformService],
    }).compile();

    service = module.get<TerraformService>(TerraformService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('readFile', () => {
    it('should read file content', async () => {
      const filePath = 'test/file/path';
      const fileContent = 'file content';

      (fs.promises.readFile as jest.Mock).mockResolvedValue(fileContent);

      await expect(service.readFile(filePath)).resolves.toBe(fileContent);
    });

    it('should throw an error if reading the file fails', async () => {
      const filePath = 'test/file/path';
      const error = new Error('Test error');

      (fs.promises.readFile as jest.Mock).mockRejectedValue(error);

      await expect(service.readFile(filePath)).rejects.toThrow(
        `Error reading file: ${error.message}`,
      );
    });
  });

  describe('generateTerraformCode', () => {
    it('should generate Terraform code', async () => {
      const data = { key: 'value' };
      const templateContent = 'template content {{key}}';
      const expectedOutput = 'template content value';

      (fs.promises.readFile as jest.Mock).mockResolvedValue(templateContent);
      (handlebars.compile as jest.Mock).mockImplementation(
        (template: string) => (context: any) => expectedOutput,
      );

      await expect(service.generateTerraformCode(data)).resolves.toBe(
        expectedOutput,
      );
    });
  });

  describe('terraformCodeCost', () => {
    it('should generate Terraform code and compute cost', async () => {
      const data = { key: 'value' };
      const terraformCode = 'terraform code';
      const costOutput = 'cost details';

      jest
        .spyOn(service, 'generateTerraformCode')
        .mockResolvedValue(terraformCode);

      (fse.outputFileSync as jest.Mock).mockReturnValue(undefined);
      (executeCommand as jest.Mock).mockReturnValue({});

      jest.spyOn(fs, 'readFileSync').mockReturnValue(costOutput);
      (fse.removeSync as jest.Mock).mockReturnValue(undefined);

      await expect(service.terraformCodeCost(data)).resolves.toBe(costOutput);
    });

    it('should handle errors while computing cost', async () => {
      const data = { key: 'value' };

      jest
        .spyOn(service, 'generateTerraformCode')
        .mockRejectedValue(new Error('Test error'));

      await expect(service.terraformCodeCost(data)).rejects.toThrow(
        'Test error',
      );
    });
  });
});
