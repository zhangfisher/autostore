import { observable, action, computed, makeObservable } from 'mobx';

export class MobxStore {  
  a0 = 50;
  constructor() {
    makeObservable(this, {
      a0: observable,
      a1: computed,
      a2: computed,
      a3: computed,
      a4: computed,
      a5: computed,
      a6: computed,
      a7: computed,
      a8: computed,
      a9: computed,
      a10: computed,
      setA0: action,
    });
  }
  get a1() { return this.a0 + 1; }
  get a2() { return this.a1 + 1; }
  get a3() { return this.a2 + 1; }
  get a4() { return this.a3 + 1; }
  get a5() { return this.a4 + 1; }
  get a6() { return this.a5 + 1; }
  get a7() { return this.a6 + 1; }
  get a8() { return this.a7 + 1; }
  get a9() { return this.a8 + 1; }
  get a10(){ return this.a9 + 1; }
  setA0(value: number) {
    this.a0 = value;
  }
}

 