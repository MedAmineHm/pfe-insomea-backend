import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';

@Injectable()
export class TerraformService {
  async readFile(filePath: string): Promise<string> {
    const readFileAsync = promisify(fs.readFile);
    try {
      const fileContent = await readFileAsync(filePath, 'utf8');
      return fileContent;
    } catch (err) {
      throw new Error(`Error reading file: ${err.message}`);
    }
  }

  // ============= Generate Terraform Code =================
  async generateTerraformCode(data: any) {
    const filePath = path.join(
      process.cwd(),
      './terraform-template/template.tf.hbs',
    );
    const content = await this.readFile(filePath);
    const template = handlebars.compile(content);
    const output = template(data);
    return output;
  }
}
