var fs = require('fs'),
    filename = "labs/words/nabor-voprosov-s-otvetami.txt"

a = []
fs.readFile(filename, 'utf8', function(err, content) {
    if (err) throw err;
    console.log('OK: ' + filename);
    const lines = content.split("\r\n")
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const qa = line.split("|")
        a.push(qa)
    }


    // convert JSON object to string
    const data = JSON.stringify(a);

    // write JSON string to a file
    fs.writeFile('questions.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

});