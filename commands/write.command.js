const axios = require("axios").default
const harvest_request = require("../utils/harvest_request.utils.js")

async function write (message) {
  const request = harvest_request({
    route: "/pass_gate/", method: "POST", body: { message } 
  })

  const { data } = await axios(request)

  if (data === "OK") console.log("Mail is successfuly sended.")
  else console.log("Mail is not sended, check the health of email_cli_server")
}

global.program
  .command("write")
  .argument("<message>", "message text of mail for sending to email [HOST]")
  .action(write)

