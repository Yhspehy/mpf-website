<script setup>
import { debounce } from 'lodash-es';

import { useAppStore } from '@/stores';
import { localStg } from '@/utils/storage';

import { registerEmail } from '@/service/api/auth';
import {
  getStatic,
  getUnit,
  updateMember,
  updateMemberInSign,
  updateMemberInfo
} from '@/service/api/mpf';

defineOptions({
  name: 'SignUp'
});

const router = useRouter();
const message = useMessage();
const route = useRoute();

const model = ref({
  id: null,
  firstName: 'fn',
  lastName: 'neil',
  nameEn: '',
  cardType: '1',
  card: '111',
  sex: '1',
  country: 'china',
  unit: {
    nameEn: ''
  },
  unitId: '',
  jobEn: '11',
  tel: '111',
  email: '670395851@qq.com',
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

watchEffect(() => {
  model.value.nameEn = model.value.firstName + ' ' + model.value.lastName;
});

function submit() {
  updateMember(model.value, route.query.sign, route.query.timestamp, route.query.email).then(
    (resp) => {
      if (resp.code !== '0') return;
      // registerEmail(
      //   model.value.email,
      //   model.value.tel,
      //   route.query.sign,
      //   route.query.timestamp
      // ).then((auth) => {
      //   localStg.set('token', auth.message.token);
      const appStore = useAppStore();
      appStore.mpfId = resp.data.id;
      updateMemberInfo({
        id: resp.data.id,
        memberForumTemp: {
          id: null,
          memberId: resp.data.id,
          forumId: forumId,
          isContact: model.value.isContact,
          isDelete: 0
        }
      }).then((result) => {
        if (result.code === '0') {
          message.success('SignIn success!');
          router.push('/home/person');
        }
      });
      // });
    }
  );
}

/** 获取主论坛id */
let forumId = 11;
// getStatic().then((res) => {
//   if (res.data && res.data.forum) {
//     forumId = res.data.forum.find((e) => e.type === 0).id;
//   }
// });

model.value.email = route.query.email || '';
</script>

<template>
  <div class="mx-auto max-w-1055px py-30px">
    <div class="text-50px font-bold text-center">Sign In</div>

    <div class="color-#0040FF text-22px mb-30px font-bold" style="border-bottom: 1px solid #eee">
      Please Put In Your Personal Details
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
            <n-radio value="1"> Male </n-radio>
            <n-radio value="0"> Female </n-radio>
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
        Submit
      </n-button>
    </div>
  </div>
</template>
