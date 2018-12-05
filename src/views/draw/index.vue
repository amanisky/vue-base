<template>
<div class="draw">
  <el-row :gutter="20" class="draw-header">
    <el-col :span="24">顶部菜单</el-col>
  </el-row>
  <el-row :gutter="20" class="draw-body">
    <el-col :span="4" style="background-color: #ccc;">左侧</el-col>
    <el-col :span="16" class="draw-area">
      <div class="draw-content" ref="draw-content">
        <canvas ref="c"></canvas>
      </div>
    </el-col>
    <el-col :span="4" style="background-color: #ccc;">右侧</el-col>
  </el-row>
</div>
</template>

<script>
import { fabric } from 'fabric'
import { getBackground } from '@/api/draw'
export default {
  name: 'draw',
  data: function () {
    return {
      canvas: null
    }
  },
  created () {
    getBackground({ color: 'red', width: 2, height: 3 })
      .then(resp => {
        console.log(resp)
      })
  },
  mounted () {
    this.canvas = new fabric.Canvas(this.$refs.c, { width: 2000, height: 800 })
    var rect1 = new fabric.Rect({ width: 50, height: 50, fill: '#fff' })
    var rect2 = new fabric.Rect({ width: 50, height: 50, fill: 'orange' })
    this.canvas.add(rect1, rect2)
    this.canvas.on('object:moved', (opt) => {
      // var e = opt.e
      opt.target.setCoords()
      if (opt.target.left < 0) {
        this.canvas.setWidth(this.canvas.getWidth() + 100)
        this.canvas.calcOffset()
        this.canvas.requestRenderAll()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.draw {
  padding: 0 10px;
  .draw-header {
    height: 40px;
    line-height: 40px;
    background-color: #f5f5f5;
  }
  .draw-body {
    /* navbar 高度为 50 draw-header 高度为 40 */
    height: calc(100vh - 50px - 40px);
  }
  .draw-area {
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .draw-content {
    @include scrollBar;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translate(-50%, -50%);
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABMklEQVRoQ+2WsQ2FMAwFyRDULMH+E7AEdYbg6xeUiJN1cQDlN79xnrmzRSjbth0T+C3LMu37flvZq678QdZ1LbdP+PACDFJrPeZ5vgXuVYdBHj6QCYP0Mk37YpAxkQsD1DStGxO5WjVq0K77zkROM2///85E6CeKvdN23pjIeGs1+kTAq2XvtJ2HQRqJ1GIxiG3QzsMgmrpGQeXtN/r5/N+ZyLjZG+16NBavlv2WsfMwSNRU1jkMYhu08zBIltloHwxiG7TzMEjUVNa5cbNnmaZ98GrZO23nYRBqplcdBrEN2nkYpJdp2heD2AbtPAxCzfSqwyC2QTsPg/QyTfuOm52ayqrDq2XvtJ2HQbLMRvtgENugnYdBoqayzmEQ26Cdh0GyzEb7YBDboJ2HQaKmss79AFd/k8OzRcrDAAAAAElFTkSuQmCC') repeat 0 0;
    overflow: auto;
  }
}
</style>
