const fs = require("fs/promises")
const axios = require("axios").default
const path = require("path")

async function set_config (host, password, destination) {
  const server_islive = await checkhealth_pass_text(host, password)

  if (!server_islive) throw new Error("[End] Server of email_cli checkhealth result is bad")
  
  let dest_of_logs = new String()

  if (destination) {
    dest_of_logs = path.join(process.cwd(), destination)
  } else {
    dest_of_logs = path.join(__dirname, '../')
  }

  dest_of_logs = path.join(dest_of_logs, process.env.LOGS_FILE_NAME)

  if ( !(await check_destination(destination)) && destination ) throw new Error("destination is bad, pls remove it or rewrite to the valid destination path and try again")

  let envdata = "EMAIL_CLI_SERVER_HOST=" + host + "\nEMAIL_CLI_SERVER_PASSWORD=" + password + "\nDESTINATION_OF_LOGS=" + dest_of_logs
  
  await fs.writeFile(path.resolve(path.join(__dirname, "../.env.custom")), envdata)
  console.log("Configs is successfull seted up!")
}

async function check_destination (destination) {
  try {
    return Boolean(await fs.readdir(path.resolve(destination)))
  }
  catch (error) {
    if (error) {
      return false
    }
    throw new Error ("Fatal Error: its not a standart bug error, pls add the issue with this problem to github repo of this project")
  }
}

async function checkhealth_pass_text (host, password) {
  try {
    if (host.at(-1) !== "/") host += "/"
    const request_config = {
      url: host + "pass_gate/checkhealth",
      method: "GET",
      headers: {
        "authorization": "Bearer " + password
      }
    }

    const { data: checkhealth } = await axios(request_config)
    
    if (!checkhealth?.server_islive) {
      console.log("[Error]: server is not alive")
      return false
    }
    else if (!checkhealth?.permission) {
      console.log("[Error]: Forbidden, your access password is not valid, please change the password and try again")
      return false
    }

    return true
  }
  catch(error) {
    throw new Error("[Error]: host is not valid, change the host and try again: " + error)
  }
}

global.program
  .command("setconfig")
  .argument("<host>", "host to the email_cli_server")
  .argument("<password>", "password for permissions for use email_cli_server")
  .argument("[destination]", "destionation of folder will be saved logs from email_cli_server")
  .action(set_config)


