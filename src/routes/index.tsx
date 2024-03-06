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
    <main>
      <Title>Hello World</Title>
      <Show when={data()} fallback={<div>Waiting for data...</div>}>
        {(prod) => (
          <>
            <h1>Plants</h1>
            <div>
              <For each={prod()}>
                {(variant) => (
                  <a href={variant.path}>
                    <Show when={variant?.variants[0]?.images[0]?.url}>
                      <p>{variant.name}</p>
                      <img
                        height={300}
                        src={variant.variants[0].images[0].url}
                      />
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
