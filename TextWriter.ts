import IWritable from "./IWritable";
import { writeFile } from "node:fs/promises";
import processedMenu from "./helper";


export default class TextWriter implements IWritable {
    async write(menuStr: string) { 
       try {
        const newMenu = processedMenu(menuStr);
        let textContent = "";
        for(const mealType in newMenu) {
            textContent += `\n * ${mealType} items *\n`;
            for(let item of newMenu[mealType]) {
                const [mealName, mealQuantity, mealPrice] = item.split(',');
                textContent += `${mealPrice} ${mealName}, ${mealQuantity}\n`
            }
        }
    
        await writeFile('menu.txt', textContent)
        console.log('TXT file written successfully');
       } catch (error) {
        console.log(error)
       }
    };
}


