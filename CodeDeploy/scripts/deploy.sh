#!/bin/bash

bash $(dirname "$(readlink -f "$0")")/hea deploy "${DEPLOYMENT_GROUP_NAME}"
