#!/usr/bin/env node

const { Command } = require('commander')
global.program = new Command()

async function init () {
  await require("./mount/dotenv.mount.js").mount_dotenv()
  require("./mount/commander.mount.js")
  require("./commands/commands.handle.js")

  global.program.parse(process.args)
}

init ()
