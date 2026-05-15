import { getContentfulClient } from "@/lib/contentful";

const isServer = typeof window === "undefined";

const getData = async () => {
  if (isServer) {
    const client = getContentfulClient();
    const res = await client.getEntries({
      content_type: "myPortfolio",
      limit: 1,
      include: 3,
    });

    return res.items[0] ?? null;
  }

  // const res = await fetch("/api/contentful", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
};

export const getBlogData = async () => {
  if (isServer) {
    const client = getContentfulClient();
    const res = await client.getEntries({
      content_type: "blog",
      limit: 1,
      include: 3,
    });

    return res.items[0] ?? null;
  }

  // const res = await fetch("/api/contentful?type=blog", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
};

export default getData;
