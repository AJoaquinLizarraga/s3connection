const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_ACCESS_KEYID,
  AWS_SECRET_ACCESS_KEYID,
} = process.env;
