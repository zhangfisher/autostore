/**
 * 批量升级示例文件到使用 .state 属性
 */

const fs = require('fs');
const path = require('path');

// 需要升级的示例文件列表
const filesToUpgrade = [
  'examples/basic/validation.ts',
  'examples/basic/computed-fields.ts',
  'examples/widgets/input-widgets.ts',
  'examples/widgets/selection-widgets.ts',
  'examples/advanced/form-groups.ts',
  'examples/advanced/cascader-tree.ts',
  'examples/advanced/data-sync.ts'
];

function upgradeExampleFile(filePath) {
  console.log(`正在升级: ${filePath}`);

  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. 将 new AutoStore({...}) 改为 state 定义
  content = content.replace(
    /store = new AutoStore\(\{([^]+)\}\);/g,
    'state = {$1};'
  );

  // 2. 修改导入语句，移除 AutoStore
  content = content.replace(
    /import \{([^}]+)AutoStore,?([^}]*)\} from 'autostore';/g,
    "import {$1$2} from 'autostore';"
  );
  content = content.replace(
    /import \{([^}]+)AutoStore,?([^}]*)\} from 'autostore';/g,
    "import {$1$2} from 'autostore';"
  );

  // 3. 将 .label 改为 .title
  content = content.replace(
    /label:\s*(['"][^'"]+['"])/g,
    'title: $1'
  );

  // 4. 将 .store="${this.store}" 改为 .state="${this.xxxState}"
  content = content.replace(
    /\.store="\$\{this\.store\}"/g,
    '.state="${this.state}"'
  );

  // 5. 移除 data-name, data-label, data-icon 属性
  content = content.replace(
    /data-name="[^"]*"\s*/g,
    ''
  );
  content = content.replace(
    /data-label="[^"]*"\s*/g,
    ''
  );
  content = content.replace(
    /data-icon="[^"]*"\s*/g,
    ''
  );

  // 6. 更新 connectedCallback 中的 store 访问
  content = content.replace(
    /this\.store\.watch/g,
    '// 需要在 updateComplete 中访问 activeStore'
  );

  // 7. 更新 updated() 方法
  content = content.replace(
    /updated\(\)\s*\{[^}]*this\.formRef\.store\s*=\s*this\.store;[^}]*\}/g,
    '// updated() 不再需要手动绑定 store'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ 完成升级: ${filePath}`);
}

// 执行升级
filesToUpgrade.forEach(upgradeExampleFile);

console.log('\n🎉 所有示例文件升级完成！');
console.log('⚠️ 请手动检查和调整以下内容:');
console.log('1. connectedCallback 中的 store 访问改为访问 activeStore');
console.log('2. 方法中的 this.store 改为访问 form.activeStore');
console.log('3. 验证所有功能是否正常工作');