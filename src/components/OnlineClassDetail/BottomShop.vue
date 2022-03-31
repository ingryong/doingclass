<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="shopModal"
      tabindex="-1"
      aria-labelledby="shopModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="shopModalLabel">클래스 신청하기</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body pb-0">
            <div class="d-flex">
              <img class="col-4" :src="classDetails.thumbnail" />
              <div class="px-2">
                <span class="d-block" style="font-size:0.75rem;">
                  {{ classDetails.category.c1 }} ·
                  {{ classDetails.category.c2 }}
                </span>
                <p class="m-0 fs-6 fw-bold">
                  {{ classDetails.title }}
                </p>
                <p class="m-0 p-0">
                  <span v-if="classDetails.classopen" class="tag-open m-0">
                    수강 가능
                  </span>
                  <span
                    v-else-if="!classDetails.classopen"
                    class="tag-ready m-0"
                  >
                    준비중
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div>
              <p class="text-end">
                <span>
                  <s>{{ (classDetails.price * 1.3) | comma }}원</s> →
                  {{ classDetails.price | comma }}원
                </span>
                <br />
                <span>
                  <strong>월 {{ (classDetails.price / 3) | comma }}원</strong>
                  (3개월 할부)
                </span>
                <span class="d-block" style="font-size:0.75rem;">
                  구매 후 평생 무제한 수강
                </span>
              </p>
            </div>
            <hr />
          </div>
          <div class="modal-footer border-0 pt-0">
            <a
              type="button"
              class="btn btn-lg btn-primary w-100"
              :href="`/shopping/${classDetails.id}`"
            >
              결제페이지로 이동하기
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="nav navbar-light bg-light fixed-bottom justify-content-between">
      <span class="p-2">
        <p class="p-0 m-0" style="font-size:0.75rem;">
          <span>
            {{ classDetails.category.c1 }} · {{ classDetails.category.c2 }}
          </span>
        </p>
        <p class="p-0 m-0">
          {{ classDetails.title }}
        </p>
      </span>
      <span class="p-2 pb-3 w-100">
        <button
          class="btn btn-lg btn-success w-100"
          v-if="classDetails.classopen"
          data-bs-toggle="modal"
          data-bs-target="#shopModal"
        >
          클래스 신청하기
        </button>
        <span
          class="btn btn-secondary w-100 disabled"
          v-else-if="!classDetails.classopen"
        >
          클래스 준비중입니다
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classDetails: Object
  }
};
</script>

<style></style>
