import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

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

  // ============= Terraform Code Cost ====================
  async terraformCodeCost(data: any) {
    const output = await this.generateTerraformCode(data);

    // generate .tf file
    const folderName = uuidv4();
    const filePath = path.join('./terraform-code', 'main.tf');

    fs.writeFileSync(`./tt/main.tf`, output);

    return output;
  }
}
