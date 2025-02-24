
import { JsonValue } from 'type-fest';

type SelectedWordPackage = JsonValue & {
    selectedText: string;
    sentence: string;
    currentURL: string;
}

export { SelectedWordPackage }