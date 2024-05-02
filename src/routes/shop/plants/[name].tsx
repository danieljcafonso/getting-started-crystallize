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
            <div class="flex gap-5 px-10 justify-center">
              <For each={plant().variants}>
                {(variant) => (
                  <div class="flex flex-col items-center border border-1 border-gray rounded-md w-[400px] overflow-hidden">
                    <img
                      height={300}
                      width={400}
                      src={variant.images[0].url}
                      class="max-w-[750px] max-h-[450px] object-cover"
                    />
                    <div class="w-full flex justify-between items-center p-5">
                      <p class="text-xl mx-0">{variant.name}</p>
                      <p class="text-xl mx-0">€{variant.price}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </>
        )}
      </Show>
    </main>
  );
}
