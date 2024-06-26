# clone client
git clone https://github.com/stalepretzels/arcs-client 
cd arcs-client

# build client

## install rust toolchain
curl https://sh.rustup.rs -sSf | sh -s -- -y
. "$HOME/.cargo/env"

## build with webpack
npm i
npm run build

## copy build
rm -rf ../src/client
mkdir ../src/client
mv pkg/* ../src/client

# build frontend
cd ../
npm i
npm run build