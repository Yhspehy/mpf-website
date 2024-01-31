<script setup>
defineOptions({
  name: 'PersonalPage'
});
const model = ref({
  firstName: null,
  lastName: null,
  textareaValue: null,
  gnder: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null
});
const rules = {
  firstName: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please input firstName'
  },
  lastName: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please input lastName'
  }
};

const formRef = ref(null);
const size = 'medium';
function handleValidateButtonClick(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Success!');
    } else {
      console.log(errors);
      message.error('Failed!');
    }
  });
}
</script>

<template>
  <div class="max-w-640px mx-auto mt-30px">
    <h2 class="text-center">Personal Details</h2>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :size="size"
    >
      <n-form-item label="firstName" path="firstName">
        <n-input v-model:value="model.firstName" />
      </n-form-item>
      <n-form-item label="lastName" path="lastName">
        <n-input v-model:value="model.lastName" />
      </n-form-item>
      <n-form-item label="Gender" path="gender">
        <n-radio-group v-model:value="model.gender" name="gender">
          <n-space>
            <n-radio value="male"> Male </n-radio>
            <n-radio value="female"> Female </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Participation Method" path="participationMethod">
        <n-radio-group v-model:value="model.participationMethod" name="participationMethod">
          <n-space>
            <n-radio value="online"> Online </n-radio>
            <n-radio value="offline"> Offline </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Passport Number" path="passportNumber">
        <n-input v-model:value="model.passportNumber" />
      </n-form-item>
      <n-form-item label="Organization" path="organization">
        <n-input v-model:value="model.organization" />
      </n-form-item>
      <n-form-item label="Position" path="position">
        <n-input v-model:value="model.position" />
      </n-form-item>
      <n-form-item label="Nationality" path="nationality">
        <n-input v-model:value="model.nationality" />
      </n-form-item>
      <n-form-item label="Email" path="email">
        <n-input v-model:value="model.email" />
      </n-form-item>
      <n-form-item label="Phone Number" path="phone">
        <n-input v-model:value="model.phone" />
      </n-form-item>
      <n-form-item label="Contact person of Organization" path="isContact">
        <n-radio-group v-model:value="model.isContact" name="isContact">
          <n-space>
            <n-radio value="Radio 1"> Y </n-radio>
            <n-radio value="Radio 2"> N </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <div class="flex justify-end">
        <n-button round type="primary" @click="handleValidateButtonClick"> save </n-button>
      </div>
    </n-form>
  </div>
</template>
