const fs = require("fs/promises");

function argumentValue(object, path) {
    // Tách các value trong dãy ra
    const parts = path.split(".");
    let value = object;
    for (const part of parts) {
        if (value.hasOwnProperty(part)) {
        value = value[part];
        } else {
        return "";
        }
    }
    return value;
}


// Xử lý biến
function render(rendered, data) {

    const regex = /21588{\s*([\w.]+)\s*}/g;

    let match;
    while ((match = regex.exec(rendered)) !== null) {
        const [fullMatch, variable] = match;
        const value = argumentValue(data, variable);
        if (value != "") {
        rendered = rendered.replace(fullMatch, value);
        }
    }
    return rendered;
}


// Xử lý các template nhỏ - dùng dệ quy
async function renderPartials(rendered, options) {
    const regex = /21588{\+\s*([\w.]+)\s*}/g;
    let match;
    while ((match = regex.exec(rendered)) !== null) {
      const [fullMatch, partialName] = match;
      //Tìm file partial
      const partialContent = await fs.readFile(`./views/${partialName}.html`, {encoding: "utf-8"});
      
      //Gọi đệ quy
      const replacingContent = await renderPartials(partialContent);
      // Thay thế phần trong file chính bằng template nhỏ 
      rendered = rendered.replace(fullMatch, replacingContent);
      rendered = renderForLoop(rendered, options);
      rendered = renderNestedForLoop(rendered, options);


    }
    return rendered;
}

// IF ELSE
function renderIfElse (rendered, options) {
    const regex = /21588{if\s*(\w+)}([\s\S]*?){else}([\s\S]*?){\/if}/g;
    let match;

    while((match = regex.exec(rendered)) !== null) {
        const [fullMatch, condition, ifExecute, elseExecute] = match;
        // lay dieu kien xet
        const val = options[condition];

        //Thay the noi dung
        let replacing;
        if(val) {
            replacing = ifExecute;
        } else {
            // else co the rong
            replacing = elseExecute || "";
        }

    }
    return rendered;
}

function renderForLoop(rendered, options) {
    //For in loop
    const regex = /21588{for\s+(\w+)\s+in\s+([\w.]+)\s*}([\s\S]*?){\s*\/for\s*}/g;

    let match;
    let nestedFor = [];
    while((match = regex.exec(rendered)) !== null) {
        const [fullMatch, variable, array, content] = match;

        let items = [];
        
        // array.split(".").forEach((property, i) => {
        //     if (i == 0) {
        //       items = options[[property]];
        //     } else {
        //       let value = items[property];
        //       items = value;
        //     }
        // });

        const properties = array.split(".");
        for (const property of properties) {
            if (items && items.hasOwnProperty(property)) {
                items = items[property];
            } else {
                items = null;
                break;
            }
        }

        //Neu co data thi
        if (Array.isArray(items)) {
            // thay the
            const replacing = items
                .map((item) => {
                    const object = {[variable]: item};
                    const itemContent = render(content, object);
                    return itemContent;
                })
                .join("");
            rendered = rendered.replace(fullMatch, replacing);
            } else {
                // Khong phai mang-> bo
                nestedFor.push(fullMatch);
                rendered = rendered.replace(fullMatch, `NESTED LOOP${nestedFor.length}`);
            }
            

        
    
        // Restore
        for (let i = 0; i < nestedFor.length; i++) {
          rendered = rendered.replace(`nested loop${i + 1}`, nestedFor[i]);
        }
    }
    return rendered;
}

function renderNestedForLoop(rendered, options) {

    const regex =
      /21461{for\s+(\w+)\s*,\s*(\w+)\s+in\s+([\w.]+)\s*}([\s\S]*?)\s*21461{for\s+(\w+)\s+in\s+(\w+)\s*}([\s\S]*?){\/for}([\s\S]*?){\/for}/;
    let match;
    while ((match = regex.exec(rendered)) !== null) {
      const [
        fullMatch,
        outerVar,
        outerId,
        outerArrName,
        outerContent,
        innerVar,
        innerArrName,
        innerInnerVar,
        innerContent,
      ] = match;
      const outerArrays = getValueFromPath(options, outerArrName);
      console.log(outerId);
      if (Array.isArray(outerArrays)) {
        // Vong lap ben ngoai -> thay the
        const outerReplacement = outerArrays
          .map((outerArr, index) => {

            const innerArr = outerArr;
            if (Array.isArray(innerArr)) {
                // vong lap ben trong thay the
                const innerReplacement = innerArr
                    .map((innerItem) => {
                    const object = {[innerVar]: innerItem };
                    const itemContent = render(innerInnerVar, object);

                    return itemContent;
                    })
                    .join("");
                let finalContent = outerContent + innerReplacement + innerContent;
                finalContent = render(finalContent, { [outerId]: index });
                finalContent = compareExpressions(finalContent, {
                    [outerId]: index,
                });
                return finalContent;
            }
            return "";
            })
            .join("");


        rendered = rendered.replace(fullMatch, outerReplacement);
      } else {
        rendered = rendered.replace(fullMatch, "");
      }
    }
    return rendered;
  }


const renderTemplate = async function (filePath, options, callback) {
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    let rendered = content;
    rendered = await renderPartials(rendered, options);
    
    rendered = render(rendered, options);

    rendered = renderIfElse(rendered, options);
    // rendered = renderForLoop(rendered, options);

    

    // console.log('\tRENDERED', rendered);


    return callback(null, rendered);
};


module.exports = renderTemplate;