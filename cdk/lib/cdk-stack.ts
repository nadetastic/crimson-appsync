import * as cdk from "aws-cdk-lib";
import {
  Code,
  Definition,
  FunctionRuntime,
  GraphqlApi,
  IGraphqlApi,
  MappingTemplate,
  Resolver,
} from "aws-cdk-lib/aws-appsync";
import { Construct } from "constructs";
import { CreateLambdaResolver } from "./createLambdaResolver";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import
import * as path from "path";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api1 = CreateAppsyncAPi(
      this,
      "myapi1",
      path.join(__dirname, "schema.graphql")
    );

    const lambdaResolver1 = CreateLambdaResolver(
      this,
      "mylambda",
      path.join(__dirname, "lambda", "index.ts")
    );

    const lambdaDS = api1.api.addLambdaDataSource(
      "resovler",
      lambdaResolver1.function
    );

    const resolver = new Resolver(this, "query-posts-resolver", {
      api: api1.api,
      dataSource: lambdaDS,
      typeName: "Query",
      fieldName: "posts",
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(path.join(__dirname, "resolvers", "posts.ts"), {}),
    });
  }
}

export const CreateAppsyncAPi = (
  scope: Construct,
  name: string,
  schemapath: string
): { api: IGraphqlApi } => {
  const api = new GraphqlApi(scope, name, {
    name,
    definition: Definition.fromFile(schemapath),
  });
  return {
    api: api,
  };
};
