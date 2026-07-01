import { getVal } from "autostore";
import { TemplateDirectiveBase } from "../directive";

export class TextDirective extends TemplateDirectiveBase {
    override created(): void {
        this.watch(this.value, ({ value }) => {
            if (this.el) this.el.innerText = value;
        });
    }
    override compile() {
        if (this.el) {
            this.el.innerText = getVal(this.engine.store.state, this.value);
        }
    }
}
