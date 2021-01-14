export PRODUCTION_DOMAIN=.

rm -rf packages/auth/dist & rm -rf packages/container/dist & rm -rf packages/dashboard/dist & rm -rf packages/marketing/dist
yarn --cwd packages/auth build
yarn --cwd packages/container build
yarn --cwd packages/dashboard build
yarn --cwd packages/marketing build

rm -rf dist/*

mkdir dist/auth
mkdir dist/auth/latest
cp packages/auth/dist/* dist/auth/latest/

mkdir dist/dashboard
mkdir dist/dashboard/latest
cp packages/dashboard/dist/* dist/dashboard/latest/

mkdir dist/marketing
mkdir dist/marketing/latest
cp packages/marketing/dist/* dist/marketing/latest/

mkdir dist/container
mkdir dist/container/latest
cp packages/container/dist/* dist/container/latest/

cp dist/container/latest/index.html dist/