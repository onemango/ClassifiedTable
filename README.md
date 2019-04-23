# AntDesign的Table组件分类选择

技术栈：
React+AntDesign+lodash

业务功能：
- 初始渲染信息字段，根据信息字段回显数量，Table中多选框为disabled状态
- 点击去选择，可选择Table中未被选中的多选框，及取消当前的字段的多选框
- 选择完成点击取消，恢复至原始状态
- 选择完成点击保存，保存状态（这里应该会走后台接口，代码中只保存在前端）
