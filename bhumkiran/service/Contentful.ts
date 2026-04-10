import  {Client}  from "@/lib/contentful";

const getData = async () => {
    const res = await Client.getEntries({
        content_type: "myPortfolio",
    });
    return res.items[0];
};

export default getData