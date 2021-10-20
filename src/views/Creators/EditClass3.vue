<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="container">
      <div class="notice-card">
        <h3>3. 커리큘럼</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <!-- 소개 -->
      <div id="cur_area"></div>
      <div class="input-group" v-for="(chap, num) in array1" :key="num">
        <div class="cur_container">
          <h4>
            #{{ num + 1 }}
            <input
              type="text"
              class="form-control m-1"
              style="display:inline; width:90%;"
              placeholder="챕터명을 입력해주세요"
              :value="chap"
            />
          </h4>
          <div class="cur_left">
            <img src="@/assets/imgs/PhotoPotrait.svg" />
          </div>
          <div class="cur_right">
            <input
              v-for="(list, i) in array2"
              :key="i"
              type="text"
              class="form-control m-1"
              placeholder="챕터명을 입력해주세요"
              :value="list"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      doc: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      array1: [
        "챕터1 입니다",
        "챕터2 입니다",
        "챕터3 입니다",
        "챕터4 입니다",
        "챕터5 입니다",
        "챕터6 입니다"
      ],
      array2: [
        ["aaa", "123", "333", "444", "14124"],
        ["1sss11", "222", "333", "444"],
        ["sdfsdfas", "2521344", "333433", "444"],
        ["11sdfasd1", "222", "333", "444"],
        ["1as11", "222", "333", "444"],
        ["1aagwe11", "222", "333", "444"],
        ["11q241", "222", "333", "444"],
        ["14yrga11", "222", "333", "444"],
        ["11jwsry1", "222", "333", "444"],
        ["asdf", "222", "333", "444"]
      ]
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.doc = result.data();
      });
  }
};
</script>
