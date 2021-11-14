// WorldTimeAPI - веб-сервис, который возвращает текущее местное
// время для данного часового пояса в виде простого текста или JSON
export const BASE_URL = "http://worldtimeapi.org/api";


// Запрос, в результате которого возвращается текущее местное время на основе IP
export async function getCurrentTime() {
  const res = await fetch(`${BASE_URL}/ip`);

  if (!res.ok) {
    throw new Error(`Статут ошибки: ${res.status}`);
  }

  const dateTime = await res.json();

  return dateTime.datetime;
}
