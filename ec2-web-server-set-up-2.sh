#!/bin/bash

# install dependencies
#npm i

# Set up variable to DRY:

# Locate your private key file. The key used to launch this instance is my-n-virginia-key-pair.pem
# ./ec2-api-server-set-up.sh ~/Downloads/my-n-virginia-key-pair.cer ec2-user ec2-10-20-14-18.compute-1.amazonaws.com
PATH_TO_CERTIFICATE=$1 # first cli argument
EC2_USER=$2 # second argument
EC2_HOST=$3 # third argument

# or hardcode the values:
#PATH_TO_CERTIFICATE="~/Downloads/my-n-virginia-key-pair.cer"
#EC2_USER="ec2-user"
#EC2_HOST="ec2-18-20-14-14.compute-1.amazonaws.com"

if [ -z "$PATH_TO_CERTIFICATE" ]; then
    echo 'PATH_TO_CERTIFICATE is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

if [ -z "$EC2_USER" ]; then
    echo 'EC2_USER is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

if [ -z "$EC2_HOST" ]; then
    echo 'EC2_HOST is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

EC2_URI="${EC2_USER}@${EC2_HOST}"

APP_DIR="shop-app"
APP_ZIP_FILE_NAME="shop-app.zip"
ENV_CONFIGURATION="production"
APP_DIST_PATH="./build"

# Run this command, if necessary, to ensure your key is not publicly viewable.
#chmod 400 "${PATH_TO_CERTIFICATE}"

# build the app on your local machine
#npm run build
npm run build -- --configuration=${ENV_CONFIGURATION}

# zip app's files
cd build && zip -r ${APP_ZIP_FILE_NAME} ./* && mv ${APP_ZIP_FILE_NAME} .. && cd ..

# create a temporary folder for built api server via SSH:
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "mkdir -p /tmp/${APP_DIR}"

# # copy files from dist folder to our EC2 instance using Secure Copy Protocol (SCP) (Note: add -q flag to hide progress reporting)
scp -i "${PATH_TO_CERTIFICATE}" "./${APP_ZIP_FILE_NAME}" "${EC2_URI}:/tmp/${APP_DIR}/"

# # via ssh move files from tmp folder to /var/www so that it will not be accidentally removed. Clean up folder beforehand.
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "unzip -o /tmp/${APP_DIR}/${APP_ZIP_FILE_NAME} -d /var/www/html/"