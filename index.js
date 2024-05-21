require("dotenv").config();
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "aidul-personal-portfolio",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "aidul-personal-portfolio",
    Key: `uploads/images/${fileName}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  //   console.log(
  //     "URL for profile-picture.jpg image",
  //     await getObjectURL("profile-picture.jpg")
  //   );

  console.log(
    "URL for uploading",
    await putObject(`image-${Date.now()}.jpg`, "image/jpg")
  );
}

init();
