CREATE TABLE posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content MEDIUMTEXT NOT NULL,
  created_at VARCHAR(32) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY posts_slug_unique (slug)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
