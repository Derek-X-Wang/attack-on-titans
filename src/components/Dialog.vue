<template>
  <div class="dialog">
    <!-- <el-dialog
      :title="title"
      :visible.sync="visiable"
      size="tiny">
      <span>{{text}}</span>
      <span slot="footer" class="dialog-footer">
        <slot></slot>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'dialog',
  props: {
    visiable: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
  },
  mounted() {
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
