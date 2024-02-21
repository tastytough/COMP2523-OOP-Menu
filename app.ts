import CsvMenuParser from "./CsvMenuParser";
import HtmlWriter from "./HtmlWriter";
import TextWriter from "./TextWriter";


async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv");
    const htmlWriter = new HtmlWriter(); 
    const textWriter = new TextWriter(); 
    await menu.writeMenu(htmlWriter, 'html'); 
    await menu.writeMenu(textWriter, 'txt')
   
}
main();
