import { EOL } from "node:os";
import IWritable from "./IWritable";
import { readFile, writeFile } from "node:fs/promises" 


export default class CsvMenuParser {
    public csvData: string[]= []
    private constructor(data:string[]) {
        this.csvData = data;
    }

    async writeMenu(writer: IWritable, fileType: 'txt' | 'html') {
        let content = this.csvData.join('\n')
        if(fileType === 'txt') {
            await writer.write(content)
        } else if (fileType === 'html') {
            await writer.write(content)
        }
    
        
    }
    static async buildMenu(filename: string) {
        const data = await readFile(filename, "utf8");
        return new CsvMenuParser(data.split(EOL)) // goi instance of class o day
    }
}