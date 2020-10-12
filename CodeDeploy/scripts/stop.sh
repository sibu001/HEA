#!/bin/bash

bash $(dirname "$(readlink -f "$0")")/hea stop "${DEPLOYMENT_GROUP_NAME}" || exit 0

