export path=$path:/usr/bin
git add .
git commit -m 'test-commit'

git push


curl http://47.98.132.24:7401/api/build

# which yarn

