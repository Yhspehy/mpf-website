<script setup>
import { useAppStore } from '@/stores';

import { addVolunteer } from '@/service/api/mpf';

import useUpload from './use-upload';

defineOptions({
  name: 'VolunteerPage'
});

const dialog = useDialog();
const message = useMessage();
const { handleUpload, fileList } = useUpload();

const formIns = ref(null);
const model = ref({
  unit: '',
  groupOrganization: '',
  name: '',
  idCard: '',
  age: '',
  gender: '男',
  workUnit: '',
  department: '',
  position: '',
  politicalStatus: '',
  highestEducation: '',
  englishLevel: '',
  excelSkill: '',
  receptionExperience: '',
  volunteerExperience: '',
  tel: '',
  homeAddress: '',
  hobbies: '',
  personalPhoto: ''
});

const rules = {
  unit: {
    required: true,
    trigger: ['blur', 'input'],
    message: '单位简称是必填的'
  },
  groupOrganization: {
    required: true,
    trigger: ['blur', 'input'],
    message: '所在团组织是必填的'
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '姓名是必填的'
  },
  idCard: {
    required: true,
    trigger: ['blur', 'input'],
    message: '身份证号是必填的'
  },
  age: {
    required: true,
    trigger: ['blur', 'input'],
    message: '年龄是必填的'
  },
  workUnit: {
    required: true,
    trigger: ['blur', 'input'],
    message: '工作单位是必填的'
  },
  department: {
    required: true,
    trigger: ['blur', 'input'],
    message: '部门是必填的'
  },
  position: {
    required: true,
    trigger: ['blur', 'input'],
    message: '职务是必填的'
  },
  politicalStatus: {
    required: true,
    trigger: ['blur', 'input'],
    message: '政治面貌是必填的'
  },
  highestEducation: {
    required: true,
    trigger: ['blur', 'input'],
    message: '最高学历是必填的'
  },
  englishLevel: {
    required: true,
    trigger: ['blur', 'input'],
    message: '英语水平是必填的'
  },
  excelSkill: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'EXCEL掌握程度是必填的'
  },
  receptionExperience: {
    required: true,
    trigger: ['blur', 'input'],
    message: '会务接待经验是必填的'
  },
  volunteerExperience: {
    required: true,
    trigger: ['blur', 'input'],
    message: '志愿服务经验是必填的'
  },
  tel: {
    required: true,
    trigger: ['blur', 'input'],
    message: '联系方式是必填的'
  },
  homeAddress: {
    required: true,
    trigger: ['blur', 'input'],
    message: '家庭住址是必填的'
  },
  hobbies: {
    required: true,
    trigger: ['blur', 'input'],
    message: '爱好特长是必填的'
  },
  personalPhoto: {
    required: true,
    message: '个人照片是必填的'
  }
};

const app = useAppStore();
function submit() {
  formIns.value?.validate(async (errors) => {
    if (!errors) {
      addVolunteer(model.value).then((res) => {
        if (res.code === '0') {
          message.success(res.message);
        }
      });
    }
  });
}

watch(
  () => fileList.value,
  (val) => {
    if (val.length === 0) {
      model.value.personalPhoto = '';
    } else {
      model.value.personalPhoto = btoa(val[0].url);
    }
  }
);

dialog.info({
  title: '志愿者报名',
  content: '海丝论坛志愿者招募，仅对浙江海港集团员工开放',
  negativeText: '取消',
  positiveText: '确定'
});
</script>

<template>
  <div class="relative mx-auto w-105rem py-3rem <sm:w-70rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem">志愿者报名</div>

    <div class="color- text-2.2rem mb-3rem font-bold border-b pb-2rem">请输入志愿者个人信息</div>

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
      <n-form-item label="单位简称" path="unit">
        <n-input v-model:value="model.unit" class="ignore-input" />
      </n-form-item>
      <n-form-item label="所在团组织" path="groupOrganization">
        <n-input v-model:value="model.groupOrganization" class="ignore-input" />
      </n-form-item>
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="model.name" class="ignore-input" />
      </n-form-item>
      <n-form-item label="身份证号" path="idCard">
        <n-input v-model:value="model.idCard" class="ignore-input" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input v-model:value="model.age" class="ignore-input" />
      </n-form-item>
      <n-form-item label="性别" path="gender" required>
        <n-radio-group v-model:value="model.gender" name="gender">
          <n-space>
            <n-radio value="男"> 男 </n-radio>
            <n-radio value="女"> 女 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="工作单位" path="workUnit">
        <n-input v-model:value="model.workUnit" class="ignore-input" />
      </n-form-item>
      <n-form-item label="部门" path="department">
        <n-input v-model:value="model.department" class="ignore-input" />
      </n-form-item>
      <n-form-item label="职务" path="position">
        <n-input v-model:value="model.position" class="ignore-input" />
      </n-form-item>
      <n-form-item label="政治面貌" path="politicalStatus">
        <n-input v-model:value="model.politicalStatus" class="ignore-input" />
      </n-form-item>
      <n-form-item label="最高学历" path="highestEducation">
        <n-input v-model:value="model.highestEducation" class="ignore-input" />
      </n-form-item>
      <n-form-item label="英语水平" path="englishLevel">
        <n-input v-model:value="model.englishLevel" class="ignore-input" />
      </n-form-item>
      <n-form-item label="EXCEL掌握程度" path="excelSkill">
        <n-input v-model:value="model.excelSkill" class="ignore-input" />
      </n-form-item>
      <n-form-item label="会务接待经验" path="receptionExperience">
        <n-input v-model:value="model.receptionExperience" class="ignore-input" />
      </n-form-item>
      <n-form-item label="志愿服务经验" path="volunteerExperience">
        <n-input v-model:value="model.volunteerExperience" class="ignore-input" />
      </n-form-item>
      <n-form-item label="联系方式" path="tel">
        <n-input v-model:value="model.tel" class="ignore-input" />
      </n-form-item>
      <n-form-item label="家庭住址" path="homeAddress">
        <n-input v-model:value="model.homeAddress" class="ignore-input" />
      </n-form-item>
      <n-form-item label="爱好特长" path="hobbies">
        <n-input v-model:value="model.hobbies" class="ignore-input" />
      </n-form-item>
      <n-form-item label="个人照片" path="personalPhoto">
        <n-upload
          accept="image/*"
          list-type="image-card"
          :max="1"
          v-model:file-list="fileList"
          :custom-request="handleUpload"
        />
      </n-form-item>
    </n-form>

    <div class="text-right mt-11rem <sm:text-center">
      <n-button
        color="#044EB3"
        class="text-2rem w-19rem h-5.6rem border-rd-2.8rem <sm:w-70rem <sm:h-7rem <sm:border-rd-3.5rem <sm:text-3.2rem"
        @click="submit"
      >
        提交
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ignore-input {
  height: 34px;
}
</style>
