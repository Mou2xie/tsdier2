// Definition: Interface for Supabase client response (raw data from dictionary)

interface ISupabaseRes {
    id: number;
    word: string;
    translation: string;
    tag?: string;
    phonetic?: string;
    exchange?: string;
    definition?: string;
}

export { ISupabaseRes }