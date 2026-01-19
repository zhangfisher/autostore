/* eslint-disable @typescript-eslint/no-unused-vars */
/** biome-ignore-all lint/correctness/noUnusedVariables: <noUnusedVariables> */
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { computed, AutoStore } from '../../../core/src';
import { AutoStoreSyncer } from '../syncer';
import type { IAutoStoreSyncTransport, StateRemoteOperate } from '../types';

describe('AutoStoreSyncer 功能特性测试', () => {
	// 为每个测试创建独立的 transport 实例
	let localTransport: MockTransport;
	let remoteTransport: MockTransport;

	beforeEach(() => {
		localTransport = new MockTransport(() => remoteTransport);
		remoteTransport = new MockTransport(() => localTransport);
	});

	class MockTransport implements IAutoStoreSyncTransport {
		ready = true;
		receiveCallback: any;
		isStop: boolean = false;
		sendDelay: number = 0;
		sendCount: number = 0;
		receiveCount: number = 0;
		constructor(public getPeer: () => MockTransport) {}
		send(operate: StateRemoteOperate) {
			this.sendCount++;
			if (this.sendDelay > 0) {
				setTimeout(() => {
					if (this.getPeer().receiveCallback) {
						this.getPeer().receiveCallback(operate);
					}
				}, this.sendDelay);
			} else {
				if (this.getPeer().receiveCallback) {
					this.getPeer().receiveCallback(operate);
				}
			}
		}
		receive(callback: any) {
			this.receiveCallback = callback;
			this.receiveCount++;
		}
		onStop() {
			this.isStop = true;
		}
		reset() {
			this.sendCount = 0;
			this.receiveCount = 0;
			this.isStop = false;
		}
		stop() {
			this.isStop = true;
		}
	}

	describe('filter 选项', () => {
		test('过滤特定路径不同步', () => {
			const localStore = new AutoStore({
				user: {
					name: 'fisher',
					age: 30,
					password: 'secret123',
				},
			});
			const remoteStore = new AutoStore({
				user: {
					name: '',
					age: 0,
				},
			});

			const localSyncer = new AutoStoreSyncer(localStore, {
				transport: localTransport,
				filter: (path, value) => {
					// 过滤掉 password 字段
					return !path.includes('password');
				},
			});
			const remoteSyncer = new AutoStoreSyncer(remoteStore, {
				transport: remoteTransport,
			});

			localStore.state.user.name = 'alice';
			expect(remoteStore.state.user.name).toBe('alice');

			localStore.state.user.password = 'newpassword';
			// password 不应该同步
			expect(remoteStore.state.user).not.toHaveProperty('password');
		});

		test('过滤特定类型的值', () => {
			const localStore = new AutoStore({
				data: {
					name: 'test',
					count: 100,
					secret: undefined as string | undefined,
				},
			});
			const remoteStore = new AutoStore({
				data: {
					name: '',
					count: 0,
					secret: undefined as string | undefined,
				},
			});

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				filter: (path, value) => {
					// 过滤掉 undefined 值
					return value !== undefined;
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			localStore.state.data.name = 'updated';
			expect(remoteStore.state.data.name).toBe('updated');

			localStore.state.data.secret = 'should not sync';
			// secret 字段之前是 undefined,现在是字符串,会被同步
			expect(remoteStore.state.data.secret).toBe('should not sync');
		});

		test('使用filter过滤路径前缀', () => {
			const localStore = new AutoStore({
				public: {
					name: 'fisher',
					email: 'test@test.com',
				},
				private: {
					ssn: '123-45-6789',
					phone: '123-456-7890',
				},
			});
			const remoteStore = new AutoStore();

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				filter: (path) => {
					// 只同步 public 路径下的数据
					return path[0] === 'public';
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			localStore.state.public.name = 'alice';
			expect(remoteStore.state.public.name).toBe('alice');

			localStore.state.private.ssn = '987-65-4321';
			expect(remoteStore.state.private).toBeUndefined();
		});
	});

	describe('onSend/onReceive 回调', () => {
		test('onSend 可以阻止发送操作', () => {
			const localStore = new AutoStore({
				user: {
					name: 'fisher',
					age: 30,
				},
			});
			const remoteStore = new AutoStore({
				user: {
					name: 'fisher',
					age: 30,
				},
			});

			let sendCount = 0;
			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				immediate: true,
				onSend: (operate) => {
					sendCount++;
					// 阻止 age 字段的发送
					if (operate.path.includes('age')) {
						return false;
					}
					return true;
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			localStore.state.user.name = 'alice';
			expect(remoteStore.state.user.name).toBe('alice');
			expect(sendCount).toBeGreaterThan(0);

			localStore.state.user.age = 25;
			// age 不应该同步,保持初始值
			expect(remoteStore.state.user.age).toBe(30);
		});

		test('onReceive 可以阻止接收操作', () => {
			const localStore = new AutoStore({
				user: {
					name: 'fisher',
				},
			});
			const remoteStore = new AutoStore({
				user: {
					name: 'remote',
					age: 25,
				},
			});

			let receiveCount = 0;
			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				onReceive: (operate) => {
					receiveCount++;
					// 阻止 age 字段的接收
					if (operate.path.includes('age')) {
						return false;
					}
					return true;
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			remoteStore.state.user.name = 'alice';
			expect(localStore.state.user.name).toBe('alice');

			remoteStore.state.user.age = 30;
			// age 不应该同步到 local
			expect(localStore.state.user).not.toHaveProperty('age');
			expect(receiveCount).toBeGreaterThan(0);
		});

		test('onSend 可以修改 operate 数据', () => {
			const localStore = new AutoStore({
				data: {
					value: 100,
				},
			});
			const remoteStore = new AutoStore();

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				onSend: (operate) => {
					// 修改发送的值
					if (operate.path.includes('value')) {
						operate.value = operate.value * 2;
					}
					return true;
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			localStore.state.data.value = 50;
			// 应该收到双倍值
			expect(remoteStore.state.data.value).toBe(100);
		});

		test('onReceive 可以修改 operate 数据', () => {
			const localStore = new AutoStore({
				data: {
					value: 0,
				},
			});
			const remoteStore = new AutoStore({
				data: {
					value: 100,
				},
			});

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				onReceive: (operate) => {
					// 修改接收的值
					if (operate.path.includes('value')) {
						operate.value = operate.value + 10;
					}
					return true;
				},
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			remoteStore.state.data.value = 50;
			// 应该收到值+10
			expect(localStore.state.data.value).toBe(60);
		});
	});

	describe('autostart 选项', () => {
		test('autostart: false 时不自动启动同步', () => {
			const localStore = new AutoStore({
				data: {
					value: 100,
				},
			});
			const remoteStore = new AutoStore({
				data: {
					value: 0,
				},
			});

			const localSyncer = new AutoStoreSyncer(localStore, {
				transport: localTransport,
				autostart: false,
			});
			const remoteSyncer = new AutoStoreSyncer(remoteStore, {
				transport: remoteTransport,
				autostart: false,
			});

			// 同步未启动，修改不应该同步
			localStore.state.data.value = 200;
			expect(remoteStore.state.data.value).toBe(0);

			// 手动启动同步
			localSyncer.start();
			remoteSyncer.start();

			// 现在应该同步
			localStore.state.data.value = 300;
			expect(remoteStore.state.data.value).toBe(300);
		});

		test('多次调用 start 不重复启动', () => {
			const localStore = new AutoStore({
				data: {
					value: 100,
				},
			});
			const remoteStore = new AutoStore();

			const localSyncer = new AutoStoreSyncer(localStore, {
				transport: localTransport,
			});

			// 多次调用 start
			localSyncer.start();
			localSyncer.start();
			localSyncer.start();

			// syncing 应该只被设置一次
			expect(localSyncer.syncing).toBe(true);

			localSyncer.stop();
			expect(localSyncer.syncing).toBe(false);
		});
	});

	describe('计算属性同步', () => {
		test('同步计算属性的值', () => {
			const localStore = new AutoStore({
				user: {
					firstName: 'zhang',
					lastName: 'san',
					fullName: computed((scope) => `${scope.firstName} ${scope.lastName}`),
				},
			});
			const remoteStore = new AutoStore({
				user: {
					firstName: 'zhang',
					lastName: 'san',
					fullName: computed((scope) => `${scope.firstName} ${scope.lastName}`),
				},
			});

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
				immediate: true,
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			// fullName 应该同步到 remote
			expect(remoteStore.state.user.fullName).toBe('zhang san');

			localStore.state.user.firstName = 'li';

			expect(localStore.state.user.fullName).toBe('li san');
			// 计算属性的值也应该同步
			expect(remoteStore.state.user.fullName).toBe('li san');
		});
	});

	describe('边界情况', () => {
		test('多次调用 stop 不会重复发送停止信号', () => {
			const localStore = new AutoStore({
				data: { value: 100 },
			});
			const remoteStore = new AutoStore({
				data: { value: 100 },
			});

			new AutoStoreSyncer(localStore, { transport: localTransport });
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			const sendSpy = vi.spyOn(localTransport, 'send');

			// 多次调用 stop
			localTransport.stop();
			localTransport.stop();
			localTransport.stop();

			// 只应该调用一次 onStop
			expect(localTransport.isStop).toBe(true);
		});

		test('空路径的同步', () => {
			const localStore = new AutoStore({});
			const remoteStore = new AutoStore({});

			new AutoStoreSyncer(localStore, { transport: localTransport });
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			// 空对象同步不应该出错
			// @ts-expect-error
			localStore.state.test = 'value';
			// @ts-expect-error
			expect(remoteStore.state.test).toBe('value');
		});

		test('同步嵌套深层的路径', () => {
			const localStore = new AutoStore({
				a: {
					b: {
						c: {
							d: {
								value: 100,
							},
						},
					},
				},
			});
			const remoteStore = new AutoStore();

			new AutoStoreSyncer(localStore, {
				transport: localTransport,
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			localStore.state.a.b.c.d.value = 200;
			expect(remoteStore.state.a.b.c.d.value).toBe(200);
		});

		test('停止后重新启动同步', () => {
			const localStore = new AutoStore({
				data: { value: 100 },
			});
			const remoteStore = new AutoStore({
				data: { value: 100 },
			});

			const localSyncer = new AutoStoreSyncer(localStore, {
				transport: localTransport,
			});
			new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

			// 停止同步
			localSyncer.stop();
			localStore.state.data.value = 200;
			expect(remoteStore.state.data.value).toBe(100);

			// 重新启动
			localSyncer.start();
			localStore.state.data.value = 300;
			expect(remoteStore.state.data.value).toBe(300);
		});
	});
});
