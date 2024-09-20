export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const generateDate = () => {
  const today = new Date();
  const oldDate = new Date(today);

  oldDate.setDate(today.getDate() - 30);

  return { startDateFormatted: formatDate(oldDate), endDateFormatted: formatDate(today) };
};

export const getCurrentDateISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
