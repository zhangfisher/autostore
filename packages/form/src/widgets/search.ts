import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
/**
 * search 搜索框 widget（继承 input，inputType 固定 search，无自有配置键）
 */
export type AutoFieldSearchOptions = Record<string, never>;
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
// search 是 core 已收录键（AutoWidgetSearch），按 ADR-0004 重叠键规则不重复 declare
