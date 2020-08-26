npm run build:datastore-demo
aws s3 sync dist/datastore s3://sandbox.datastore.verida.io --profile verida-testnet --delete
aws cloudfront create-invalidation --profile verida-testnet --distribution-id E12OEFIO0TJR2R --paths "/*"