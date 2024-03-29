<script setup>
import { debounce } from 'lodash-es';

import { useAppStore } from '@/stores';
import { localStg } from '@/utils/storage';

import { registerEmail } from '@/service/api/auth';
import { getStaticInSign, getUnit, updateMemberInSign, updateMemberInfo } from '@/service/api/mpf';

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
  sex: '1',
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
    unitList.value = res.data ? res.data.filter((e) => e.nameEn) : [];
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
  formIns.value?.validate((errors) => {
    if (!errors) {
      const formValue = {
        ...model.value
      };
      if (formValue.unitId) delete formValue.unit;
      updateMemberInSign(
        formValue,
        route.query.sign,
        route.query.timestamp,
        route.query.email
      ).then((resp) => {
        if (resp.code !== '0') return;
        localStg.set('mpfId', resp.data.id);
        registerEmail(
          model.value.email,
          model.value.tel,
          route.query.sign,
          route.query.timestamp
        ).then((auth) => {
          localStg.set('email', model.value.email);
          localStg.set('token', auth.token);
          app.mpfId = resp.data.id;
          updateMemberInfo({
            id: resp.data.id,
            memberForumTemp: {
              id: null,
              memberId: resp.data.id,
              forumId: forumId,
              isContact: model.value.isContact,
              isDelete: 0
            },
            memberInviteTemp: {
              inviteType: model.value.inviteType,
              status: 1,
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
});

model.value.email = route.query.email || '';
</script>

<template>
  <div class="mx-auto w-105rem py-3rem <sm:w-70rem">
    <div class="text-5rem font-bold text-center mb-10rem">Sign In</div>

    <div class="color-#0040FF text-2.2rem mb-3rem font-bold border-b pb-2rem">
      Please Put In Your Personal Details
    </div>

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
      <n-form-item label="Organization" path="unitId" required>
        <n-select
          v-model:value="model.unitId"
          filterable
          clearable
          tag
          label-field="nameEn"
          value-field="id"
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

    <div class="text-right mt-11rem <sm:text-center">
      <n-button
        color="#0040FF"
        class="text-2rem w-19rem h-5.6rem border-rd-2.8rem <sm:w-70rem <sm:h-7rem <sm:border-rd-3.5rem <sm:text-3.2rem"
        @click="submit"
      >
        CONTINUE
      </n-button>
    </div>
  </div>
</template>
