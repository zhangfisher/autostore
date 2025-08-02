import { generatePrimaryColors } from './generateColors';

/**
 * 更改主题颜色
 * @param color 基准主题色（十六进制格式，如 #3B82F6）
 * @description 根据基准主题色生成梯度主题色变量，并将其应用到 header 中的 id='auto-styles' 的 style 元素中，
 * 同时将基准色变量应用到 body 元素中以确保兼容性
 */
export function changePrimaryColor(color: string) {
    // 验证颜色格式
    if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        console.error('Invalid color format. Please provide a valid hex color (e.g., #3B82F6)');
        return;
    }

    try {
        // 生成梯度主题色变量
        const colorVariables = generatePrimaryColors(color);

        // 在 header 中查找或创建 id='auto-styles' 的 style 元素
        let styleElement = document.getElementById('auto-styles') as HTMLStyleElement;
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'auto-styles';
            document.head.appendChild(styleElement);
        }

        // 构建 CSS 变量字符串
        let cssVars = ':root {\n';
        Object.entries(colorVariables).forEach(([variable, value]) => {
            cssVars += `  ${variable}: ${value};\n`;
        });
        cssVars += '}';

        // 将 CSS 变量应用到 style 元素
        styleElement.textContent = cssVars;

        // 同时将基准变量应用到 body 元素
        const body = document.body;
        // 只应用基准色变量（通常是 --primary-color）到 body
        if (colorVariables['--sl-color-primary-500']) {
            body.style.setProperty(
                '--sl-color-primary-500',
                colorVariables['--sl-color-primary-500'],
            );
        }

        console.log('Primary color changed successfully');
        return colorVariables;
    } catch (error) {
        console.error('Failed to change theme color:', error);
    }
}

// @ts-ignore
globalThis.changePrimaryColor = changePrimaryColor;
