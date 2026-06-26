import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { Post } from "./types";
import { getCloudflareContext } from '@opennextjs/cloudflare'

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "posts.db");

const PERSIAN_POSTS = [
  {
    title: "نکات مهم قبل از امضای قرارداد",
    slug: "nokat-mohim-ghabl-emza-gharardad",
    excerpt:
      "قبل از امضای هر قرارداد، این موارد را حتماً بررسی کنید تا از بروز اختلافات حقوقی جلوگیری شود.",
    content: `امضای قرارداد بدون بررسی دقیق مفاد آن، می‌تواند در آینده مشکلات حقوقی جدی به همراه داشته باشد.

پیش از امضا، حتماً تمام بندها را با دقت مطالعه کنید. به تعهدات طرفین، شرایط فسخ، نحوه حل اختلاف و جرائم تخلف توجه ویژه داشته باشید.

در صورت ابهام در هر بند، حتماً پیش از امضا با وکیل مشورت کنید. یک قرارداد شفاف و دقیق، بهترین سرمایه‌گذاری برای امنیت حقوقی شماست.`,
    created_at: "2026-03-12T10:00:00.000Z",
  },
  {
    title: "مراحل طرح دعوا در دادگاه‌های عمومی",
    slug: "marahal-tarh-dava-dadgah",
    excerpt:
      "آشنایی با مراحل کلی طرح دعوا به مراجع قضایی برای آگاهی بیشتر مراجعین.",
    content: `طرح دعوا در دادگاه‌های عمومی معمولاً با تنظیم دادخواست آغاز می‌شود. دادخواست باید شامل مشخصات طرفین، خواسته، دلایل و مستندات باشد.

پس از ثبت دادخواست، پرونده به شعبه مربوطه ارجاع می‌شود. دادگاه برای رسیدگی، جلسات متعددی برگزار می‌کند و طرفین فرصت دفاع دارند.

پیگیری پرونده نیازمند صبر، دقت و آشنایی با روند قضایی است. همراهی وکیل متخصص در این مسیر، شانس موفقیت را به‌طور چشمگیری افزایش می‌دهد.`,
    created_at: "2026-04-02T14:30:00.000Z",
  },
  {
    title: "تفاوت وکیل پایه یک و مشاور حقوقی",
    slug: "tafavot-vakil-moshavir",
    excerpt:
      "آشنایی با تفاوت‌های مهم میان وکیل دادگستری و مشاور حقوقی در نظام حقوقی ایران.",
    content: `وکیل پایه یک دادگستری، پروانه وکالت از کانون وکلای دادگستری دریافت کرده و می‌تواند در دادگاه‌ها و مراجع قضایی وکالت کند.

مشاور حقوقی نیز در زمینه ارائه مشاوره، تنظیم قرارداد و راهنمایی حقوقی فعالیت دارد. هر دو نقش در حمایت از حقوق شهروندان اهمیت دارند.

انتخاب متخصص مناسب بستگی به نوع نیاز شما دارد. برای پیگیری پرونده قضایی، وکیل پایه یک گزینه‌ای ضروری و مطمئن است.`,
    created_at: "2026-05-18T09:15:00.000Z",
  },
];

function getDatabase(): DatabaseSync {
  const globalForDb = globalThis as typeof globalThis & {
    __vakilnoorDb?: DatabaseSync;
  };

  if (globalForDb.__vakilnoorDb) {
    return globalForDb.__vakilnoorDb;
  }

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  seedPosts(db);

  globalForDb.__vakilnoorDb = db;
  return db;
}

function insertPosts(db: DatabaseSync, posts: typeof PERSIAN_POSTS) {
  const insert = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, created_at)
    VALUES (@title, @slug, @excerpt, @content, @created_at)
  `);

  for (const post of posts) {
    insert.run(post);
  }
}

function seedPosts(db: DatabaseSync) {
  const count = db.prepare("SELECT COUNT(*) AS count FROM posts").get() as {
    count: number;
  };

  if (count.count === 0) {
    insertPosts(db, PERSIAN_POSTS);
    return;
  }

  const legacy = db
    .prepare("SELECT slug FROM posts WHERE slug = ?")
    .get("why-i-build-things-on-the-web");

  if (legacy) {
    db.exec("DELETE FROM posts");
    insertPosts(db, PERSIAN_POSTS);
  }
}

export function getAllPosts(): Post[] {
  const db = getDatabase();
  return db
    .prepare("SELECT * FROM posts ORDER BY datetime(created_at) DESC")
    .all() as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const db = getDatabase();
  return db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug) as
    | Post
    | undefined;
}

export function isSlugTaken(slug: string): boolean {
  const db = getDatabase();
  const row = db.prepare("SELECT id FROM posts WHERE slug = ?").get(slug);
  return Boolean(row);
}

export function createPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
}): Post {
  const db = getDatabase();

  if (isSlugTaken(input.slug)) {
    throw new Error("SLUG_TAKEN");
  }

  const result = db
    .prepare(`
      INSERT INTO posts (title, slug, excerpt, content, created_at)
      VALUES (@title, @slug, @excerpt, @content, @created_at)
    `)
    .run({
      ...input,
      created_at: new Date().toISOString(),
    });

  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(result.lastInsertRowid) as Post;

  return post;
}
