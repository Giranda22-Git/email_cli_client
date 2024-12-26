const dotenv = require("dotenv")
const file_exists = require("../utils/file_exists.utils.js")
const path = require("path")

const dotenv_dests = {
  base: path.resolve(path.join(__dirname, "../.env")),
  custom: path.resolve(path.join(__dirname, "../.env.custom"))
}

async function mount_dotenv () {
  dotenv.config({ path: dotenv_dests.base })
  if ( await file_exists(dotenv_dests.custom) ) dotenv.config({ path: dotenv_dests.custom })
}

module.exports = { mount_dotenv, dotenv_dests }
