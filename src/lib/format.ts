const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: string) {
  return value.replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function formatPersianDate(dateString: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function formatPhoneDisplay(phone: string) {
  const formatted = phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
  return toPersianDigits(formatted);
}
