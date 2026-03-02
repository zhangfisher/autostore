# 自动发布

- 先执行`bun run changeset`创建`changelog`
- 提交到`github`，会触发`@changelog/action`自动创建PR
- 登录`Github`，手动合并`PR`触发`publish.yaml`工作流执行

# 手动发布

- 在本地执行`bun run publish-versions -v <版本号> --auto-commit`
- 提交并推送到`github`（注意：**推送时要包括标签**)
- 触发`publish.yaml`工作流执行

由于采用了`NPM`的`oidc`发布，所以发布统一通过`Github Action`进行发布。
