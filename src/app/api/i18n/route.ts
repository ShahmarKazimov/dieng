// app/api/i18n/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    if (!lang) {
        return NextResponse.json(
            { error: 'Language parameter is required' },
            { status: 400 }
        );
    }

    try {
        const staticTranslations = await import(`@/locales/${lang}.json`);
        const translationData = staticTranslations.default || staticTranslations;
        return NextResponse.json(translationData);
    } catch (staticError) {
        console.error('Static translation fallback failed:', staticError);
        return NextResponse.json(
            { error: 'Failed to load translations' },
            { status: 500 }
        );
    }
}