import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldSearchOptions = Required<any>;
@tag('auto-field-search')
export class AutoFieldSearch extends AutoFieldInput {
    getInputType(): InputType {
        return 'search';
    }
    getInitialOptions(): Record<string, any> {
        return {
            icon: 'search',
            placeholder: 'Search',
        };
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-search': AutoFieldSearch;
    }
}
