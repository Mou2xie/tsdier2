// Definition of the SelectedWordPackage type
import { JsonValue } from 'type-fest';
import { OpenFrom } from './openFrom';

type SelectedWordPackage = JsonValue & {
    selectedText: string;
    sentence: string;
    currentURL: string;
    from: OpenFrom;
}

export { SelectedWordPackage }