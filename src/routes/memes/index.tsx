import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { memesHook } from "./hooks/memes.hook";
import { IMeme } from "./models/interfaces";
import { Meme } from "./components";

export const useMemesLoader = routeLoader$(memesHook);

export default component$(() => {
  const memesLoader = useMemesLoader();

  return (
    <section class="p-3">
      <h1 class="mb-5 text-5xl text-center">Just some top memes</h1>

      <div class="grid gap-4 grid-cols-5 auto-rows-fr">
        {memesLoader.value.data.memes.map((meme: IMeme) => <Meme  meme={meme}></Meme>)}
      </div>
    </section>
  );
});
