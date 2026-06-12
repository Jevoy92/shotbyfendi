export type WorkItem = {
  src: string
  title: string
  category: string
  year: string
  span?: 'tall' | 'wide' | 'normal'
}

export const works: WorkItem[] = [
  {
    src: '/images/work-alley-golden.jpg',
    title: 'Mariners Heritage',
    category: 'Brand · Editorial',
    year: '2025',
    span: 'tall',
  },
  {
    src: '/images/work-greatwheel-portrait.jpg',
    title: 'Pier Light',
    category: 'Lifestyle',
    year: '2025',
    span: 'normal',
  },
  {
    src: '/images/work-stairs-lowangle.jpg',
    title: 'Downtown Hours',
    category: 'Brand Film',
    year: '2025',
    span: 'tall',
  },
  {
    src: '/images/work-waterfront-laugh.jpg',
    title: 'West of the Sound',
    category: 'Editorial',
    year: '2025',
    span: 'wide',
  },
  {
    src: '/images/work-cherry-blossom.jpg',
    title: 'First of Spring',
    category: 'Lifestyle',
    year: '2025',
    span: 'normal',
  },
  {
    src: '/images/work-alley-green.jpg',
    title: 'Verdant',
    category: 'Editorial',
    year: '2025',
    span: 'tall',
  },
  {
    src: '/images/work-greatwheel-smile.jpg',
    title: 'Carousel',
    category: 'Brand',
    year: '2025',
    span: 'normal',
  },
  {
    src: '/images/work-alley-arm.jpg',
    title: 'Hold Still',
    category: 'Editorial',
    year: '2025',
    span: 'tall',
  },
]
