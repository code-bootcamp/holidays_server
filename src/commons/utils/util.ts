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

export function getTodayYYMMDD() {
  const currentDate = new Date();
  const sysDate =
    String(currentDate.getFullYear()).slice(-2) +
    String(currentDate.getMonth() + 1).padStart(2, '0') +
    String(currentDate.getDate()).padStart(2, '0');
  return sysDate;
}
