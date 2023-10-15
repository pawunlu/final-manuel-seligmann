import { Language } from '../../../database/models';
import { LanguageDto } from '../dtos';

type LanguageMapperOptions = {
  // Language Mapper Options goes here
};

export function languageToLanguageDtoMapper(
  language: Language,
  config?: LanguageMapperOptions,
): LanguageDto {
  let {} = config || {};

  return {
    id: language.id,
    name: language.name,
    createdAt: language.createdAt,
  };
}
