"use client";

import { useActionState, useState } from "react";
import { createPostAction } from "@/lib/actions";
import {
  generateSlug,
  type PostFormState,
  validatePostInput,
} from "@/lib/validation";

const initialState: PostFormState = { errors: {} };

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
};

function Field({ id, label, error, children, hint }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-navy/50">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-gold focus:ring-2 focus:ring-gold/20";

const inputErrorClassName =
  "border-red-400 focus:border-red-500 focus:ring-red-200";

export default function PostForm() {
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState,
  );
  const [clientErrors, setClientErrors] = useState<PostFormState["errors"]>({});
  const [slugTouched, setSlugTouched] = useState(false);

  const values = state.values ?? {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  };

  const errors = { ...clientErrors, ...state.errors };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const input = {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      content: String(formData.get("content") ?? ""),
    };

    const validation = validatePostInput(input);

    if (!validation.success) {
      event.preventDefault();
      setClientErrors(validation.errors);
      return;
    }

    setClientErrors({});
  }

  function handleTitleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (slugTouched) return;

    const title = event.target.value.trim();
    if (!title) return;

    const slugInput = document.getElementById("slug") as HTMLInputElement | null;
    if (slugInput && !slugInput.value.trim()) {
      slugInput.value = generateSlug(title);
    }
  }

  return (
    <form
      key={`${values.title}-${values.slug}-${values.excerpt.slice(0, 20)}`}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      <Field
        id="title"
        label="عنوان مقاله *"
        error={errors.title}
      >
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={values.title}
          onBlur={handleTitleBlur}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
          className={`${inputClassName} ${errors.title ? inputErrorClassName : ""}`}
          placeholder="مثال: نکات مهم در تنظیم قرارداد"
        />
      </Field>

      <Field
        id="slug"
        label="نامک (slug) *"
        hint="آدرس یکتا مقاله در URL — فقط حروف، اعداد و خط تیره"
        error={errors.slug}
      >
        <input
          id="slug"
          name="slug"
          type="text"
          dir="ltr"
          defaultValue={values.slug}
          onChange={() => setSlugTouched(true)}
          aria-invalid={Boolean(errors.slug)}
          aria-describedby={errors.slug ? "slug-error" : "slug-hint"}
          className={`${inputClassName} text-left ${errors.slug ? inputErrorClassName : ""}`}
          placeholder="mesal-gharardad-molki"
        />
      </Field>

      <Field
        id="excerpt"
        label="خلاصه مقاله *"
        error={errors.excerpt}
        hint="حداقل ۱۰ کاراکتر — در لیست مقالات نمایش داده می‌شود"
      >
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={values.excerpt}
          aria-invalid={Boolean(errors.excerpt)}
          aria-describedby={errors.excerpt ? "excerpt-error" : "excerpt-hint"}
          className={`${inputClassName} resize-y ${errors.excerpt ? inputErrorClassName : ""}`}
          placeholder="خلاصه‌ای کوتاه از موضوع مقاله..."
        />
      </Field>

      <Field
        id="content"
        label="متن کامل مقاله *"
        error={errors.content}
        hint="حداقل ۲۰ کاراکتر"
      >
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={values.content}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={errors.content ? "content-error" : "content-hint"}
          className={`${inputClassName} resize-y leading-8 ${errors.content ? inputErrorClassName : ""}`}
          placeholder="متن کامل مقاله را اینجا بنویسید..."
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-xl bg-gold px-8 py-3.5 text-sm font-bold text-navy transition-all hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "در حال ذخیره..." : "انتشار مقاله"}
        </button>
        <p className="text-sm text-navy/50">* فیلدهای الزامی</p>
      </div>
    </form>
  );
}
