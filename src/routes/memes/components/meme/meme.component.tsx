import { component$ } from "@builder.io/qwik";
import { IMeme } from "../../models/interfaces";

/** Компонент мема */
export const Meme = component$<{ meme: IMeme }>(({ meme }) => {
  return (
    <div class="border border-black p-2">
      <p class="mb-2">{ meme.name }</p>

      <div class="flex items-center justify-center w-auto h-56">
        <a href={meme.url} target="_blank">
          <img class="w-100 h-auto block max-h-56 w-auto" src={meme.url} alt={meme.name} height={meme.height} width={meme.width} />
        </a>
      </div>
    </div>
  );
});