<template>
  <div>
    <el-result
        icon="warning"
        title="404"
        sub-title="你还爱她吗？"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        </template>
      </el-result>
  </div>
</template>