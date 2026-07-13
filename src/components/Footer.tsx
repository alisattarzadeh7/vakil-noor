import ScaleIcon from "./ScaleIcon";
import { CONTACT_PHONE } from "@/lib/seo";
import { formatPhoneDisplay } from "@/lib/format";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/25 bg-navy text-white/70">
      <div className="gold-divider" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gold">
            <ScaleIcon className="h-8 w-8" />
          </span>
          <div>
            <p className="font-semibold text-white">مرضیه فلاح</p>
            <p className="text-sm">وکیل پایه یک دادگستری — شهرستان نور</p>
          </div>
        </div>
        <div className="text-sm leading-7">
          <p>
            &copy; {new Date().getFullYear()} تمامی حقوق محفوظ است.
          </p>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="mt-1 inline-block font-medium text-gold-light transition-colors hover:text-gold"
          >
            {formatPhoneDisplay(CONTACT_PHONE)}
          </a>
        </div>
      </div>
    </footer>
  );
}
