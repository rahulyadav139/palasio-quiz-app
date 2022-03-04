const textFormatter = str => {
  const formattedText = str
    .trim()
    .split(' ')
    .map(el => el[0].toUpperCase() + el.slice(1).toLowerCase())
    .join(' ');
  return formattedText;
};

const timeFormatter = seconds => {
  const totalSec = Number(seconds);
  const min = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, 0);
  const sec = (totalSec % 60).toString().padStart(2, 0);
  return `${min}:${sec}`;
};

const dateFormatter = date => {
  const formattedDate = date.toLocaleString('en-IN', {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
  });

  return formattedDate;
};

export { textFormatter, timeFormatter, dateFormatter };
