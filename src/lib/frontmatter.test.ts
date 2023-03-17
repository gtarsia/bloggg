import { frontmatter } from './frontmatter'

test('frontmatter', () => {
  const doc = `\
---
qwe: asd
zxc: una cosa que lei
---

Este es el document
es un poco una locura`
  expect(frontmatter(doc)).toStrictEqual({
    attributes: { qwe: 'asd', zxc: 'una cosa que lei' },
    lines: [
      '',
      'Este es el document',
      'es un poco una locura',
    ],
  })
})
