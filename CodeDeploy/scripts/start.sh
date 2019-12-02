#!/bin/bash

bash $(dirname "$(readlink -f "$0")")/hea start "${DEPLOYMENT_GROUP_NAME}"
