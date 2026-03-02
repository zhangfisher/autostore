#!/usr/bin/env bun

/**
 * 更新所有包的版本号并创建 publish-<版本号> tag
 *
 * 用法:
 *   bun run update-versions -v 1.2.3          # 更新版本号并创建 tag
 *   bun run update-versions -v 1.2.3 --dry-run # 预览模式
 */

import { $ } from "bun";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";

// 解析命令行参数
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("-d");

// 获取版本号参数
const versionIndex = args.indexOf("-v");
if (versionIndex === -1 || versionIndex === args.length - 1) {
	console.error(`❌ 错误: 请提供版本号`);
	console.error(`\n用法: bun run update-versions -v <版本号>`);
	console.error(`示例: bun run update-versions -v 1.2.3`);
	console.error(`      bun run update-versions -v 1.2.3 --dry-run`);
	process.exit(1);
}

const targetVersion = args[versionIndex + 1];

/**
 * 验证版本号格式
 */
function validateVersion(version) {
	// 简单的语义化版本号验证：major.minor.patch
	const semverRegex = /^\d+\.\d+\.\d+$/;
	if (!semverRegex.test(version)) {
		console.error(`❌ 错误: 版本号格式无效`);
		console.error(`   格式应为: major.minor.patch (例如: 1.2.3)`);
		console.error(`   收到的: ${version}`);
		process.exit(1);
	}
	return true;
}

/**
 * 更新单个 package.json 的版本号
 */
async function updatePackageVersion(pkgPath, newVersion) {
	const file = Bun.file(pkgPath);
	if (!file.exists()) {
		console.warn(`⚠ 未找到: ${pkgPath}`);
		return false;
	}

	const content = await file.text();
	const pkg = JSON.parse(content);

	// 跳过私有包
	if (pkg.private === true) {
		console.log(`⊘ 跳过私有包: ${pkg.name || pkgPath}`);
		return false;
	}

	// 检查版本号是否需要更新
	if (pkg.version === newVersion) {
		console.log(`= 版本已是最新: ${pkg.name} ${newVersion}`);
		return false;
	}

	if (dryRun) {
		console.log(`[DRY-RUN] 将更新: ${pkg.name}`);
		console.log(`  ${pkg.version} → ${newVersion}`);
		return true;
	}

	// 更新版本号
	const oldVersion = pkg.version;
	pkg.version = newVersion;
	await Bun.write(pkgPath, JSON.stringify(pkg, null, "\t"));

	console.log(`✓ 已更新: ${pkg.name} ${oldVersion} → ${newVersion}`);
	return true;
}

/**
 * 创建 publish-<版本号> tag
 */
async function createPublishTag(version) {
	const tagName = `publish-${version}`;

	if (dryRun) {
		console.log(`\n[DRY-RUN] 将创建标签: ${tagName}`);
		return;
	}

	try {
		await $`git tag ${tagName}`.quiet();
		console.log(`\n✓ 已创建标签: ${tagName}`);
		console.log(`💡 提示: 使用以下命令推送标签到远程`);
		console.log(`   git push origin ${tagName}`);
	} catch (error) {
		// 检查是否是标签已存在的错误
		const stderr = error.stderr?.toString() || "";
		if (stderr.includes("already exists")) {
			console.log(`\nℹ 标签已存在: ${tagName}`);
			console.log(`💡 提示: 使用以下命令推送标签到远程`);
			console.log(`   git push origin ${tagName}`);
		} else {
			console.error(`\n✗ 创建标签失败`);
			console.error(`   ${stderr}`);
			throw error;
		}
	}
}

/**
 * 主函数
 */
async function main() {
	// 验证版本号
	validateVersion(targetVersion);

	console.log(`📦 更新包版本号\n`);
	console.log(`📌 目标版本: ${targetVersion}\n`);

	// 遍历所有包
	const cwd = process.cwd();
	const packagesDir = resolve(cwd, "packages");
	const entries = readdirSync(packagesDir, { withFileTypes: true });
	const pkgDirs = entries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	console.log(`找到 ${pkgDirs.length} 个包${dryRun ? " (DRY-RUN 模式)" : ""}\n`);

	let updatedCount = 0;
	for (const dirName of pkgDirs) {
		const pkgPath = resolve(packagesDir, dirName, "package.json");
		if (existsSync(pkgPath)) {
			const updated = await updatePackageVersion(pkgPath, targetVersion);
			if (updated) updatedCount++;
		}
	}

	// 创建 publish tag
	await createPublishTag(targetVersion);

	console.log();
	if (dryRun) {
		console.log(`📊 预览完成: 将更新 ${updatedCount} 个包并创建标签 publish-${targetVersion}`);
	} else {
		console.log(`✅ 更新完成: 已更新 ${updatedCount} 个包并创建标签 publish-${targetVersion}`);
	}
}

main();
