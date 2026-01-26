import { AutoStore } from 'autostore';
import { LocalTransport } from './src/transports/local';
import { AutoStoreSyncer } from './src/syncer';

const store1 = new AutoStore({
    user: {
        name: 'fisher',
    },
});

const store2 = new AutoStore({
    user: {
        name: 'fisher',
    },
});

let transport1: LocalTransport;
let transport2: LocalTransport;

transport1 = new LocalTransport({ getPeer: () => transport2 });
transport2 = new LocalTransport({ getPeer: () => transport1 });

// forward 模式：store1 -> store2
const syncer1 = new AutoStoreSyncer(store1, {
    transport: transport1,
    direction: 'forward',
    immediate: false,
});

const syncer2 = new AutoStoreSyncer(store2, {
    transport: transport2,
    direction: 'backward',
    immediate: false,
});

console.log('Before change:');
console.log('store1.state.user.name:', store1.state.user.name);
console.log('store2.state.user.name:', store2.state.user.name);
console.log('syncer1.seq:', syncer1['seq']);
console.log('syncer2.seq:', syncer2['seq']);

store1.state.user.name = 'alice';

console.log('\nAfter change:');
console.log('store1.state.user.name:', store1.state.user.name);
console.log('store2.state.user.name:', store2.state.user.name);

console.log('\nExpected: store2 should be "alice"');
