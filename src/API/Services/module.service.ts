import { ModuleResponse } from '@/lib/types/module.types';

export class ModuleService {
    static async getModules(lang: string): Promise<ModuleResponse> {
        const res = await fetch(`http://194.163.159.104:7044/api/Modules?lang=${lang}`, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': lang,
            },
        });
        if (!res.ok) throw new Error('Failed to fetch modules');
        return res.json();
    }
}
