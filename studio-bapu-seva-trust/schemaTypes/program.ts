import { defineField, defineType } from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'Education' },
          { title: 'Healthcare', value: 'Healthcare' },
          { title: 'Environment', value: 'Environment' },
          { title: 'Empowerment', value: 'Empowerment' },
          { title: 'Livelihood', value: 'Livelihood' },
          { title: 'Relief', value: 'Relief' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Category Tag (Alternative)',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (BookOpen, Heart, Leaf, Lightbulb, Briefcase, HandHeart)',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Program Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Primary Location',
      type: 'string',
      description: 'e.g. Gujarat & Rajasthan Villages',
    }),
    defineField({
      name: 'beneficiariesCount',
      title: 'Beneficiaries Reached',
      type: 'string',
      description: 'e.g. 12,500+',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'Active',
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
