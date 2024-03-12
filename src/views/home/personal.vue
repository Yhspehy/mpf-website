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

const model = ref({
  id: null,
  firstName: '',
  lastName: '',
  nameEn: '',
  cardType: '1',
  card: '',
  sex: 1,
  country: '',
  unit: {
    nameEn: ''
  },
  unitId: '',
  jobEn: '',
  tel: '',
  email: '',
  isForeign: 1,
  isContact: '0'
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

function updateUnit(_value, option) {
  model.unit.nameCn = option.nameCn;
}

watchEffect(() => {
  model.value.nameEn = model.value.firstName + ' ' + model.value.lastName;
});

function submit() {
  updateMember(model.value).then((resp) => {
    if (resp.code !== '0') return;
    const appStore = useAppStore();
    appStore.mpfId = model.value.id;
    // 默认参与总论坛
    updateMemberInfo({
      id: model.value.id,
      memberForumTemp: {
        id: memberForumTemp?.id || null,
        memberId: model.value.id,
        forumId: forumId,
        isContact: model.value.isContact,
        isDelete: 0
      }
    }).then((result) => {
      if (result.code === '0') {
        message.success('Save success!');
      }
    });
  });
}

const email = localStg.get('email');
let memberForumTemp = {};
getMember(email).then((res) => {
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
  <div class="mx-auto max-w-1055px py-30px">
    <div class="text-50px font-bold text-center">Personal Details</div>

    <div class="color-#0040FF text-22px mb-30px font-bold" style="border-bottom: 1px solid #eee">
      Your Personal Details
    </div>
    <n-form
      class="w-1055px mt-20px"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="420"
      label-align="left"
      require-mark-placement="left"
      size="medium"
    >
      <n-form-item label="First Name" path="firstName">
        <n-input v-model:value="model.firstName" placeholder="" />
      </n-form-item>
      <n-form-item label="Last Name" path="lastName">
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
      <!-- <n-form-item label="Participation Method" path="participationMethod" required>
        <n-radio-group v-model:value="model.participationMethod" name="participationMethod">
          <n-space>
            <n-radio value="offline"> Offline </n-radio>
            <n-radio value="online"> Online </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item> -->
      <n-form-item label="Passport Number" path="card" required>
        <n-input v-model:value="model.card" placeholder="" />
      </n-form-item>
      <n-form-item label="Organization" path="unitId" required>
        <n-select
          v-model:value="model.unitId"
          filterable
          clearable
          label-field="nameCn"
          value-field="id"
          :fallback-option="false"
          :options="unitList"
          :remote="true"
          :loading="selectLoading"
          @update:value="updateUnit"
          @blur="() => handleSelectSearch(model.unit.nameCn)"
          @search="handleSelectSearch"
        />
      </n-form-item>
      <n-form-item label="Position" path="jobEn" required>
        <n-input v-model:value="model.jobEn" placeholder="" />
      </n-form-item>
      <n-form-item label="Nationality" path="country" required>
        <n-input v-model:value="model.country" placeholder="" />
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

    <div class="text-right mt-110px">
      <n-button color="#0040FF" class="w-190px h-56px border-rd-28px" @click="submit">
        Save
      </n-button>
    </div>
  </div>
</template>
