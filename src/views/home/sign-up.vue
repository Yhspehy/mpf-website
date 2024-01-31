<script setup>
defineOptions({
  name: 'SignUp'
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

const roomOptions = [
  {
    label: 'Single Room ¥500',
    value: 1
  },
  {
    label: 'Double Room ¥600',
    value: 2
  },
  {
    label: 'Executive Suite ¥1200',
    value: 3
  }
];

const paymentOptions = [
  {
    label: 'Self- Paying',
    value: 1
  },
  {
    label: 'Public Expense',
    value: 2
  },
  {
    label: 'Make up the difference',
    value: 3
  }
];
</script>

<template>
  <div class="mx-auto max-w-640px py-30px">
    <n-card title="Personal Details" class="mb-20px">
      <n-form
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
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
      </n-form>
    </n-card>

    <n-card title="Agenda">
      <n-collapse default-expanded-names="['1', '2']">
        <n-collapse-item title="2024 MPF Main Forum" name="1">
          <n-radio-group v-model:value="model.participationMethod" name="participationMethod">
            <n-radio value="1">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="MPF High-level Roundtable Meeting" name="2">
          <n-radio-group v-model:value="model.participationMethod" name="participationMethod">
            <n-radio value="2">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="MPF Thematic forum" name="3">
          <n-radio-group
            v-model:value="model.participationMethod"
            name="participationMethod"
            class="flex-col"
          >
            <n-radio value="3">
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="4">
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="5">
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="6">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="Linkage Activities" name="3">
          <n-radio-group
            v-model:value="model.participationMethod"
            name="participationMethod"
            class="flex-col"
          >
            <n-radio value="7">
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="8">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
      </n-collapse>
    </n-card>

    <n-card title="Traffic Service" class="mb-20px">
      <h3>Inbound Journey</h3>
      <n-form
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
      >
        <n-form-item label="Travel Method" path="gender">
          <n-radio-group v-model:value="model.gender" name="gender">
            <n-space>
              <n-radio value="Plane"> Plane </n-radio>
              <n-radio value="High-Speed Railway"> High-Speed Railway </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="Flight/Class" path="firstName">
          <n-input v-model:value="model.firstName" />
        </n-form-item>
        <n-form-item label="Arrival Time" path="firstName">
          <n-date-picker
            v-model:value="model.timestamp2"
            type="datetime"
            format="yyyy/MM/dd - HH:mm"
            clearable
          />
        </n-form-item>
        <n-form-item label="Location" path="lastName">
          <n-input v-model:value="model.lastName" />
        </n-form-item>
      </n-form>

      <h3>Back Journey</h3>
      <n-form
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
      >
        <n-form-item label="Travel Method" path="gender">
          <n-radio-group v-model:value="model.gender" name="gender">
            <n-space>
              <n-radio value="Plane"> Plane </n-radio>
              <n-radio value="High-Speed Railway"> High-Speed Railway </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="Flight/Class" path="firstName">
          <n-input v-model:value="model.firstName" />
        </n-form-item>
        <n-form-item label="Departure Time" path="firstName">
          <n-date-picker
            v-model:value="model.timestamp2"
            type="datetime"
            format="yyyy/MM/dd - HH:mm"
            clearable
          />
        </n-form-item>
        <n-form-item label="Location" path="lastName">
          <n-input v-model:value="model.lastName" />
        </n-form-item>
      </n-form>

      <h3>Choose my Hotel</h3>
      <n-form
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
      >
        <n-form-item label="Room Type" path="firstName">
          <n-select v-model:value="model.firstName" :options="roomOptions" />
        </n-form-item>
        <n-form-item label="Payment Method" path="firstName">
          <n-select v-model:value="model.firstName" :options="paymentOptions" />
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>
