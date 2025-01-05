
openapi-down-convert --input _openapi.yaml --output openapi-3.0.yaml
kiota generate -l TypeScript -c FalahClient -d ./openapi-3.0.yaml -o ./compartments/client --co

