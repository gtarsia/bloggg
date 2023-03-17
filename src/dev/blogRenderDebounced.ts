import { blogRender } from '@/src/blog/render'
import { debounce } from '@/src/lib/debounce'
import {
  devStoreLayoutGet, devStorePostsGet, devStoreRootGet
} from '@/src/dev/store'

export const devBlogRenderDebounced = debounce(() => {
  const root = devStoreRootGet()
  const layout = devStoreLayoutGet()
  const posts = devStorePostsGet()
  if (root && layout && posts) {
    return blogRender({ layout, posts, root })
  }
}, 50)
