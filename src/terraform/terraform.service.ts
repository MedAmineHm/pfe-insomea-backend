import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { executeCommand } from 'src/utils';
const fse = require('fs-extra');

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

  async terraformCodeCost(data: any) {
    const output = await this.generateTerraformCode(data);

    // generate .tf file
    const folderName = uuidv4();
    const folderPath = `./terraform-codes/${folderName}`;
    const filePath = path.join(folderPath, 'main.tf');
    fse.outputFileSync(filePath, output);

    try {
      // Ensure directory exists
      fse.ensureDirSync(folderPath);

      // Execute Infracost command
      const command = `cd ${folderPath} && infracost breakdown --path . --out-file output.txt`;
      executeCommand(command);

      // Ensure output.txt file exists
      const outputFilePath = `${folderPath}/output.txt`;
      if (fs.existsSync(outputFilePath)) {
        const fileOutput = fs.readFileSync(outputFilePath, 'utf-8');

        // Delete the generated folder
        fse.removeSync(folderPath);

        return fileOutput;
      } else {
        throw new Error(`Output file ${outputFilePath} not found.`);
      }
    } catch (err) {
      console.error('Error processing Terraform cost:', err);
      return null;
    }
  }
}
