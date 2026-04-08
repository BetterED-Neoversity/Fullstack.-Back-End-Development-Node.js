import prisma from './db.ts'

async function main() {
  // const deleted = await prisma.recipe.delete({
  //   where: { id: 3 },
  // })
  // console.log('Видалено рецепт:', deleted.title)
  // const deleted = await prisma.recipe.delete({
  //   where: { id: 2 },
  // })
  // console.log('Видалено:', deleted.title)

  // // Спочатку видаляємо всі відгуки цього рецепта
  // const deletedReviews = await prisma.review.deleteMany({
  //   where: { recipeId: 2 },
  // })
  // console.log(`Видалено відгуків: ${deletedReviews.count}`)
  // // Тепер можемо безпечно видалити рецепт
  // const deletedRecipe = await prisma.recipe.delete({
  //   where: { id: 2 },
  // })
  // console.log(`Видалено рецепт: ${deletedRecipe.title}`)

  // Спочатку подивимося скільки відгуків має рецепт
  const recipeBefore = await prisma.recipe.findUnique({
    where: { id: 2 },
    include: { reviews: true },
  })

  console.log(
    `Рецепт "${recipeBefore?.title}" має ${recipeBefore?.reviews.length} відгуків`,
  )

  // Видаляємо рецепт - тепер це працює без помилок
  const deleted = await prisma.recipe.delete({
    where: { id: 2 },
  })

  console.log(`Видалено рецепт: ${deleted.title}`)

  // Перевіряємо чи залишилися відгуки
  const orphanedReviews = await prisma.review.findMany({
    where: { recipeId: 2 },
  })

  console.log(`Відгуків після видалення: ${orphanedReviews.length}`)

  const result = await prisma.recipe.deleteMany({
    where: { categoryId: 1 },
  })

  console.log(`Видалено рецептів: ${result.count}`)

  const result_ = await prisma.recipe.deleteMany({
    where: {
      createdAt: {
        lt: new Date('2025-01-01'),
      },
    },
  })

  console.log(`Видалено старих рецептів: ${result_.count}`)

  // const result = await prisma.recipe.deleteMany()

  // console.log(`Видалено всіх рецептів: ${result.count}`)
}

try {
  await main()
} catch (error) {
  console.error(error)
} finally {
  await prisma.$disconnect()
}
