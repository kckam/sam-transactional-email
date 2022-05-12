const AWS = require("aws-sdk");

exports.lambdaHandler = async (event) => {
  return {
    body: "123" + AWS.VERSION,
  };
};
