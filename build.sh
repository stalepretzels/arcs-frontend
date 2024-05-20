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
mkdir ../public/client
mv pkg/* ../public/client

# (debug) list files
cd ../public/client
ls
cd ../../

# build frontend
npm run build