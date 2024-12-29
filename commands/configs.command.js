

async function configs () {
  console.log("Custom settings:\n\tHOST: " + process.env.EMAIL_CLI_SERVER_HOST + "\n\tPASSWORD: " + process.env.EMAIL_CLI_SERVER_PASSWORD)  
}

global.program
  .command("configs")
  .action(configs)
