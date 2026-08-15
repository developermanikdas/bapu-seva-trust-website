import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Designation / Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          { title: 'Trustees', value: 'Trustees' },
          { title: 'Leadership', value: 'Leadership' },
          { title: 'Field Staff', value: 'Field Staff' },
          { title: 'Trustee & Founder', value: 'Trustee & Founder' },
          { title: 'Executive Leadership', value: 'Executive Leadership' },
          { title: 'Field Coordinator', value: 'Field Coordinator' },
          { title: 'Advisory Board', value: 'Advisory Board' },
          { title: 'Volunteer Lead', value: 'Volunteer Lead' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Operating Region',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Priority Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
