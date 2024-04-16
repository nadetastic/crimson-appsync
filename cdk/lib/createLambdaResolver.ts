import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export const CreateLambdaResolver = (
  scope: Construct,
  name: string,
  codeEntry: string
): { function: Function } => {
  const _function = new NodejsFunction(scope, name, {
    vpc: new Vpc(scope, "lambdavpc"),
    entry: codeEntry,
  });
  return {
    function: _function,
  };
};
