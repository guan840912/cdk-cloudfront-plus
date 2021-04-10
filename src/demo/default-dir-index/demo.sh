#!/bin/bash
##Color
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -en "${GREEN}Give Me Right Cloudfront Url: ${NC} " ; read -p "" cfurl && [ -z $cfurl ] &&  echo -e "${RED}Please input Right Cloudfront Url${NC}" && exit 1
echo -en "${GREEN}Give Me ${NC}${RED}Error${NC} ${GREEN}Cloudfront Url: ${NC} " ; read -p "" cfurlerr && [ -z $cfurlerr ] &&  echo -e "${RED}Please input Error Cloudfront Url${NC}" && exit 1

# curl error root directory
echo -en "${GREEN}Error root directory${NC}"
echo ""
echo "curl ${cfurlerr}"
echo ""
curl ${cfurlerr}
read -p "" a
echo ""

# curl error a/b/c/ directory
echo -en "${RED}Error a/b/c/ directory${NC}"
echo ""
echo "curl ${cfurlerr}/a/b/c/"
echo ""
curl "${cfurlerr}/a/b/c/"
read -p "" b
echo ""

# curl right root directory
echo -en "${GREEN}Right root directory${NC}"
echo ""
echo "curl ${cfurl}"
echo ""
curl ${cfurl}
read -p "" c
echo ""

# curl right a/b/c/ directory
echo -en "${GREEN}Right a/b/c/ directory${NC}"
echo ""
echo "curl ${cfurl}/a/b/c/"
echo ""
curl "${cfurl}/a/b/c/"
read -p "" d