import z from "zod";

export const allowedDomains = [
  "gmail.com",
  "mail.ru",
  "yandex.ru",
  "yandex.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "bk.ru",
  "list.ru",
  "inbox.ru",
  "yahoo.com",
];
export const emailFormShema = z.email({ message: "Email is required" }).refine(
  (email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    return allowedDomains.includes(domain);
  },
  {
    message: "Разрешены только популярные почтовые сервисы",
  },
);
