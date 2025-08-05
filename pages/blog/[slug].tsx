import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PostPageProps {
  source: MDXRemoteSerializeResult
  frontMatter: {
    title: string
    [key: string]: any
  }
}

export default function PostPage({ source, frontMatter }: PostPageProps) {
  return (
    <main className="bg-black text-gray-100 min-h-screen p-4">
      <article className="prose prose-invert max-w-3xl mx-auto">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} />
      </article>
    </main>
  )
}

const postsDirectory = path.join(process.cwd(), 'posts')

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const paths = fileNames.map((name) => ({ params: { slug: name.replace(/\.mdx$/, '') } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(fileContents)
  const mdxSource = await serialize(content)
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}
