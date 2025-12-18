import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import path from 'path'

const prisma = new PrismaClient()

const mg = async () => {
  // mg Dictionary Data
  let mg = fs.readFileSync(path.resolve(__dirname, 'teny_malagasy_clean.json'), 'utf8')
  let mgDictionary = JSON.parse(mg)

  for await (let word of mgDictionary) {
    let w = word.word
    let data = {
      word: w,
      length: w.length
    }

    let res = await prisma.mgWords.upsert({
      where: { word: w },
      update: {},
      create: data,
    })
    console.log(`mg dictionary creation...`)
  }
  console.log("mg dictionary created")
}


async function main() {
  console.log(`==> Creation of all dictionary, please wait for a minute.`)
  await mg()
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
