<template>
    <el-pagination
            :current-page="current"
            :page-size="size"
            :total="total"
            :page-sizes="[5, 20, 50, 100,200]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
    </el-pagination>
</template>

<script>
    export default {
        props: {
            current: {
                default: 1
            },
            size: {
                default: 20
            },
            total: {
                default: 0
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('change', {
                    current: this.current,
                    size: val,
                    total: this.total
                })
            },
            handleCurrentChange(val) {
                this.$emit('change', {
                    current: val,
                    size: this.size,
                    total: this.total
                })
            }
        }
    }
</script>
