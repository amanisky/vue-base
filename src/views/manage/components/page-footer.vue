<template>
  <el-pagination
    :current-page="current"
    :page-size="size"
    :total="total"
    :page-sizes="sizes"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>
<script>
export default {
  props: {
    current: {
      default: 0
    },
    size: {
      default: 0
    },
    total: {
      default: 0
    },
    sizes: {
       default: () => []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        current: this.current,
        size: val,
        total: this.total,
        sizes: this.sizes
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        current: val,
        size: this.size,
        total: this.total,
        sizes: this.sizes
      })
    }
  }
}
</script>
