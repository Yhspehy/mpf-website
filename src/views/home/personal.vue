<script setup>
import { localStg } from '@/utils/storage';
import { useAppStore } from '@/stores';

import {
  getStatic,
  getUnit,
  getMember,
  getMemberInfo,
  updateMember,
  updateMemberInfo
} from '@/service/api/mpf';

defineOptions({
  name: 'PersonalPage'
});

const message = useMessage();

const isEdit = ref(false);

const formIns = ref(null);
const model = ref({
  id: null,
  firstName: '',
  lastName: '',
  nameEn: '',
  cardType: '1',
  card: '',
  sex: 1,
  unit: {
    nameEn: ''
  },
  unitId: '',
  jobEn: '',
  tel: '',
  email: '',
  isForeign: 1,
  isContact: '0',
  inviteType: 0,
  birthday: null
});

const rules = {
  firstName: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'First Name is required'
  },
  lastName: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Last Name is required'
  },
  birthday: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Birth Date is required'
  },
  unit: {
    nameEn: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Organization is required'
    }
  },
  jobEn: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Position is required'
  },
  tel: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Phone Number is required'
  },
  email: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Email is required'
  }
};

const unitList = ref([]);

getUnit('').then((res) => {
  unitList.value = res.data ? res.data.filter((e) => e.nameEn) : [];
});

function createOption(label) {
  if (unitList.value[0].id === 'extra') {
    unitList.value[0].nameEn = label;
  } else {
    unitList.value.unshift({
      nameEn: label,
      id: 'extra'
    });
  }
  return {
    label: label,
    value: 'extra'
  };
}

function updateUnit(value, option) {
  if (!value) {
    model.value.unit.nameEn = '';
  } else {
    model.value.unit.nameEn = option.nameEn;
  }
}

watchEffect(() => {
  model.value.nameEn = model.value.firstName + ' ' + model.value.lastName;
});

const app = useAppStore();

function submit() {
  if (!isEdit.value) {
    isEdit.value = true;
    return;
  }

  formIns.value?.validate((errors) => {
    if (!errors) {
      const formValue = {
        ...model.value
      };
      if (formValue.unitId) {
        if (formValue.unitId === 'extra') {
          formValue.unit = {
            nameEn: model.value.unit.nameEn
          };
          delete formValue.unitId;
        } else {
          delete formValue.unit;
        }
      }
      updateMember(formValue).then((resp) => {
        if (resp.code !== '0') return;
        app.mpfId = model.value.id;
        // 默认参与总论坛
        updateMemberInfo({
          id: model.value.id,
          memberForumTemp: {
            id: memberForumTemp?.id || null,
            memberId: model.value.id,
            forumId: forumId,
            isContact: model.value.isContact,
            isDelete: 0
          },
          memberInviteTemp: {
            id: memberInviteTemp?.id || null,
            mfId: memberForumTemp?.id || null,
            inviteType: model.value.inviteType,
            status: 1,
            idDelete: 0
          }
        }).then((result) => {
          if (result.code === '0') {
            message.success('Save success!');
            isEdit.value = false;
          }
        });
      });
    }
  });
}

const email = localStg.get('email');
let memberForumTemp = {};
let memberInviteTemp = {};
getMember(email).then((res) => {
  if (res.code !== '0') return;
  model.value = res.data;
  const nameList = res.data.nameEn.split(' ');
  model.value.firstName = nameList[0];
  model.value.lastName = nameList[1];
  model.value.isContact = '1';
  model.value.isForeign = 1;
  model.value.birthday = model.value.birthday || null;

  // 获取是否为单位联络人
  getMemberInfo(res.data.id).then((r) => {
    if (r.data.memberForumTemp) {
      memberForumTemp = r.data.memberForumTemp || {};
      model.value.isContact =
        r.data.memberForumTemp.isContact !== null ? r.data.memberForumTemp.isContact + '' : '1';
    }
    if (r.data.memberInviteTemp) {
      memberInviteTemp = r.data.memberInviteTemp || {};
      model.value.inviteType = r.data.memberInviteTemp.inviteType || 0;
    }
  });
});

/** 获取主论坛id */
let forumId = null;
getStatic().then((res) => {
  if (res.data && res.data.forum) {
    forumId = res.data.forum.find((e) => e.type === 0).id;
  }
});
</script>

<template>
  <div class="relative mx-auto w-105rem py-3rem <sm:w-70rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem <sm:text-left">
      Personal Details
    </div>

    <img src="/images/ok.gif" class="w-20rem h-20rem absolute top-8rem right-0rem" />

    <div v-if="!app.isMobile" class="color-#044EB3 text-2.2rem mb-3rem font-bold border-b pb-2rem">
      Your Personal Details
    </div>

    <n-form
      v-if="isEdit"
      ref="formIns"
      class="w-full mt-2rem"
      :model="model"
      :rules="rules"
      :label-placement="app.isMobile ? 'top' : 'left'"
      label-width="42rem"
      label-align="left"
      require-mark-placement="left"
      size="medium"
    >
      <n-form-item label="First Name" path="firstName" required>
        <n-input v-model:value="model.firstName" placeholder="" />
      </n-form-item>
      <n-form-item label="Last Name" path="lastName" required>
        <n-input v-model:value="model.lastName" placeholder="" />
      </n-form-item>
      <n-form-item label="Gender" path="sex" required>
        <n-radio-group v-model:value="model.sex" name="gender">
          <n-space>
            <n-radio :value="1"> Male </n-radio>
            <n-radio :value="0"> Female </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Participation Method" path="participationMethod" required>
        <n-radio-group v-model:value="model.inviteType" name="participationMethod">
          <n-space>
            <n-radio :value="0"> Offline </n-radio>
            <n-radio :value="1"> Online </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item v-if="model.inviteType === 0" label="Birth Date" path="birthday" required>
        <n-date-picker
          v-model:formatted-value="model.birthday"
          type="date"
          clearable
          class="w-full"
          input-readonly
          value-format="yyyy-MM-dd"
          :default-calendar-start-time="157766400000"
        />
      </n-form-item>
      <n-form-item label="Passport Number" path="card">
        <n-input v-model:value="model.card" placeholder="" />
      </n-form-item>
      <n-form-item label="Organization" path="unit.nameEn" required>
        <n-select
          v-model:value="model.unitId"
          filterable
          clearable
          tag
          label-field="nameEn"
          value-field="id"
          :fallback-option="false"
          :options="unitList"
          @create="createOption"
          @update:value="updateUnit"
        />
      </n-form-item>
      <n-form-item label="Position" path="jobEn" required>
        <n-input v-model:value="model.jobEn" placeholder="" />
      </n-form-item>
      <n-form-item label="Email" path="email" required>
        <n-input v-model:value="model.email" disabled placeholder="" />
      </n-form-item>
      <n-form-item label="Phone Number" path="tel" required>
        <n-input v-model:value="model.tel" placeholder="" />
      </n-form-item>
      <n-form-item label="Contact person of Organization" path="isContact" required>
        <n-radio-group v-model:value="model.isContact" name="isContact">
          <n-space>
            <n-radio value="0"> Yes </n-radio>
            <n-radio value="1"> No </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-form>

    <n-form
      v-else
      class="w-full mt-2rem"
      :label-placement="app.isMobile ? 'top' : 'left'"
      label-width="42rem"
      label-align="left"
      require-mark-placement="left"
      size="medium"
    >
      <n-form-item label="First Name" path="firstName" required>
        <div class="border-b info-value">
          {{ model.firstName }}
        </div>
      </n-form-item>
      <n-form-item label="Last Name" path="lastName" required>
        <div class="border-b info-value">
          {{ model.lastName }}
        </div>
      </n-form-item>
      <n-form-item label="Gender" path="sex" required>
        <div class="border-b info-value">
          {{ model.sex === 1 ? 'Male' : 'Female' }}
        </div>
      </n-form-item>
      <n-form-item label="Participation Method" path="inviteType" required>
        <div class="border-b info-value">
          {{ model.inviteType === 1 ? 'Online' : 'Offline' }}
        </div>
      </n-form-item>

      <n-form-item label="Birth Date" path="birthday" required>
        <div class="border-b info-value">
          {{ model.birthday }}
        </div>
      </n-form-item>

      <n-form-item label="Passport Number" path="card" required>
        <div class="border-b info-value">{{ model.card }}</div>
      </n-form-item>
      <n-form-item label="Organization" path="unitId" required>
        <div class="border-b info-value">
          {{ model.unit.nameEn }}
        </div>
      </n-form-item>
      <n-form-item label="Position" path="jobEn" required>
        <div class="border-b info-value">{{ model.jobEn }}</div>
      </n-form-item>
      <n-form-item label="Email" path="email" required>
        <div class="border-b info-value">{{ model.email }}</div>
      </n-form-item>
      <n-form-item label="Phone Number" path="tel" required>
        <div class="border-b info-value">{{ model.tel }}</div>
      </n-form-item>
      <n-form-item label="Contact person of Organization" path="isContact" required>
        <div class="border-b info-value">
          {{ model.isContact === '0' ? 'Yes' : 'No' }}
        </div>
      </n-form-item>
    </n-form>

    <div class="text-right mt-11rem <sm:text-center">
      <n-button
        color="#044EB3"
        class="text-2rem w-19rem h-5.6rem border-rd-2.8rem <sm:w-70rem <sm:h-7rem <sm:border-rd-3.5rem <sm:text-3.2rem"
        @click="submit"
      >
        {{ isEdit ? 'Save' : 'Edit' }}
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-value {
  width: 100%;
  padding: 0.7rem 0;
  font-size: var(--n-label-font-size);
}
</style>

<style lang="scss">
.n-date-panel .n-date-panel-month-calendar .n-date-panel-month-calendar__picker-col-item {
  font-size: 1.4rem !important;
}
.mobile .n-date-panel .n-date-panel-month-calendar .n-date-panel-month-calendar__picker-col-item {
  font-size: 2.4rem !important;
}
</style>
