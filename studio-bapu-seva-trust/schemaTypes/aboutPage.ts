import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Rooted in Dignity & Grassroots Action',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'About Bapu Seva Trust',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue: 'Fostering self-reliance, inclusive growth, and equal opportunity for marginalized communities across Bihar, Navi Mumbai, and Delhi.',
    }),
    defineField({
      name: 'ourStoryTitle',
      title: 'Our Story Title',
      type: 'string',
      initialValue: 'Our Story & Philosophy',
    }),
    defineField({
      name: 'ourStoryContent',
      title: 'Our Story Detailed Paragraphs',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'founderQuote',
      title: 'Founder / Leadership Message',
      type: 'text',
      rows: 3,
      initialValue: 'Dignity is not a privilege to be granted; it is the fundamental right of every child, woman, and family in our society.',
    }),
    defineField({
      name: 'founderName',
      title: 'Founder / Managing Trustee Name',
      type: 'string',
      initialValue: 'Trustees & Ground Team',
    }),
    defineField({
      name: 'coreValues',
      title: 'Core Values List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Value Title', type: 'string' }),
            defineField({ name: 'description', title: 'Value Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
  ],
})
