export function secondsToMMSS(seconds: number | string) {
  // Рассчитываем количество минут
  const minutes = Math.floor(+seconds / 60);

  // Рассчитываем оставшиеся секунды
  const remainingSeconds = (+seconds % 60).toFixed(0);

  // Форматируем результат
  const formattedTime = `${minutes}:${+remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return formattedTime;
}

