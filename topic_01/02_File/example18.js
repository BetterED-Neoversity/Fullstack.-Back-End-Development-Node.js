import fs from "node:fs/promises";

try {
  await fs.mkdir("new-folder");
  console.log("Директорію створено");
} catch (error) {
  console.error("Помилка створення директорії:", error.message);
}
