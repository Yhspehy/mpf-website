<script setup>
import { useAppStore } from '@/stores';
import { localStg } from '@/utils/storage';

import { registerEmail } from '@/service/api/auth';
import {
  getMemberInSign,
  getMemberInfoInSign,
  getStaticInSign,
  getUnitInSign,
  updateMemberInSign,
  updateMemberInfo
} from '@/service/api/mpf';

defineOptions({
  name: 'SignUp'
});

const router = useRouter();
const message = useMessage();
const route = useRoute();

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
  unitId: 0,
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
    },
    secondId: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Sector is required',
      type: 'number'
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
const sectorList = ref([]);

getUnitInSign('', route.query.sign, route.query.timestamp, route.query.email).then((res) => {
  unitList.value = res.data ? res.data.filter((e) => e.nameEn && e.nameEn !== '-') : [];
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
    model.value.unit.secondId = '';
  } else {
    model.value.unit.nameEn = option.nameEn;
    model.value.unit.secondId = option.secondId;
  }
}

function filterFn(pattern, option) {
  const p = pattern.trim().toLowerCase();
  return option.nameEn && option.nameEn.toLowerCase().startsWith(p);
}

watchEffect(() => {
  model.value.nameEn = model.value.firstName + ' ' + model.value.lastName;
});

const app = useAppStore();
function submit() {
  formIns.value?.validate((errors) => {
    if (!errors) {
      const formValue = {
        ...model.value
      };
      if (formValue.unitId) {
        const sector = sectorList.value.find((e) => e.id === formValue.unit.secondId);
        if (formValue.unitId === 'extra') {
          formValue.unit = {
            nameEn: model.value.unit.nameEn,
            isForeign: 1,
            sectorId: sector.parentId,
            secondId: sector.id
          };
          delete formValue.unitId;
        } else {
          if (formValue.unit.secondId === 29) {
            delete formValue.unit;
          } else {
            formValue.unit = unitList.value.find((e) => e.id === formValue.unitId);
            formValue.unit.sectorId = sector.parentId;
            formValue.unit.secondId = sector.id;
          }
        }
      }
      updateMemberInSign(
        formValue,
        route.query.sign,
        route.query.timestamp,
        route.query.email
      ).then((resp) => {
        if (resp.code !== '0') return;
        const id = formValue.id || resp.data.id;
        localStg.set('mpfId', id);
        registerEmail(
          model.value.email,
          model.value.tel,
          route.query.sign,
          route.query.timestamp
        ).then((auth) => {
          localStg.set('email', model.value.email);
          localStg.set('token', auth.token);
          app.mpfId = id;
          updateMemberInfo({
            id: id,
            memberForumTemp: {
              id: memberForumTemp?.id || null,
              memberId: id,
              forumId: forumId,
              isContact: model.value.isContact,
              isDelete: 0
            },
            memberInviteTemp: {
              id: memberInviteTemp?.id || null,
              mfId: memberForumTemp?.id || null,
              inviteType: model.value.inviteType,
              status: memberInviteTemp?.status == 6 ? 6 : 1,
              idDelete: 0
            }
          }).then((result) => {
            if (result.code === '0') {
              router.push('/signup/forum');
            } else {
              message.error(result.message);
            }
          });
        });
      });
    }
  });
}

/** 获取主论坛id */
let forumId = 11;
getStaticInSign(route.query.sign, route.query.timestamp, route.query.email).then((res) => {
  if (res.data && res.data.forum) {
    forumId = res.data.forum.find((e) => e.type === 0).id;
  }
  if (res.data && res.data.unitSector) {
    sectorList.value = res.data.unitSector
      .filter((e) => e.type === 1 && e.id !== 29 && e.sectorEn)
      .reverse()
      .sort((a, b) => a.parentId - b.parentId);
  }
});

model.value.email = route.query.email || '';

let memberForumTemp = {};
let memberInviteTemp = {};

getMemberInSign(route.query.sign, route.query.timestamp, route.query.email).then((res) => {
  if (res.code !== '0') return;
  if (res.data) {
    model.value = res.data;
    const nameList = res.data.nameEn.split(' ');
    model.value.firstName = nameList[0];
    model.value.lastName = nameList[1];
    model.value.isContact = '1';
    model.value.birthday = model.value.birthday || null;
    model.value.sex =
      model.value.sex === undefined || model.value.sex === null ? 1 : model.value.sex;
    model.value.inviteType = 0;
    model.value.email = route.query.email || '';

    // 获取是否为单位联络人
    getMemberInfoInSign(
      res.data.id,
      route.query.sign,
      route.query.timestamp,
      route.query.email
    ).then((r) => {
      if (r.data) {
        if (r.data.memberForumTemp) {
          memberForumTemp = r.data.memberForumTemp || {};
          model.value.isContact =
            r.data.memberForumTemp.isContact !== null ? r.data.memberForumTemp.isContact + '' : '1';
        }
        if (r.data.memberInviteTemp) {
          memberInviteTemp = r.data.memberInviteTemp || {};
        }
      }
    });
  }
});
</script>

<template>
  <div class="relative mx-auto w-105rem py-3rem <sm:w-70rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem">Sign In</div>

    <div class="color- text-2.2rem mb-3rem font-bold border-b pb-2rem">
      Please Put In Your Personal Details
    </div>

    <img src="/images/love.gif" class="w-20rem h-20rem absolute top-8rem right-0rem" />

    <n-form
      class="w-full mt-2rem"
      ref="formIns"
      :model="model"
      :rules="rules"
      :label-placement="app.isMobile ? 'top' : 'left'"
      label-width="42rem"
      label-align="left"
      require-mark-placement="left"
      size="medium"
    >
      <n-form-item label="First Name" path="firstName">
        <n-input v-model:value="model.firstName" placeholder="" class="ignore-input" />
      </n-form-item>
      <n-form-item label="Last Name" path="lastName">
        <n-input v-model:value="model.lastName" placeholder="" class="ignore-input" />
      </n-form-item>
      <n-form-item label="Gender" path="sex" required>
        <n-radio-group v-model:value="model.sex" name="gender">
          <n-space>
            <n-radio :value="1"> Male </n-radio>
            <n-radio :value="0"> Female </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Birth Date" path="birthday" required>
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
        <n-input v-model:value="model.card" placeholder="" class="ignore-input" />
      </n-form-item>
      <n-form-item label="Organization" path="unitId" required>
        <n-select
          v-model:value="model.unitId"
          filterable
          :filter="filterFn"
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
      <n-form-item
        v-if="model.unit && model.unit.secondId !== 29"
        label="Sector"
        path="unit.secondId"
        required
      >
        <n-select
          v-model:value="model.unit.secondId"
          filterable
          clearable
          tag
          label-field="sectorEn"
          value-field="id"
          :fallback-option="false"
          :options="sectorList"
        />
      </n-form-item>
      <n-form-item label="Position" path="jobEn" required>
        <n-input v-model:value="model.jobEn" placeholder="" class="ignore-input" />
      </n-form-item>
      <n-form-item label="Email" path="email" required>
        <n-input v-model:value="model.email" disabled placeholder="" class="ignore-input" />
      </n-form-item>
      <n-form-item label="Phone Number" path="tel" required>
        <n-input v-model:value="model.tel" placeholder="" class="ignore-input" />
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

    <div class="text-right mt-11rem <sm:text-center">
      <n-button
        color="#044EB3"
        class="text-2rem w-19rem h-5.6rem border-rd-2.8rem <sm:w-70rem <sm:h-7rem <sm:border-rd-3.5rem <sm:text-3.2rem"
        @click="submit"
      >
        CONTINUE
      </n-button>
    </div>
  </div>
</template>

<style lang="scss">
.n-date-panel .n-date-panel-month-calendar .n-date-panel-month-calendar__picker-col-item {
  font-size: 1.4rem !important;
}
.mobile .n-date-panel .n-date-panel-month-calendar .n-date-panel-month-calendar__picker-col-item {
  font-size: 2.4rem !important;
}
</style>

<style scoped lang="scss">
.ignore-input {
  height: 34px;
}
</style>
