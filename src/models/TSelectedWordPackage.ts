// Definition of the SelectedWordPackage type
import { JsonValue } from 'type-fest';
import { EOpenFrom } from './EOpenFrom';

type TSelectedWordPackage = JsonValue & {
    selectedText: string;
    sentence: string;
    currentURL: string;
    from: EOpenFrom;
}

export { TSelectedWordPackage }