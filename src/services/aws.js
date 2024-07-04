import {S3Client,PutObjectCommand,DeleteObjectCommand} from '@aws-sdk/client-s3'

const AWS_S3_USER_ACCESS_KEY = process.env.IAM_USER_ACCESS_KEY;
const AWS_S3_USER_SECRET_ACCESS_KEY = process.env.IAM_USER_SECRET_ACCESS_KEY;
const AWS_S3_REGION = process.env.AWS_S3_REGION;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME


export function initAws(){   
    // Create an S3 instance
    const s3 = new S3Client({credentials:{accessKeyId:AWS_S3_USER_ACCESS_KEY,secretAccessKey:AWS_S3_USER_SECRET_ACCESS_KEY},region:AWS_S3_REGION})
    return s3; // return the configured S3 insta
}


export const uploadFile = async (image) => {
    const getFileName = image.name;
    const fileName = getFileName.replace(/_/g, '-').replace(/\//g,'-').replace(/ /g,'-');
    const newImageName = Date.now() + '-' + fileName
    const url = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/` + newImageName
    const uploadParams = {Key: newImageName,Bucket: AWS_S3_BUCKET_NAME, Body: image.data}
    const command = new PutObjectCommand(uploadParams)
    const S3Client = initAws();
    const resp = await S3Client.send(command)
    return {resp,url}
}


export const deleteFiles = async (file) => {
    let searchString = "amazonaws.com/";
    const startIndex = file.indexOf(searchString)
    const fileKey = file.substring(startIndex + searchString.length);
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key:fileKey,
    };
    const command = new DeleteObjectCommand(params);
    const S3Client = initAws();
    const resp = await S3Client.send(command)
    return {resp}
}





