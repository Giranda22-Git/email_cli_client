const axios = require("axios").default

async function read_last() {
  const request_config = {

  }
}

global.program
  .command("readlast")
  //.argument("<host>", "host to the email_cli_server")
  //.argument("<password>", "password for permissions for use email_cli_server")
  //.argument("[destination]", "destionation of folder will be saved logs from email_cli_server")
  .action(read_last)



module.exports = read_last
