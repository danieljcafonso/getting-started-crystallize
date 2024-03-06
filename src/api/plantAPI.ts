import { cache } from "@solidjs/router";
import { crystallizeClient } from "./crystallizeClient";

const loadData = async (path: string) => {
  return await crystallizeClient.catalogueApi(
    `#graphql
    query ($path: String) {
        catalogue(path: $path, language: "en") {
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
   `,
    { path: path }
  );
};

export const getPlantData = cache(async (plant) => {
  "use server";
  try {
    const dt = await loadData(`/shop/plants/${plant}`);
    return dt.catalogue;
  } catch (error) {
    return null;
  }
}, "plant");
