<template>
  <div class="container">
    <div class="class-group">
      <h4>개설한 클래스</h4>
      <router-link to="/creators/createclass">+ 새로운 클래스</router-link>
      <hr />
      <div>
        <ul>
          <li>dd</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      db: this.$firebase.firestore()
    };
  }
};
</script>

<style lang="scss">
.container {
  .class-group {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 10px;
    box-sizing: border-box;

    h4 {
      box-sizing: border-box;
      padding: 20px;
      border: none;
      display: inline-block;
    }

    hr {
      background-color: #eee;
      height: 1px;
      border: none;
    }

    a {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: bold;
      color: $gray-2;
      text-align: right;
    }
  }
}
</style>
