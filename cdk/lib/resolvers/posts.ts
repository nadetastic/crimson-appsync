import { type Context } from "@aws-appsync/utils";

export function request(ctx: Context) {
  // ctx.stash.data.push({ foo: "bar" });
  return {
    operation: "Invoke",
    payload: {
      field: ctx.info.fieldName,
      arguments: {
        name: "helloworld",
      },
    },
  };
}

export function response(ctx: Context) {
  return {
    items: ctx.result,
    stash: JSON.stringify(ctx.stash.data),
  };
  // return ctx.result;
}
