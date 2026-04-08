# 02_File

Навчальні приклади по вбудованих модулях Node.js для роботи з ОС, шляхами та файловою системою (`os`, `process`, `path`, `fs/promises`).

## Приклади

- [`example01.js`](./example01.js) - вивід базової інформації про ОС через `os` (платформа, CPU, пам'ять, tmp-директорія).
- [`example02.js`](./example02.js) - перегляд аргументів командного рядка через `process.argv`.
- [`example03.js`](./example03.js) - інформація про поточний процес (`pid`, `execPath`, `version`, `cwd`).
- [`example04.js`](./example04.js) - обробка завершення процесу та встановлення коду виходу.
- [`example05.js`](./example05.js) - розбір шляху: директорія, ім'я файлу, розширення.
- [`example06.js`](./example06.js) - побудова шляху через `path.join()`.
- [`example07.js`](./example07.js) - побудова абсолютного шляху через `path.resolve()`.
- [`example08.js`](./example08.js) - отримання `__filename`/`__dirname` в ESM через `fileURLToPath(import.meta.url)`.
- [`example09.js`](./example09.js) - читання текстового файлу (`utf8`) з обробкою помилок.
- [`example10.js`](./example10.js) - читання файлу як `Buffer` і конвертація в рядок.
- [`example11.js`](./example11.js) - запис нового файлу через `fs.writeFile()`.
- [`example12.js`](./example12.js) - дописування даних у файл через `fs.appendFile()` (з/без переносу рядка).
- [`example13.js`](./example13.js) - видалення файлу через `fs.unlink()`.
- [`example14.js`](./example14.js) - обробка помилки `ENOENT`, коли файл не існує.
- [`example15.js`](./example15.js) - читання вмісту директорії через `fs.readdir()`.
- [`example16.js`](./example16.js) - відрізнення файлів і папок (`withFileTypes`, `isFile`, `isDirectory`).
- [`example17.js`](./example17.js) - фільтрація тільки `.txt` файлів у директорії.
- [`example18.js`](./example18.js) - створення нової директорії через `fs.mkdir()`.
- [`example19.js`](./example19.js) - отримання метаданих файлу через `fs.stat()`.
- [`example20.js`](./example20.js) - конвертація розміру файлу в KB/MB.
- [`example21.js`](./example21.js) - перевірка UNIX-прав доступу через `mode` та бітову маску.
- [`example22.js`](./example22.js) - базова перевірка доступності файлу через `fs.access()`.
- [`example23.js`](./example23.js) - детальна перевірка прав доступу (`F_OK`, `R_OK`, `W_OK`, `X_OK`).
- [`example24.js`](./example24.js) - безпечне читання файлу з розбором типових помилок (`ENOENT`, `EACCES`).

## Додаткові файли

- [`example.txt`](./example.txt) - тестовий вхідний файл, який використовується в частині прикладів.
