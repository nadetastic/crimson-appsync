import { AppSyncResolverEvent } from "aws-lambda";

export const handler = async (
  event: AppSyncResolverEvent<Record<string, string>>
) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  return [
    {
      name: "Hello world",
    },
    {
      name: "Test",
    },
  ];
};
