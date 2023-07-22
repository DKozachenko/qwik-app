import { component$, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, server$ } from "@builder.io/qwik-city";
import styles from './index.css?inline';

export const useMath = routeLoader$(async () => {
  const response = await fetch("https://newton.now.sh/api/v2/factor/x^2-1", {
    headers: {
      Accept: "application/json",
    },
  });

  const json = await response.json();

  return json as {
    operation: string;
    expression: string;
    result: string;
  };
});

const useMathAction = routeAction$((props) => {
  console.log("some props", props);
});


export default component$(() => {
  useStylesScoped$(styles);
  const mathResult = useMath();
  const mathAction = useMathAction();
  const isFavoriteSignal = useSignal(false);

  useTask$(({ track }) => {
    track(()=> isFavoriteSignal.value );
    console.log('Client', isFavoriteSignal.value);

    server$(() => {
      console.log('Server', isFavoriteSignal.value);
    })();
  });

  return (
    <div class="section bright">
      <p>{mathResult.value.operation}</p>
      <p>{mathResult.value.expression}</p>
      <p>{mathResult.value.result}</p>

      <Form action={mathAction}>
        <input type="hidden" name="value" value={7} />
        <button name="vote" value="up">
          👍
        </button>
        <button name="vote" value="down">
          👎
        </button>
      </Form>

      <button
        onClick$={() => {
          isFavoriteSignal.value = !isFavoriteSignal.value;
        }}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </button>
    </div>
  );
});
