import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"])

function isSafeFolder(folder: string) {
  return /^[a-zA-Z0-9/_-]+$/.test(folder) && !folder.includes("..")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder")

  if (!folder || !isSafeFolder(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 })
  }

  const absoluteFolder = path.join(process.cwd(), "public", "images", "ipp", folder)

  try {
    const entries = await fs.readdir(absoluteFolder, { withFileTypes: true })

    const resources = entries
      .filter((entry) => entry.isFile())
      .map((entry) => ({
        entry,
        extension: path.extname(entry.name).toLowerCase(),
      }))
      .filter(({ extension }) => IMAGE_EXTENSIONS.has(extension))
      .sort((a, b) => a.entry.name.localeCompare(b.entry.name, undefined, { numeric: true }))
      .map(({ entry, extension }) => ({
        title: path.parse(entry.name).name,
        type: extension.replace(".", "").toUpperCase(),
        image: `/images/ipp/${folder}/${entry.name}`,
      }))

    return NextResponse.json(resources)
  } catch {
    return NextResponse.json([])
  }
}
