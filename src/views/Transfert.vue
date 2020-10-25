<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Трансферт</h2>
      <h3>Текущее состояние</h3>
      <div class="row">
        <div class="col">
          <p>ЛО:</p>
          <p>364,2 баллов</p>
        </div>
        <div class="col">
          <p>Резерв:</p>
          <p>775,2 баллов</p>
        </div>
      </div>
      <h3>Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-sm-6">
          <input type="text" name="" id="number" placeholder="Номер" />
        </div>
      </div>
      <div class="row edit mt-3">
        <div class="col-sm-6 d-flex justify-content-between">
          <button>Перевести в резерв</button><button>Перевести в трансферт</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.licevoischet__page {
}
.edit {
  & input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    padding-bottom: 10px;
    outline: none;
  }

  & button{
      width: 49%;
      padding: 2px 0px;
      background: white;
      color: #32AAA7;
      border: 1px solid #32AAA7;
      border-radius: 2px;
  }
}
</style>
<style></style>
