import {
  createPool,
  type ExecuteValues,
  type Pool,
  type QueryResult,
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";
import type { Post } from "./types";

type PostRow = RowDataPacket & Post;
type CountRow = RowDataPacket & { count: number };

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

function readMysqlConfig() {
  const requiredEnv = [
    "MYSQL_HOST",
    "MYSQL_PORT",
    "MYSQL_DATABASE",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
  ] as const;

  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing MySQL environment variables: ${missing.join(", ")}`,
    );
  }

  const port = Number(process.env.MYSQL_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("MYSQL_PORT must be a positive integer.");
  }

  return {
    host: process.env.MYSQL_HOST!,
    port,
    database: process.env.MYSQL_DATABASE!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
  };
}

function getPool(): Pool {
  const globalForDb = globalThis as typeof globalThis & {
    __vakilnoorMysqlPool?: Pool;
  };

  if (globalForDb.__vakilnoorMysqlPool) {
    return globalForDb.__vakilnoorMysqlPool;
  }

  const config = readMysqlConfig();
  const pool = createPool({
    ...config,
    charset: "utf8mb4",
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
  });

  globalForDb.__vakilnoorMysqlPool = pool;
  return pool;
}

function isTransientDatabaseError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return [
    "ECONNRESET",
    "EPIPE",
    "ETIMEDOUT",
    "PROTOCOL_CONNECTION_LOST",
  ].includes(String(error.code));
}

async function execute<T extends QueryResult>(
  pool: Pool,
  sql: string,
  values: ExecuteValues[] = [],
): Promise<T> {
  try {
    const [result] = await pool.execute<T>(sql, values);
    return result;
  } catch (error) {
    if (!isTransientDatabaseError(error)) {
      throw error;
    }

    const [result] = await pool.execute<T>(sql, values);
    return result;
  }
}

async function getReadyPool(): Promise<Pool> {
  const globalForDb = globalThis as typeof globalThis & {
    __vakilnoorMysqlInit?: Promise<void>;
  };

  if (!globalForDb.__vakilnoorMysqlInit) {
    globalForDb.__vakilnoorMysqlInit = initializeDatabase();
  }

  await globalForDb.__vakilnoorMysqlInit;
  return getPool();
}

async function initializeDatabase(): Promise<void> {
  const pool = getPool();

  await execute<ResultSetHeader>(
    pool,
    `
    CREATE TABLE IF NOT EXISTS posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content MEDIUMTEXT NOT NULL,
      created_at VARCHAR(32) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY posts_slug_unique (slug)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `,
  );

  await seedPosts(pool);
}

async function insertPosts(
  pool: Pool,
  posts: typeof PERSIAN_POSTS,
): Promise<void> {
  if (posts.length === 0) return;

  const placeholders = posts.map(() => "(?, ?, ?, ?, ?)").join(", ");
  const values = posts.flatMap((post) => [
    post.title,
    post.slug,
    post.excerpt,
    post.content,
    post.created_at,
  ]);

  await execute<ResultSetHeader>(
    pool,
    `
      INSERT INTO posts (title, slug, excerpt, content, created_at)
      VALUES ${placeholders}
    `,
    values,
  );
}

async function seedPosts(pool: Pool): Promise<void> {
  const countRows = await execute<CountRow[]>(
    pool,
    "SELECT COUNT(*) AS count FROM posts",
  );
  const count = Number(countRows[0]?.count ?? 0);

  if (count === 0) {
    await insertPosts(pool, PERSIAN_POSTS);
    return;
  }

  const legacyRows = await execute<RowDataPacket[]>(
    pool,
    "SELECT slug FROM posts WHERE slug = ? LIMIT 1",
    ["why-i-build-things-on-the-web"],
  );

  if (legacyRows.length > 0) {
    await execute<ResultSetHeader>(pool, "DELETE FROM posts");
    await insertPosts(pool, PERSIAN_POSTS);
  }
}

function isDuplicateEntryError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ER_DUP_ENTRY"
  );
}

export async function getAllPosts(): Promise<Post[]> {
  const pool = await getReadyPool();
  const rows = await execute<PostRow[]>(
    pool,
    "SELECT id, title, slug, excerpt, content, created_at FROM posts ORDER BY created_at DESC",
  );

  return rows;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const pool = await getReadyPool();
  const rows = await execute<PostRow[]>(
    pool,
    "SELECT id, title, slug, excerpt, content, created_at FROM posts WHERE slug = ? LIMIT 1",
    [slug],
  );

  return rows[0];
}

export async function isSlugTaken(slug: string): Promise<boolean> {
  const pool = await getReadyPool();
  const rows = await execute<RowDataPacket[]>(
    pool,
    "SELECT id FROM posts WHERE slug = ? LIMIT 1",
    [slug],
  );

  return rows.length > 0;
}

export async function deletePost(id: number): Promise<void> {
  const pool = await getReadyPool();
  await execute<ResultSetHeader>(pool, "DELETE FROM posts WHERE id = ?", [id]);
}

export async function createPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
}): Promise<Post> {
  const pool = await getReadyPool();

  if (await isSlugTaken(input.slug)) {
    throw new Error("SLUG_TAKEN");
  }

  try {
    const result = await execute<ResultSetHeader>(
      pool,
      `
        INSERT INTO posts (title, slug, excerpt, content, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        input.title,
        input.slug,
        input.excerpt,
        input.content,
        new Date().toISOString(),
      ],
    );

    const rows = await execute<PostRow[]>(
      pool,
      "SELECT id, title, slug, excerpt, content, created_at FROM posts WHERE id = ?",
      [result.insertId],
    );

    const post = rows[0];
    if (!post) {
      throw new Error("POST_CREATE_FAILED");
    }

    return post;
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error("SLUG_TAKEN");
    }

    throw error;
  }
}
