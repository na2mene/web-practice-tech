#!/bin/bash

service_name=$1

script_dir=$(cd $(dirname $0); pwd)
project_root_path=`cd ${script_dir}/../../ && pwd`
target=${project_root_path}/web-api-designs/${service_name}
dist=${project_root_path}/openapi/${service_name}

if [ ! -e $target ]; then
  echo "[ERROR] $target が見つかりません."
  exit 1
fi

docker run --rm \
  -v "${target}:/target" \
  -v "${dist}:/dist/openapi" \
  openapitools/openapi-generator-cli:v7.2.0 generate \
    -g openapi-yaml \
    -i /target/index.yaml \
    -o /dist
