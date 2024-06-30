# @hankit/tools

此包代码由 [@hankit/tools](https://github.com/antfu/handle/tree/main/packages/tools) 编译而来。但由于微信小程序的兼容问题，对编译结果有两处修改：

- `??` 修改为 `||`
- `/\p{Unified_Ideograph}/u` 修改为 `/[\u4e00-\u9fa5]/`
