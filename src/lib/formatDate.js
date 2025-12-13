export default function formateDate(date) {
  const formattedDate = new Date(date);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const result = formattedDate.toLocaleString("en-GB", options);
  return result;
}
