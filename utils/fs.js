const fs = require('fs')
const path = require('path')

function read(filename) {
    let data = fs.readFileSync(path.join(__dirname, '..', 'model', filename + '.json'), 'utf-8')

    return JSON.parse(data) || []
}


function write (filename, data) {
    fs.writeFileSync(path.join(__dirname, '..', 'model', filename + '.json'), JSON.stringify(data, null, 4))
}

module.exports = {
    read, 
    write
}