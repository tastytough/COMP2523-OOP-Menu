
const processedMenu = (data: string) => {
    const processedMenu: {[mealType: string]: string[]} = {};
            const menuData = data.split('\n').map(line => line.split(','));
            menuData.forEach(item => {
                const [mealType, ...details] = item.slice();
                const newContent = details.join(',')
                if(!processedMenu[mealType]) {
                    processedMenu[mealType] = []
                }
                processedMenu[mealType].push(newContent);
            });
            return processedMenu;
}

export default processedMenu;