export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return result;
}

export function getToday() {
  const aaa = new Date();
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
