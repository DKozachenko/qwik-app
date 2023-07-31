import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { IMathForm, IApiResult, IOperationLabel } from "./models/interfaces";
import { apiUrl } from "./models/constants";

/** Экшн на получение результата с API */
const useMathResult = routeAction$(async (data: any) => {
  const formData: IMathForm = data as IMathForm;
  
  const url: string = `${apiUrl}/${formData.operation}/${formData.expression}`;
  const response = await fetch(url);
  const result: any = response.json();
  return result as IApiResult | { error: string };
});

export default component$(() => {
  const action = useMathResult();
  
  /** Подписи к операциям */
  const operationLabels: IOperationLabel[] = [
    { label: 'Simplify', value: 'simplify' },
    { label: 'Factor', value: 'factor' },
    { label: 'Derive', value: 'derive' },
    { label: 'Intergrate', value: 'intergrate' },
    { label: 'Find 0\'s', value: 'zeroes' },
    { label: 'Find Tangent', value: 'tangent' },
    { label: 'Area Under Curve', value: 'area' },
    { label: 'Cosine', value: 'cos' },
    { label: 'Sine', value: 'sin' },
    { label: 'Tangent', value: 'tan' },
    { label: 'Inverse Cosine', value: 'arccos' },
    { label: 'Inverse Sine', value: 'arcsin' },
    { label: 'Inverse Tangent', value: 'arctan' },
    { label: 'Absolute Value', value: 'abs' },
    { label: 'Logarithm', value: 'log' },
  ];

  return (
    <section class="py-3">
      <div class="container mx-auto">
        <h1 class="text-3xl text-center mb-4">Some math util</h1>
      
        <Form class="w-2/6 mx-auto" action={action}>
          <div class="mb-2 flex justify-between items-center">
            <label class="font-bold w-2/6">Operation</label>
            <select class="w-3/5 border rounded p-1.5" name="operation" required>
              {operationLabels.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div class="mb-4 flex justify-between items-center">
            <label class="font-bold w-2/6">Expression</label>
            <input
              class="border rounded w-3/5 p-1.5"
              type="text"
              required
              name="expression"
            />
          </div>

          <button 
            class="border border-teal-400 hover:bg-teal-600 hover:border-teal-600 rounded-xl bg-teal-400 px-3 py-1 transition-colors mx-auto block" 
            type="submit"
          >
            Execute
          </button>
        </Form>

        <div class="border rounded border-teal-400 w-2/6 mx-auto mt-5 p-3">
          <h3 class="text-xl">Result or error</h3>
          
          {action.isRunning && (
            <p>Executing action</p>
          )}

          {action.value?.error && !action.isRunning && (
            <p>Some error ocurred: <span class="font-bold">{ action.value.error }</span></p>
          )}

          {action.value?.result && !action.isRunning && (
            <p>Result is: <span class="font-bold">{ action.value.result }</span></p>
          )}
        </div>      
      </div> 
    </section>
  );
});