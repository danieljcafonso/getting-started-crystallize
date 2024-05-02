import { Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { For, Show, createEffect } from "solid-js";
import { getData } from "~/api/catalogueAPI";

export const route = {
  load: () => getData(),
};

export default function Home() {
  const data = createAsync(() => getData());

  createEffect(() => {
    if (data() === null) {
      throw new Error("404");
    }
  });

  return (
    <main class="mx-auto max-w-[1800px] px-10">
      <Title>Hello World</Title>
      <Show when={data()} fallback={<div>Waiting for data...</div>}>
        {(prod) => (
          <>
            <h1>Plants</h1>
            <div class="flex flex-wrap gap-10 mt-10 w-full mx-auto">
              <For each={prod()}>
                {(variant) => (
                  <a
                    href={variant.path}
                    class="flex flex-col items-center border border-1 border-gray rounded-md overflow-hidden lg:w-[400px] w-full sm:justify-between justify-start"
                  >
                    <Show when={variant?.variants[0]?.images[0]?.url}>
                      <img
                        height={300}
                        width={450}
                        src={variant.variants[0].images[0].url}
                        class="max-w-[750px] max-h-[450px] object-cover"
                      />
                      <p class="p-5">{variant.name}</p>
                    </Show>
                  </a>
                )}
              </For>
            </div>
          </>
        )}
      </Show>
    </main>
  );
}
