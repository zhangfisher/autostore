export function markFunc(val: any) {
	return typeof val === "function" ? `\`\`\`${val.toString()}\`\`\`` : val;
}
