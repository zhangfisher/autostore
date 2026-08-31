/**
 * 路径解析工具类
 *
 * 提供统一的路径处理和转换功能
 */

export class PathResolver {
	/**
	 * 规范化路径为统一格式
	 * @param path 路径（字符串或数组）
	 * @returns 路径数组
	 */
	static normalize(path: string | string[]): string[] {
		if (Array.isArray(path)) {
			return [...path];
		}
		return path.split('.');
	}

	/**
	 * 连接多个路径段
	 * @param paths 路径段数组或字符串
	 * @returns 连接后的路径数组
	 */
	static join(...paths: (string | string[])[]): string[] {
		return paths.flatMap(p => this.normalize(p));
	}

	/**
	 * 为路径添加 configKey 前缀
	 * @param path 路径数组
	 * @param configKey 配置键前缀
	 * @returns 带前缀的路径字符串
	 */
	static withConfigPrefix(path: string[], configKey: string): string {
		return configKey ? `${configKey}.${path.join('.')}` : path.join('.');
	}

	/**
	 * 从完整路径中移除 configKey 前缀
	 * @param fullPath 完整路径字符串
	 * @param configKey 配置键前缀
	 * @returns 移除前缀后的路径数组
	 */
	static stripConfigPrefix(fullPath: string, configKey: string): string[] {
		const prefix = configKey ? `${configKey}.` : '';
		return fullPath.substring(prefix.length).split('.');
	}

	/**
	 * 转换路径为点分字符串
	 * @param path 路径数组
	 * @returns 点分字符串
	 */
	static toDotted(path: string[]): string {
		return path.join('.');
	}

	/**
	 * 比较两个路径是否相等
	 * @param path1 路径1
	 * @param path2 路径2
	 * @returns 是否相等
	 */
	static equals(path1: string | string[], path2: string | string[]): boolean {
		const norm1 = this.normalize(path1);
		const norm2 = this.normalize(path2);
		return (
			norm1.length === norm2.length &&
			norm1.every((p, i) => p === norm2[i])
		);
	}

	/**
	 * 检查路径是否以指定前缀开头
	 * @param path 路径
	 * @param prefix 前缀
	 * @returns 是否匹配
	 */
	static startsWith(path: string[], prefix: string[]): boolean {
		if (prefix.length > path.length) return false;
		return prefix.every((p, i) => p === path[i]);
	}

	/**
	 * 获取路径的父路径
	 * @param path 路径数组
	 * @returns 父路径数组
	 */
	static getParentPath(path: string[]): string[] {
		if (path.length === 0) return [];
		return path.slice(0, -1);
	}

	/**
	 * 获取路径的最后一部分（字段名）
	 * @param path 路径数组
	 * @returns 字段名
	 */
	static getFieldName(path: string[]): string {
		if (path.length === 0) return '';
		return path[path.length - 1];
	}
}