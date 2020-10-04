const { requiredOption } = require("commander")

module.exports = function (aname, args) {
    require('./' + aname)(...args)
}