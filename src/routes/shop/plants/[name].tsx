import { Title } from "@solidjs/meta";
import { Params, createAsync, useParams } from "@solidjs/router";
import { For, Show, createEffect } from "solid-js";
import { getPlantData } from "~/api/plantAPI";

export const route = {
  load: ({ params }: { params: Params }) => {
    if (params?.name) {
      return getPlantData(params.name);
    }
  },
};

export default function PlantPage() {
  const params = useParams();
  const data = createAsync(() => getPlantData(params.name));

  createEffect(() => {
    if (data() === null) {
      throw new Error("404");
    }
  });

  return (
    <main>
      <Show when={data()}>
        {(plant) => (
          <>
            <Title>{plant().name}</Title>
            <h1>{plant().name}</h1>
            <For each={plant().variants}>
              {(variant) => (
                <>
                  <p>{variant.name}</p>
                  <p>{variant.price} €</p>
                  <img height={300} src={variant.images[0].url} />
                </>
              )}
            </For>
          </>
        )}
      </Show>
    </main>
  );
}
