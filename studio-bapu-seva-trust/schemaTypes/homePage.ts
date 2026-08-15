import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Sub-Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Sub-Tagline',
      type: 'string',
    }),
    defineField({
      name: 'locationBadge',
      title: 'Location Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'impactStat1Number',
      title: 'Impact Stat 1 Number',
      type: 'string',
    }),
    defineField({
      name: 'impactStat1Label',
      title: 'Impact Stat 1 Label',
      type: 'string',
    }),
    defineField({
      name: 'impactStat2Number',
      title: 'Impact Stat 2 Number',
      type: 'string',
    }),
    defineField({
      name: 'impactStat2Label',
      title: 'Impact Stat 2 Label',
      type: 'string',
    }),
    defineField({
      name: 'impactStat3Number',
      title: 'Impact Stat 3 Number',
      type: 'string',
    }),
    defineField({
      name: 'impactStat3Label',
      title: 'Impact Stat 3 Label',
      type: 'string',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutParagraph1',
      title: 'About Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aboutParagraph2',
      title: 'About Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
