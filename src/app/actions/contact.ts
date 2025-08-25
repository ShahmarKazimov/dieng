'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { contactService } from '@/API/Services/contact.service';
import { ContactFormState } from '@/lib/types/contact.types';

const contactSchema = z.object({
    name: z.string().min(1, 'First name is required'),
    surname: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters long'),
});


export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    // Get language information from headers - same pattern as blog service
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    const lang = acceptLanguage?.split(',')[0]?.split('-')[0] || 'en';

    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check the form fields.',
        };
    }

    try {
        const isSuccess = await contactService.submitContactForm(validatedFields.data, lang);

        if (isSuccess) {
            return {
                message: 'Your message has been sent successfully!',
                success: true,
            };
        }

        return {
            message: 'An error occurred. Please try again later.',
            success: false,
        };
    } catch (error) {
        console.error('Contact form action error:', error);
        return {
            message: 'An error occurred. Please try again later.',
            success: false,
        };
    }

}
