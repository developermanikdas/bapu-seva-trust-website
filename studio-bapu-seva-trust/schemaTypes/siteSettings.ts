import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site & Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'trustName',
      title: 'Trust Official Name',
      type: 'string',
      initialValue: 'Bapu Seva Trust',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Empowering communities and building hope since 2021.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone Number',
      type: 'string',
      initialValue: '+91 98100 54321',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email Address',
      type: 'string',
      initialValue: 'contact@bapuseva.org',
    }),
    defineField({
      name: 'donationEmail',
      title: 'Donation & 80G Support Email',
      type: 'string',
      initialValue: 'donate@bapuseva.org',
    }),
    defineField({
      name: 'registeredAddress',
      title: 'Registered Office Address',
      type: 'text',
      rows: 2,
      initialValue: 'Bapu Seva Trust Office, Sector 4, R.K. Puram, New Delhi - 110022',
    }),
    defineField({
      name: 'taxRegistrationNumber',
      title: '80G / 12A Registration Details',
      type: 'string',
      initialValue: '80G Reg No: AAATB9918F20214 | 12A Reg No: AAATB9918FE20211',
    }),
    defineField({
      name: 'upiId',
      title: 'Official Trust UPI ID',
      type: 'string',
      initialValue: 'bapuseva@upi',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
      ],
    }),
  ],
})
