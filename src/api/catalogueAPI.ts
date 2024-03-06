import { cache } from "@solidjs/router";
import { crystallizeClient } from "./crystallizeClient";

const loadData = async () => {
  return await crystallizeClient.catalogueApi(
    `#graphql
    query {
        catalogue(path: "/shop/plants", language: "en") {
          children {
            name
            type
            path
            ... on Product {
                      variants {
                name
                price
                images {
                  url
                }
              }
            }
          }
        }
      }         
    `
  );
};

export const getData = cache(async () => {
  "use server";

  try {
    const dt = await loadData();
    return dt.catalogue.children;
  } catch (error) {
    return null;
  }
}, "catalogue-cache");
