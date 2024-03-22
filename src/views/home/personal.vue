<script setup>
import { debounce } from 'lodash-es';

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
  inviteType: 0
});

const rules = {
  firstName: {
    required: true,
    trigger: ['blur', 'input']
  },
  lastName: {
    required: true,
    trigger: ['blur', 'input']
  },
  card: {
    required: true,
    trigger: ['blur', 'input']
  },
  unit: {
    nameEn: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'organization is required'
    }
  },
  jobEn: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'position is required'
  },
  tel: {
    required: true,
    trigger: ['blur', 'input']
  },
  email: {
    required: true,
    trigger: ['blur', 'input']
  }
};

const unitList = ref([]);
const selectLoading = ref(false);

/** 下拉框-异步的时候搜索函数-节流，300毫秒执行一次 */
const handleSelectSearch = debounce((query) => {
  handleSearch(query);
}, 300);

function handleSearch(name) {
  selectLoading.value = true;
  getUnit(name).then((res) => {
    selectLoading.value = false;
    unitList.value = res.data || [];
  });
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
      updateMember(model.value).then((resp) => {
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
  handleSearch();
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
  <div class="mx-auto w-105rem py-3rem <sm:w-70rem">
    <div class="text-5rem font-bold text-center mb-10rem">Personal Details</div>

    <div v-if="!app.isMobile" class="color-#0040FF text-2.2rem mb-3rem font-bold border-b pb-2rem">
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
      <n-form-item label="Passport Number" path="card" required>
        <n-input v-model:value="model.card" placeholder="" />
      </n-form-item>
      <n-form-item label="Organization" path="unit.nameEn" required>
        <n-select
          v-model:value="model.unitId"
          filterable
          clearable
          label-field="nameEn"
          value-field="id"
          :fallback-option="false"
          :options="unitList"
          :remote="true"
          :loading="selectLoading"
          @update:value="updateUnit"
          @blur="() => handleSelectSearch(model.unit.nameEn)"
          @search="handleSelectSearch"
        />
      </n-form-item>
      <n-form-item label="Position" path="jobEn" required>
        <n-input v-model:value="model.jobEn" placeholder="" />
      </n-form-item>
      <n-form-item label="Email" path="email" required>
        <n-input v-model:value="model.email" placeholder="" />
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
        color="#0040FF"
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
