// Colors to style console env
const colors = require('./../helpers/console-colors');
module.exports = {
    english: {
        server: {
            running: `${colors.bg.Green}, ${colors.fg.Black} 🚀 Running! ${colors.Reset}`,
            database: `${colors.bg.Blue}, ${colors.fg.Black} 💾 Database Connected! ${colors.Reset}`,
        }
    }
}