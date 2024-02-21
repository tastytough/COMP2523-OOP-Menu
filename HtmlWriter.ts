import IWritable from "./IWritable";
import { writeFile } from "node:fs/promises";
import processedMenu from "./helper";

export default class HtmlWriter implements IWritable {

    async write(menuStr: string) {
        try { 
            const newMenu = processedMenu(menuStr);
          
            let htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>MENU</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>`;
            for(const mealType in newMenu) {
                htmlContent +=`
                        <table>
                            <caption>${mealType} items</caption>`
                for(let item of newMenu[mealType]) {
                    const [mealName, mealQuantity, mealPrice] = item.split(',');
                    htmlContent +=`
                    <tr>
                        <td>${mealPrice}</td>
                        <td>${mealName}</td>
                        <td>${mealQuantity}</td>
                    </tr>` 
                
                } 
            }    

                 htmlContent += `
                        </table>
                    </body>
                </html>`;
            await writeFile('menu.html', htmlContent)
            console.log('HTML file written successfully');
        } catch (error) {
            console.error(error);
        }
    }
}
