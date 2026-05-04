import { createClient } from "contentful";

export const getContentfulClient = () => {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

  if (!space) {
    throw new Error("Missing Contentful space ID");
  }

  if (!accessToken) {
    throw new Error("Missing Contentful access token");
  }

  return createClient({
    space,
    accessToken,
    environment,
  });
};
