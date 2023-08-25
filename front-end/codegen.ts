import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "codegen/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withComponent: false,
        withHOC: false,
        withHooks: true,
      },
    },
  },
};

export default config;
