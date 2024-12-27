'use server';

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    // Here you would typically send the email using your email service
    // For now, we'll just log it and return success
    console.log('Contact form submission:', validatedData);

    // In production, you would send this to your email service
    // Example: await sendEmail({
    //   to: "support@interviewmaster.ai",
    //   from: validatedData.email,
    //   subject: validatedData.subject,
    //   text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
    // });

    return {
      success: true,
      message: 'Thank you for your message. We\'ll get back to you soon!',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Invalid form data. Please check your inputs.',
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
