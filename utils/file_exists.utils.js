const fs = require("fs/promises")

async function file_exists (filepath) {
  try {
    await fs.access(filepath)
    return true
  }
  catch {
    return false
  }
}

module.exports = file_exists
