import { z } from 'zod'

const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().min(0),
})

const result = UserSchema.safeParse({ name: 'Alice', age: 25 })
// result.success === true
// result.data === { name: 'Alice', age: 25 }

console.log(result)

const result2 = UserSchema.safeParse({ name: 'Bob', age: -5 })
// result2.success === false
// result2.error містить деталі що саме не так

console.log(result2.error?.message)
