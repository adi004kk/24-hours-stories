require("dotenv").config();

module.exports = {
    env: {
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    },
};