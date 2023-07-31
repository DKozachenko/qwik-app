/**
 * Базовый хук для получения данных c какого-то API
 * @param apiUrl ссылка на API
 * @returns данные
 */
export const baseHook = async <T>(apiUrl: string) => {
  const response = await fetch(apiUrl);
  const result: any = await response.json();
  return result as T;
}