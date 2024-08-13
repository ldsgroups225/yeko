import i18n from '@providers/Localization';
import { Scope, TranslateOptions } from 'i18n-js';

const translate = (key: Scope, props?: TranslateOptions): string => i18n.t(key, props);

/**
 * Translates the given text into the current language.
 *
 * @param text - The text to be translated.
 * @returns The translated text.
 */
export default translate;
