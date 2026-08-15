import { defineField, defineType } from 'sanity'

export const impactStory = defineType({
  name: 'impactStory',
  title: 'Impact Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
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
    }),
    defineField({
      name: 'name',
      title: 'Beneficiary Name',
      type: 'string',
    }),
    defineField({
      name: 'beneficiaryName',
      title: 'Beneficiary Full Name',
      type: 'string',
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
    }),
    defineField({
      name: 'location',
      title: 'Location / State',
      type: 'string',
      description: 'e.g. Vadnagar, Gujarat',
    }),
    defineField({
      name: 'role',
      title: 'Beneficiary Role / Tag',
      type: 'string',
    }),
    defineField({
      name: 'programCategory',
      title: 'Program Category',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storySummary',
      title: 'Story Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'impactOutcome',
      title: 'Key Impact Outcome',
      type: 'string',
    }),
    defineField({
      name: 'outcomes',
      title: 'List of Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'photo',
      title: 'Beneficiary Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage Carousel',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'photo',
    },
  },
})
