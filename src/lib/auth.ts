export const HARDCODED_USERS = [
  { username: "admin", password: "admin123" },
  { username: "vakilnoor", password: "vakilnoor2024" },
];

export function checkCredentials(username: string, password: string): boolean {
  return HARDCODED_USERS.some(
    (u) => u.username === username && u.password === password,
  );
}
