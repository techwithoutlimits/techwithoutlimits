const { Client, LogLevel } = require("@notionhq/client");
const { NOTION_API_KEY, NOTION_DATABASE_ID, AIRTABLE_API_KEY } = process.env;

async function addData(firstname, lastname, email, phonenumber) {
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
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${AIRTABLE_API_KEY}`);
  // myHeaders.append("Content-Type", "application/json");

  // const data = {
  //   records: [
  //     {
  //       fields: {
  //         "First Name": `${firstname}`,
  //         "Last Name": `${lastname}`,
  //         Email: `${email}`,
  //         "Phone Number": `${phonenumber}`,
  //       },
  //     },
  //   ],
  // };
  // const raw = JSON.stringify(data);
  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };
  // await fetch(
  //   `https://api.airtable.com/v0/apptNOU829wbHRhds/tblrAlZhiIugLtEry`,
  //   requestOptions
  // );
  // await fetch(`https://hook.us1.make.com/521327sw3df9xzog8s1kwutoq1wwlxgf`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: raw,
  // });
}

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

  const { email, phonenumber, firstname, lastname } = body;
  await addData(firstname, lastname, email, phonenumber);
  return { statusCode: 200, body: "ok" };
};
