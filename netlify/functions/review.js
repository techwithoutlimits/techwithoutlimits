const { Client, LogLevel } = require("@notionhq/client");

const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;

async function addData(firstname, lastname, email, phonenumber) {
  // Initialize Notion client
  const notion = new Client({
    auth: NOTION_API_KEY,
    logLevel: LogLevel.DEBUG,
  });
  await notion.pages.create({
    parent: {
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      Email: {
        title: [
          {
            text: {
              content: email,
            },
          },
        ],
      },
      "First Name": {
        rich_text: [
          {
            text: {
              content: firstname,
            },
          },
        ],
      },
      "Last Name": {
        rich_text: [
          {
            text: {
              content: lastname,
            },
          },
        ],
      },
      "Phone Number": {
        rich_text: [
          {
            text: {
              content: phonenumber,
            },
          },
        ],
      },
    },
  });
}

// function validateEmail(email) {
//   const re =
//     /^(([^&lt;&gt;()[\\]\\\\.,;:\\s@&quot;]+(\\.[^&lt;&gt;()[\\]\\\\.,;:\\s@&quot;]+)*)|(&quot;.+&quot;))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

module.exports.handler = async function (event, context) {
  // Check the request method
  if (event.httpMethod != "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Get the body
  try {
    var body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: err.toString(),
    };
  }

  // Validate the email
  const { email, phonenumber, firstname, lastname } = body;
  // if (!validateEmail(email)) {
  //   return { statusCode: 400, body: "Email is not valid" };
  // }

  // Store email in Notion
  await addData(firstname, lastname, email, phonenumber);
  return { statusCode: 200, body: "ok" };
};
