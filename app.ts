import { EOL } from "node:os";
import IWritable from "./IWritable";
import { readFile, writeFile } from "node:fs/promises" //phai co node: truoc your import (applied only for nodejs modules)

class HtmlWriter implements IWritable {
// // method to write data to the file
    async write(menuStr: string) {
        try { // async nen return promise
            const menuData = menuStr.split('\n').map(line => line.split(','));
            let htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>MENU</title>
            </head>
            <body>`
                menuData.forEach(item => {
                    if(item[0] === 'lunch') {
                        
                            htmlContent +=`
                            <table>
                            <caption>${item[0]}</caption>
                            <tr>
                            <td>${item[3]}</td>
                            <td>${item[1]}</td>
                            <td>${item[2]}</td>
                            </tr>
                            </table>` 
                        
                    } else if(item[0] === 'dinner') {
                      
                            htmlContent +=`
                            <table>
                            <caption>${item[0]}</caption>
                            <tr>
                            <td>${item[3]}</td>
                            <td>${item[1]}</td>
                            <td>${item[2]}</td>
                            </tr>
                            </table>`
                    
                }})
                    htmlContent += `
                </body>
                </html>`;
        

                await writeFile('menu.html', htmlContent)
                console.log('HTML file written successfully');
                
        } catch (error) {
            console.error(error);
        }
    }
}


// class TextWriter implements IWritable {
//     async write(menuStr: string) { // async nen return promise
//        try {
//         writeFile('menu.txt', menuStr)
//         console.log('TXT file written successfully');
//        } catch (error) {
//         console.log(error)
//        }
//     };
// }
//     // logic to write txt file
//     // const menuStr: string[] = this.csvData;
//     // menuStr.forEach(item => {
//     // const [mealType, mealName, mealQuantity, mealPrice] = item.split(',');
//     // const formattedMenu = `
//     // *${mealType}*\n${mealPrice} ${mealName}, ${mealQuantity}`
//     // writer.write(formattedMenu)

// }

// way of need to do async in class, cant put in constructor, other method can be async
class CsvMenuParser {
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
 

async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv");
    console.log(menu)
    const htmlWriter = new HtmlWriter(); 
    // const textWriter = new TextWriter(); 
    await menu.writeMenu(htmlWriter, 'html'); 
    // await menu.writeMenu(textWriter, 'txt')
    // menu.writeMenu(new HtmlWriter())
}
main();
