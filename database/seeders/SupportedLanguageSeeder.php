<?php

namespace Database\Seeders;

use App\Models\SupportedLanguage;
use Illuminate\Database\Seeder;

class SupportedLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SupportedLanguage::truncate();
        $languages = [
            ['name' => 'Afrikaans', 'code' => 'af', 'type' => 'ltr'],
            ['name' => 'Amharic', 'code' => 'am', 'type' => 'ltr'],
            ['name' => 'Arabic', 'code' => 'ar', 'type' => 'rtl'],
            ['name' => 'Assamese', 'code' => 'as', 'type' => 'ltr'],
            ['name' => 'Azerbaijani', 'code' => 'az', 'type' => 'ltr'],
            ['name' => 'Belarusian', 'code' => 'be', 'type' => 'ltr'],
            ['name' => 'Bulgarian', 'code' => 'bg', 'type' => 'ltr'],
            ['name' => 'Bengali (Bangla)', 'code' => 'bn', 'type' => 'ltr'],
            ['name' => 'Bosnian', 'code' => 'bs', 'type' => 'ltr'],
            ['name' => 'Catalan (Valencian)', 'code' => 'ca', 'type' => 'ltr'],
            ['name' => 'Czech', 'code' => 'cs', 'type' => 'ltr'],
            ['name' => 'Welsh', 'code' => 'cy', 'type' => 'ltr'],
            ['name' => 'Danish', 'code' => 'da', 'type' => 'ltr'],
            ['name' => 'German', 'code' => 'de', 'type' => 'ltr'],
            ['name' => 'Modern Greek', 'code' => 'el', 'type' => 'ltr'],
            ['name' => 'English', 'code' => 'en', 'type' => 'ltr'],
            ['name' => 'Spanish (Castilian)', 'code' => 'es', 'type' => 'ltr'],
            ['name' => 'Estonian', 'code' => 'et', 'type' => 'ltr'],
            ['name' => 'Basque', 'code' => 'eu', 'type' => 'ltr'],
            ['name' => 'Persian', 'code' => 'fa', 'type' => 'rtl'],
            ['name' => 'Finnish', 'code' => 'fi', 'type' => 'ltr'],
            ['name' => 'Filipino (Pilipino)', 'code' => 'fil', 'type' => 'ltr'],
            ['name' => 'French', 'code' => 'fr', 'type' => 'ltr'],
            ['name' => 'Galician', 'code' => 'gl', 'type' => 'ltr'],
            ['name' => 'Swiss German (Alemannic, Alsatian)', 'code' => 'gsw', 'type' => 'ltr'],
            ['name' => 'Gujarati', 'code' => 'gu', 'type' => 'ltr'],
            ['name' => 'Hebrew', 'code' => 'he', 'type' => 'rtl'],
            ['name' => 'Hindi', 'code' => 'hi', 'type' => 'ltr'],
            ['name' => 'Croatian', 'code' => 'hr', 'type' => 'ltr'],
            ['name' => 'Hungarian', 'code' => 'hu', 'type' => 'ltr'],
            ['name' => 'Armenian', 'code' => 'hy', 'type' => 'ltr'],
            ['name' => 'Indonesian', 'code' => 'id', 'type' => 'ltr'],
            ['name' => 'Icelandic', 'code' => 'is', 'type' => 'ltr'],
            ['name' => 'Italian', 'code' => 'it', 'type' => 'ltr'],
            ['name' => 'Japanese', 'code' => 'ja', 'type' => 'ltr'],
            ['name' => 'Georgian', 'code' => 'ka', 'type' => 'ltr'],
            ['name' => 'Kazakh', 'code' => 'kk', 'type' => 'ltr'],
            ['name' => 'Khmer (Central Khmer)', 'code' => 'km', 'type' => 'ltr'],
            ['name' => 'Kannada', 'code' => 'kn', 'type' => 'ltr'],
            ['name' => 'Korean', 'code' => 'ko', 'type' => 'ltr'],
            ['name' => 'Kirghiz (Kyrgyz)', 'code' => 'ky', 'type' => 'ltr'],
            ['name' => 'Lao', 'code' => 'lo', 'type' => 'ltr'],
            ['name' => 'Lithuanian', 'code' => 'lt', 'type' => 'ltr'],
            ['name' => 'Latvian', 'code' => 'lv', 'type' => 'ltr'],
            ['name' => 'Macedonian', 'code' => 'mk', 'type' => 'ltr'],
            ['name' => 'Malayalam', 'code' => 'ml', 'type' => 'ltr'],
            ['name' => 'Mongolian', 'code' => 'mn', 'type' => 'ltr'],
            ['name' => 'Marathi', 'code' => 'mr', 'type' => 'ltr'],
            ['name' => 'Malay', 'code' => 'ms', 'type' => 'ltr'],
            ['name' => 'Burmese', 'code' => 'my', 'type' => 'ltr'],
            ['name' => 'Norwegian Bokmål', 'code' => 'nb', 'type' => 'ltr'],
            ['name' => 'Nepali', 'code' => 'ne', 'type' => 'ltr'],
            ['name' => 'Dutch (Flemish)', 'code' => 'nl', 'type' => 'ltr'],
            ['name' => 'Norwegian', 'code' => 'no', 'type' => 'ltr'],
            ['name' => 'Oriya', 'code' => 'or', 'type' => 'ltr'],
            ['name' => 'Panjabi (Punjabi)', 'code' => 'pa', 'type' => 'ltr'],
            ['name' => 'Polish', 'code' => 'pl', 'type' => 'ltr'],
            ['name' => 'Pushto (Pashto)', 'code' => 'ps', 'type' => 'rtl'],
            ['name' => 'Portuguese', 'code' => 'pt', 'type' => 'ltr'],
            ['name' => 'Romanian (Moldavian, Moldovan)', 'code' => 'ro', 'type' => 'ltr'],
            ['name' => 'Russian', 'code' => 'ru', 'type' => 'ltr'],
            ['name' => 'Sinhala (Sinhalese)', 'code' => 'si', 'type' => 'ltr'],
            ['name' => 'Slovak', 'code' => 'sk', 'type' => 'ltr'],
            ['name' => 'Slovenian', 'code' => 'sl', 'type' => 'ltr'],
            ['name' => 'Albanian', 'code' => 'sq', 'type' => 'ltr'],
            ['name' => 'Serbian', 'code' => 'sr', 'type' => 'ltr'],
            ['name' => 'Swedish', 'code' => 'sv', 'type' => 'ltr'],
            ['name' => 'Swahili', 'code' => 'sw', 'type' => 'ltr'],
            ['name' => 'Tamil', 'code' => 'ta', 'type' => 'ltr'],
            ['name' => 'Telugu', 'code' => 'te', 'type' => 'ltr'],
            ['name' => 'Thai', 'code' => 'th', 'type' => 'ltr'],
            ['name' => 'Tagalog', 'code' => 'tl', 'type' => 'ltr'],
            ['name' => 'Turkish', 'code' => 'tr', 'type' => 'ltr'],
            ['name' => 'Ukrainian', 'code' => 'uk', 'type' => 'ltr'],
            ['name' => 'Urdu', 'code' => 'ur', 'type' => 'rtl'],
            ['name' => 'Uzbek', 'code' => 'uz', 'type' => 'ltr'],
            ['name' => 'Vietnamese', 'code' => 'vi', 'type' => 'ltr'],
            ['name' => 'Chinese', 'code' => 'zh', 'type' => 'ltr'],
            ['name' => 'Zulu', 'code' => 'zu', 'type' => 'ltr'],
        ];
        foreach ($languages as $language){
            SupportedLanguage::create($language);
        }
    }
}
