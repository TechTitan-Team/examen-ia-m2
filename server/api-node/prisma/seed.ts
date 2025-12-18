import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import path from 'path'

const prisma = new PrismaClient()

const french = async () => {
  // French Dictionary Data
  let french = fs.readFileSync(path.resolve(__dirname, 'mot_francais.json'), 'utf8')
  let frenchDictionary = JSON.parse(french)

  for await (let word of frenchDictionary) {
    let data = {
      word,
      length: word.length
    }

    let res = await prisma.frenchWords.upsert({
      where: { word: word },
      update: {},
      create: data,
    })
    console.log(`French dictionary creation...`)
  }
  console.log("French dictionary created")
}


async function main() {
  console.log(`==> Creation of all dictionary, please wait for a minute.`)
  await french()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
