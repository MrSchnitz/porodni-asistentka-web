'use client'

import { Input } from '@/components/ui/input'
import { PageHeader } from '@/globals/Pages/components/PageHeader'
import { BlogPostCard } from '@/globals/Pages/Blog/components/BlogPostCard/BlogPostCard'
import { Blog, BlogCategory, PageHeader as PageHeaderType } from '@/payload-types'
import { hasData } from '@/utilities/payload'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type BlogPostItem = {
  blogPost?: (string | null) | Blog
  id?: string | null
}

type Props = {
  pageHeader: PageHeaderType
  items: BlogPostItem[] | null | undefined
  categories: string[]
}

/** Removes diacritics for comparison (Czech accents, hooks, etc.) */
function normalizeForSearch(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getSearchableText(post: Blog): string {
  const parts: string[] = [post.title ?? '']
  if (post.author) parts.push(post.author)
  const category = post.category as BlogCategory | null | undefined
  if (category?.title) parts.push(category.title)
  return parts.join(' ').toLowerCase()
}

const ALL_CATEGORIES_TITLE = 'Všechny'

export function BlogPostListWithSearch({ pageHeader, items, categories }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(ALL_CATEGORIES_TITLE)

  const filteredPosts = useMemo(() => {
    if (!items?.length) return []

    const filteredItems =
      selectedCategory && selectedCategory !== ALL_CATEGORIES_TITLE
        ? items.filter(
            ({ blogPost }) =>
              hasData(blogPost) &&
              hasData(blogPost?.category) &&
              blogPost?.category?.title === selectedCategory,
          )
        : items

    const term = searchTerm.trim()
    if (!term) {
      return filteredItems.filter(({ blogPost }) => hasData(blogPost)) as { blogPost: Blog }[]
    }
    const normalizedTerm = normalizeForSearch(term)
    return filteredItems
      .filter(({ blogPost }) => {
        if (!hasData(blogPost)) return false
        const post = blogPost as Blog
        const searchable = getSearchableText(post)
        return normalizeForSearch(searchable).includes(normalizedTerm)
      })
      .map(({ blogPost }) => ({ blogPost: blogPost as Blog }))
  }, [items, searchTerm, selectedCategory])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm('')
  }

  const allCategories = categories.length > 1 ? [ALL_CATEGORIES_TITLE, ...categories] : []

  return (
    <>
      <PageHeader data={pageHeader}>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <Input
            type="text"
            placeholder="Hledat články..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 bg-card border-primary/30"
            aria-label="Hledat články"
          />
        </div>
      </PageHeader>

      {/* Categories */}
      {allCategories.length > 0 && (
        <section className="py-8 border-y border-primary/20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-primary hover:bg-secondary text-foreground'
                      : 'border-primary/30 text-foreground hover:bg-primary/10'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length === 0 ? (
              <p className="col-span-full text-center text-foreground/60 py-8">
                {searchTerm.trim()
                  ? 'Žádné články nevyhovují hledanému výrazu.'
                  : 'Žádné články k zobrazení.'}
              </p>
            ) : (
              filteredPosts.map(({ blogPost }) => (
                <BlogPostCard key={(blogPost as Blog).id} post={blogPost as Blog} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
