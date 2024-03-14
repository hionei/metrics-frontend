export const humanReadPrice = (value, decimals) => {
  return Math.floor(value * 10 ** decimals);
};

export const currentUnixTime = () => {
  return Math.floor(Date.now() / 1000);
};

export const formatTime = (secondsTimestamp) => {
  const days = Math.floor(secondsTimestamp / (24 * 3600));
  const hours = Math.floor((secondsTimestamp % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsTimestamp % 3600) / 60);
  const seconds = Math.floor(secondsTimestamp % 60);

  return { days, hours, minutes, seconds };
};

export const truncateString = (str, maxLen) => {
  if (!str) return "";
  if (str.length < maxLen) {
    return str;
  }

  return str.substring(0, maxLen) + "...";
};
