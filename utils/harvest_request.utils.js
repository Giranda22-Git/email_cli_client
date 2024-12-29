
function harvest_request ({ route, method, body }) {
  const request_config = {
    url: process.env.EMAIL_CLI_SERVER_HOST + route,
    headers: {
      "authorization": "Bearer " + process.env.EMAIL_CLI_SERVER_PASSWORD
    },
    method
  }

  if (body) request_config.data = body

  return request_config
}

module.exports = harvest_request
