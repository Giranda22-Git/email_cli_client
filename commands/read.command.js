const axios = require("axios").default

async function read() {
  const request_config = {
    url: process.env.EMAIL_CLI_SERVER_HOST + "/pass_gate/",
    method: "GET",
    headers: {
      "authorization": "Bearer " + process.env.EMAIL_CLI_SERVER_PASSWORD
    }
  }

  const { data: mail } = await axios(request_config)

  if (mail?.content) console.log(mail.content)
  else if (mail?.message) console.log(mail.message)
  else console.log("Unknown Error, source the code.")
}

global.program
  .command("read")
  .action(read)

