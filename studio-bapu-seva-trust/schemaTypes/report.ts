import { defineField, defineType } from 'sanity'

export const report = defineType({
  name: 'report',
  title: 'Reports & Audits',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Report Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Financial Year',
      type: 'string',
      description: 'e.g. FY 2024-25',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Report Category',
      type: 'string',
      options: {
        list: [
          { title: 'Annual Reports', value: 'Annual Reports' },
          { title: 'Audits & Compliance', value: 'Audits & Compliance' },
          { title: 'Financial Audit', value: 'Financial Audit' },
          { title: 'FCRA Compliance', value: 'FCRA Compliance' },
          { title: 'Impact Evaluation', value: 'Impact Evaluation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'string',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF Document File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Download Link (Optional)',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Key Highlights Summary',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
    },
  },
})
