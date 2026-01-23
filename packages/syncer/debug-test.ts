import { AutoStore, computed } from './core/src/index';
import { AutoStoreSyncer } from './syncer/src/syncer';
import { LocalTransport } from './syncer/src/transports/local';

const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0));

async function main() {
    let localTransport: LocalTransport;
    let remoteTransport: LocalTransport;
    localTransport = new LocalTransport({getPeer:() => remoteTransport});
    remoteTransport = new LocalTransport({getPeer:() => localTransport});
    
    const localStore = new AutoStore({
        order: {
            price: 100,
            count: 2,
            total: computed((order) => order.price * order.count),
        },
    }, { id: 'localStore' });
    
    const remoteStore = new AutoStore({
        order: {
            price: 100,
            count: 2,
            total: computed((order) => order.price * order.count),
        },
    }, { id: 'remoteStore' });

    console.log('localStore.id:', localStore.id);
    console.log('remoteStore.id:', remoteStore.id);

    const localSyncer = new AutoStoreSyncer(localStore, { transport: localTransport });
    const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

    console.log('localSyncer.id:', localSyncer.id);
    console.log('remoteSyncer.id:', remoteSyncer.id);
    console.log('localTransport connected:', localTransport.connected);
    console.log('remoteTransport connected:', remoteTransport.connected);
    console.log('localTransport receivers:', Array.from(localTransport.receivers.keys()));
    console.log('remoteTransport receivers:', Array.from(remoteTransport.receivers.keys()));

    await waitForNextTick();
    
    console.log('\n修改 localStore.state.order.count = 3');
    localStore.state.order.count = 3;
    
    await waitForNextTick();
    
    console.log('\n修改后:');
    console.log('localStore.state:', localStore.state);
    console.log('remoteStore.state:', remoteStore.state);
}

main().catch(console.error);
