export const SITE_URL = "https://vakilnoor.ir";
export const SITE_NAME = "مرضیه فلاح";
export const PERSON_NAME = "مرضیه فلاح";
export const CONTACT_PHONE = "09128979404";
export const CONTACT_PHONE_E164 = "+989128979404";
export const PRACTICE_AREA = "شهرستان نور، استان مازندران";

export const DEFAULT_TITLE =
  "مرضیه فلاح | وکیل پایه یک دادگستری در نور مازندران";

export const DEFAULT_DESCRIPTION =
  "مرضیه فلاح، وکیل پایه یک دادگستری و مشاور حقوقی در شهرستان نور مازندران؛ ارائه مشاوره حقوقی، تنظیم قرارداد و پیگیری پرونده.";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

export function isIndexablePost(post: { slug?: string; title?: string }) {
  const slug = post.slug?.trim().toLowerCase();
  const title = post.title?.trim().toLowerCase();

  return Boolean(slug) && slug !== "test" && title !== "test";
}
