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
async function renderPartials(rendered) {
    const regex = /21588{\+\s*([\w.]+)\s*}/g;
    let match;
    while ((match = regex.exec(rendered)) !== null) {
      const [fullMatch, partialName] = match;
      //Tìm file partial
      const partialContent = await fs.readFile(`./views/${partialName}.html`, {encoding: "utf-8"});
      
      //Gọi đệ quy
      const replacedPartialContent = await renderPartials(partialContent);
      // Thay thế phần trong file chính bằng template nhỏ 
      rendered = rendered.replace(fullMatch, replacedPartialContent);
    }
    return rendered;
}

  const renderTemplate = async function (filePath, options, callback) {
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    let rendered = content;
    rendered = await renderPartials(rendered);
    rendered = render(rendered, options);


    // rendered = renderFor(rendered, options)
    // rendered = renderIfElse(rendered)


    return callback(null, rendered);
};


module.exports = renderTemplate;