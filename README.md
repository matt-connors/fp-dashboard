# Fitness Platform Dashboard

## Commands

Update the graphql schema:\
```npm run codegen```

Find circular dependencies:\
```npx madge ./ --extensions ts,tsx,js,jsx --circular --dot | dot -Tpng > circular-dependencies.png```

Regenerate the tailwindcss file:\
```npx tailwindcss -i ./src/styles/index.css -o ./src/styles/output.css --watch```