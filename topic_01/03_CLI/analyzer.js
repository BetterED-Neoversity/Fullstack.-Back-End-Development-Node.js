import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'

// Отримуємо шлях з аргументів
const targetPath = process.argv[2]

if (!targetPath) {
  console.error('Помилка: не вказано шлях до директорії')
  console.log('Використання: node analyzer.js <шлях>')
  process.exit(1)
}

// Функція аналізу директорії
async function analyzeDirectory(dirPath) {
  const stats = {
    totalFiles: 0,
    totalDirs: 0,
    totalSize: 0,
    extensions: {},
    largestFiles: [],
  }

  async function scan(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        stats.totalDirs++
        await scan(fullPath)
      } else if (entry.isFile()) {
        stats.totalFiles++

        const fileStat = await fs.stat(fullPath)
        stats.totalSize += fileStat.size

        const ext = path.extname(entry.name) || 'без розширення'
        if (!stats.extensions[ext]) {
          stats.extensions[ext] = { count: 0, size: 0 }
        }
        stats.extensions[ext].count++
        stats.extensions[ext].size += fileStat.size

        stats.largestFiles.push({
          name: entry.name,
          path: fullPath,
          size: fileStat.size,
        })
      }
    }
  }

  await scan(dirPath)

  stats.largestFiles.sort((a, b) => b.size - a.size)
  stats.largestFiles = stats.largestFiles.slice(0, 5)

  return stats
}

// Форматування розміру
function formatSize(bytes) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`
}

// Виведення статистики
function printStats(stats) {
  console.log('Статистика:')
  console.log(`- Всього файлів: ${stats.totalFiles}`)
  console.log(`- Всього директорій: ${stats.totalDirs}`)
  console.log(`- Загальний розмір: ${formatSize(stats.totalSize)}\n`)

  console.log('Файли за розширеннями:')
  const sortedExts = Object.entries(stats.extensions).sort(
    ([, a], [, b]) => b.count - a.count,
  )

  for (const [ext, data] of sortedExts) {
    const fileWord =
      data.count === 1 ? 'файл' : data.count < 5 ? 'файли' : 'файлів'
    console.log(
      `- ${ext}: ${data.count} ${fileWord} (${formatSize(data.size)})`,
    )
  }

  if (stats.largestFiles.length > 0) {
    console.log('\nТоп-5 найбільших файлів:')
    stats.largestFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} - ${formatSize(file.size)}`)
    })
  }
}

// Головна функція
async function main() {
  console.log('=== Аналізатор директорій ===')
  console.log(`Система: ${os.platform()} (${os.arch()})`)
  console.log(`Аналіз директорії: ${path.resolve(targetPath)}\n`)

  try {
    const stats = await analyzeDirectory(targetPath)
    printStats(stats)
  } catch (error) {
    console.error('Помилка:', error.message)
    process.exit(1)
  }
}

main()
