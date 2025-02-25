import { ISupabaseRes } from "@/models/ISupabaseRes";
import { ITranslation } from "@/models/ITranslation";

function translationHandler(translation: ISupabaseRes) {

    const output: ITranslation = {
        word: '',
        translation: [],
    };

    //deal with word.
    output.word = translation.word;

    //deal with phonetic.
    output.phonetic = translation.phonetic;

    //deal with chinese translation.
    output.translation = translation.translation?.split('\\n')
        .map((item) => {
            if (item.includes('.')) {
                return item.split('.') as [string, string];
            } else {
                return ['', item] as [string, string];
            }
        }
        );

    //deal with definition.
    output.definition = translation.definition?.split('\\n').map((item) => {
        if (item.includes('.')) {
            return item.split('.') as [string, string];
        } else {
            return ['', item] as [string, string];
        }
    });

    //deal with tags.
    if (translation.tag) {
        const tags = translation.tag.split(' ');
        output.tag = tags.map((item) => {
            switch (item) {
                case 'zk': {
                    return '中考';
                }
                case 'gk': {
                    return '高考';
                }
                case 'cet4': {
                    return '4级';
                }
                case 'cet6': {
                    return '6级';
                }
                case 'ky': {
                    return '考研';
                }
                case 'ielts': {
                    return '雅思';
                }
                case 'toefl': {
                    return '托福';
                }
                case 'gre': {
                    return 'GRE';
                }
                default: {
                    return '4级';
                }
            }
        });
    }

    //deal with exchange.
    if (translation.exchange) {
        const exchange = translation.exchange.split('/');

        output.exchange = exchange.map((item) => {
            const itemArr = item.split(':');
            switch (itemArr[0]) {
                case 'p': {
                    itemArr[0] = '过去式';
                    break;
                }
                case 'd': {
                    itemArr[0] = '过去分词';
                    break;
                }
                case 'i': {
                    itemArr[0] = '现在分词';
                    break;
                }
                case '3': {
                    itemArr[0] = '第三人称单数';
                    break;
                }
                case 'r': {
                    itemArr[0] = '比较级';
                    break;
                }
                case 't': {
                    itemArr[0] = '最高级';
                    break;
                }
                case 's': {
                    itemArr[0] = '复数形式';
                    break;
                }
                case '0': {
                    itemArr[0] = '词元';
                    break;
                }
                default: {
                    itemArr[0] = '变体';
                }
            }
            return itemArr as [string, string];
        });
    }

    return output as ITranslation;
}

export { translationHandler }
