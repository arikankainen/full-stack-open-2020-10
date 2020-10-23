const truncateThousands = number => {
  if (+number >= 1000) return `${parseFloat((+number / 1000).toFixed(1))}k`;
  return number;
};

export default truncateThousands;
