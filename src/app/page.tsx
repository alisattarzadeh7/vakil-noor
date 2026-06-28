import Link from "next/link";
import ScaleIcon from "@/components/ScaleIcon";
import { formatPhoneDisplay } from "@/lib/format";

const PHONE = "09128979404";

const services = [
  {
    title: "مشاوره حقوقی",
    description:
      "ارائه راهنمایی تخصصی در امور حقوقی با بررسی دقیق پرونده و بیان گزینه‌های قانونی پیش رو.",
    icon: "⚖️",
  },
  {
    title: "تنظیم قرارداد",
    description:
      "تنظیم و بازبینی قراردادهای تجاری، ملکی و خانوادگی با رعایت اصول حقوقی و منافع موکل.",
    icon: "📜",
  },
  {
    title: "پیگیری پرونده",
    description:
      "پیگیری پرونده‌های قضایی در مراجع مختلف با دقت، شفافیت و اطلاع‌رسانی مستمر به موکل.",
    icon: "🏛️",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.12)_0%,_transparent_55%)]" />
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-gold/5 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-sm text-gold-light">
                <ScaleIcon className="h-4 w-4 text-gold" />
                <span>وکیل پایه یک دادگستری</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-gold">مرضیه فلاح</span>
                <br />
                <span className="mt-2 block text-2xl font-semibold text-white/90 sm:text-3xl">
                  مشاور حقوقی در شهرستان نور مازندران
                </span>
              </h1>

              <p className="mt-8 text-lg leading-9 text-white/75">
                وکیل پایه یک دادگستری و مشاور حقوقی در شهرستان نور مازندران.
                همراه شما در مسیر حقوقی با تخصص، دقت و تعهد به عدالت.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-navy transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                >
                  <span aria-hidden="true">📞</span>
                  {formatPhoneDisplay(PHONE)}
                </a>
                <Link
                  href="/posts"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-gold/40 hover:bg-white/10"
                >
                  مطالعه مقالات حقوقی
                </Link>
              </div>
            </div>

            <div className="flex w-full max-w-sm shrink-0 flex-col gap-0 overflow-hidden rounded-2xl border border-gold/20 shadow-2xl shadow-black/40">
              {/* ── Lawyer photo ── */}
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lawyer.png"
                  alt="مرضیه فلاح — وکیل پایه یک دادگستری"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "4/4" }}
                />
                {/* Subtle gold bottom border */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              </div>

              <aside className="legal-card-dark rounded-none border-0 p-8">
              <h2 className="text-sm font-semibold tracking-wide text-gold">
                اطلاعات تماس
              </h2>
              <div className="gold-divider my-4 opacity-60" />
              <dl className="space-y-5">
                <div>
                  <dt className="text-sm text-white/50">سمت</dt>
                  <dd className="mt-1 font-medium leading-7 text-white">
                    وکیل پایه یک دادگستری و مشاور حقوقی
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-white/50">محل فعالیت</dt>
                  <dd className="mt-1 font-medium text-white">
                    شهرستان نور، استان مازندران
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-white/50">شماره تماس</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${PHONE}`}
                      className="text-xl font-bold text-gold-light transition-colors hover:text-gold"
                    >
                      {formatPhoneDisplay(PHONE)}
                    </a>
                  </dd>
                </div>
              </dl>
              </aside>
            </div>
          </div>
        </div>

        <div className="gold-divider opacity-80" />
      </section>

      <section className="legal-pattern mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold text-gold">درباره من</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">معرفی</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="legal-card rounded-2xl p-8 sm:p-10">
            <div className="space-y-5 text-base leading-8 text-navy/80">
              <p>
                با سلام؛ اینجانب{" "}
                <strong className="font-semibold text-navy">
                  وکیل پایه یک دادگستری
                </strong>{" "}
                و{" "}
                <strong className="font-semibold text-navy">
                  مشاور حقوقی
                </strong>{" "}
                در{" "}
                <strong className="font-semibold text-navy">
                  شهرستان نور مازندران
                </strong>{" "}
                هستم. هدف من ارائه خدمات حقوقی دقیق، شفاف و مبتنی بر قوانین
                جاری کشور است تا مراجعین بتوانند با آگاهی کامل، بهترین تصمیم
                را اتخاذ کنند.
              </p>
              <p>
                در زمینه‌های مختلف حقوقی از جمله دعاوی مدنی، خانواده،
                قراردادها و مشاوره حقوقی آماده همکاری و پیگیری پرونده‌های
                شما هستم. اعتماد شما سرمایه حرفه‌ای من است.
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-navy"
            >
              تماس برای مشاوره
              <span aria-hidden="true">&larr;</span>
            </a>
          </div>

          <aside className="flex flex-col gap-4">
            {[
              { label: "پایه وکالت", value: "پایه یک دادگستری" },
              { label: "حوزه فعالیت", value: "شهرستان نور، مازندران" },
              { label: "خدمات", value: "مشاوره، قرارداد، پیگیری پرونده" },
            ].map((item) => (
              <div
                key={item.label}
                className="legal-card rounded-xl px-6 py-5"
              >
                <p className="text-sm text-navy/50">{item.label}</p>
                <p className="mt-1 font-semibold text-navy">{item.value}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="border-y border-gold/20 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold text-gold">خدمات</p>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              حوزه‌های کاری
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="legal-card group rounded-2xl p-7 transition-transform hover:-translate-y-1"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-2xl"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-navy/70">
                  {service.description}
                </p>
                <div className="mt-5 h-0.5 w-10 rounded-full bg-gold/60 transition-all group-hover:w-16 group-hover:bg-gold" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <ScaleIcon className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 text-2xl font-bold">نیاز به مشاوره حقوقی دارید؟</h2>
          <p className="mt-3 leading-8 text-white/70">
            برای دریافت مشاوره و راهنمایی حقوقی با من تماس بگیرید.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-bold text-navy transition-all hover:bg-gold-light"
          >
            {formatPhoneDisplay(PHONE)}
          </a>
        </div>
      </section>
    </main>
  );
}
