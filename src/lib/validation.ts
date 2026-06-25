export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
};

export type PostFormErrors = Partial<Record<keyof PostInput, string>>;

export type PostFormState = {
  errors: PostFormErrors;
  values?: PostInput;
};

const SLUG_PATTERN =
  /^[a-z0-9\u0600-\u06FF](?:[a-z0-9\u0600-\u06FF-]*[a-z0-9\u0600-\u06FF])?$/;

export function generateSlug(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return base || `post-${Date.now()}`;
}

export function validatePostInput(input: PostInput): {
  success: true;
  data: PostInput;
} | {
  success: false;
  errors: PostFormErrors;
} {
  const errors: PostFormErrors = {};
  const title = input.title.trim();
  const slug = input.slug.trim();
  const excerpt = input.excerpt.trim();
  const content = input.content.trim();

  if (!title) {
    errors.title = "عنوان مقاله الزامی است.";
  } else if (title.length < 3) {
    errors.title = "عنوان باید حداقل ۳ کاراکتر باشد.";
  } else if (title.length > 200) {
    errors.title = "عنوان نباید بیشتر از ۲۰۰ کاراکتر باشد.";
  }

  if (!slug) {
    errors.slug = "نامک (slug) الزامی است.";
  } else if (slug.length < 3) {
    errors.slug = "نامک باید حداقل ۳ کاراکتر باشد.";
  } else if (slug.length > 100) {
    errors.slug = "نامک نباید بیشتر از ۱۰۰ کاراکتر باشد.";
  } else if (!SLUG_PATTERN.test(slug)) {
    errors.slug =
      "نامک فقط می‌تواند شامل حروف، اعداد و خط تیره باشد و با خط تیره شروع یا پایان نیابد.";
  }

  if (!excerpt) {
    errors.excerpt = "خلاصه مقاله الزامی است.";
  } else if (excerpt.length < 10) {
    errors.excerpt = "خلاصه باید حداقل ۱۰ کاراکتر باشد.";
  } else if (excerpt.length > 400) {
    errors.excerpt = "خلاصه نباید بیشتر از ۴۰۰ کاراکتر باشد.";
  }

  if (!content) {
    errors.content = "متن مقاله الزامی است.";
  } else if (content.length < 20) {
    errors.content = "متن مقاله باید حداقل ۲۰ کاراکتر باشد.";
  } else if (content.length > 20000) {
    errors.content = "متن مقاله نباید بیشتر از ۲۰٬۰۰۰ کاراکتر باشد.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: { title, slug, excerpt, content },
  };
}
