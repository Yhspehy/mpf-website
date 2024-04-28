<script setup>
import dayjs from 'dayjs';
import { getStatic, getMemberInfo, updateMemberInfo } from '@/service/api/mpf';

import { useAppStore } from '@/stores';

defineOptions({
  name: 'signupForum'
});

const message = useMessage();
const router = useRouter();

const forumList = ref([]);

const forumSignList = ref([]);

let memberForumTemp = {};
let memberForumTemps = [];
let memberPlayForumTemp = [];

const app = useAppStore();

const expandedNames = ref([0, 1]);

function getList() {
  forumSignList.value = [];
  window.$appLoading(true);
  getStatic().then((res) => {
    const list = [
      {
        listName: '2024 MPF Main Forum',
        collapse: true,
        value: [],
        activity: []
      },
      {
        listName: 'MPF High-level Roundtable Meeting',
        collapse: true,
        disabled: true,
        value: [],
        activity: []
      },
      {
        listName: 'MPF Thematic Forum',
        collapse: false,
        value: [],
        type: 1,
        activity: []
      },
      {
        listName: 'Linkage Activities',
        collapse: false,
        value: [],
        type: 1,
        activity: []
      }
    ];

    res.data.forum.forEach((e) => {
      if (e.id === 12) {
        list[0].activity.push({
          type: 'forum',
          date: e.startTime?.slice(0, -3) || '',
          place: e.placeEn,
          value: e.id
        });
      } else if (e.id === 13) {
        list[1].activity.push({
          type: 'forum',
          date: e.startTime?.slice(0, -3) || '',
          place: e.placeEn,
          value: e.id
        });
      } else if (e.id !== 11) {
        list[2].activity.push({
          type: 'forum',
          name: e.nameEn,
          date: e.startTime?.slice(0, -3) || '',
          place: e.placeEn,
          value: e.id
        });
      }
    });

    res.data.memberPlay.forEach((e) => {
      if (e.type === 0) {
        list[3].activity.push({
          type: 'play',
          name: e.nameEn,
          date: e.startTime?.slice(0, -3) || '',
          place: e.placeEn,
          value: e.id
        });
      }
    });

    getMemberInfo(app.mpfId).then((res) => {
      if (!res.data) return;
      // 总论坛信息，默认参与
      memberForumTemp = res.data.memberForumTemp || {};
      // 子论坛信息
      memberForumTemps = res.data.memberForumTemps || [];
      if (memberForumTemps.length > 0) {
        memberForumTemps.forEach((e) => {
          forumSignList.value.push({
            title: e.forum.nameEn,
            time:
              dayjs(e.forum.startTime).format('DD.MM. YYYY            HH:mm') +
              ' - ' +
              dayjs(e.forum.endTime).format('HH:mm'),
            location: e.forum.placeEn
          });
          if (e.forumId === 12) {
            list[0].value.push(e.forumId);
          } else if (e.forumId === 13) {
            list[1].value.push(e.forumId);
          } else {
            const item = list[2].activity.find((el) => el.value === e.forumId);
            if (item) {
              if (!expandedNames.value.includes(2)) {
                expandedNames.value.push(2);
              }
              list[2].value.push(e.forumId);
            }
          }
        });
      }
      // 联名活动
      memberPlayForumTemp = res.data.memberPlayForumTemp || [];
      if (memberPlayForumTemp.length > 0) {
        memberPlayForumTemp.forEach((e) => {
          forumSignList.value.push({
            title: e.memberPlay.nameEn,
            time: e.memberPlay.time,
            location: e.memberPlay.placeEn
          });
          if (e.memberPlay.type === 0) {
            const item = list[3].activity.find((el) => el.value === e.mpId);
            if (item) {
              if (!expandedNames.value.includes(3)) {
                expandedNames.value.push(3);
              }
              list[3].value.push(e.mpId);
            }
          }
        });
      }

      list[2].activity.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      list[3].activity.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      forumList.value = list;
    });
  });
}

function handleChange(index, value, meta, disabled) {
  if (meta.actionType === 'check') {
    const timeList = [];
    forumList.value.forEach((e) => {
      if (e.value && e.value.length > 0) {
        e.value.forEach((el) => {
          const item = e.activity.find((a) => a.value === el);
          if (item) timeList.push(item.date);
        });
      }
    });
    const item = forumList.value[index].activity.find((e) => e.value === meta.value);
    if (item && timeList.includes(item.date)) {
      return message.error('Time Conflict!');
    }
    forumList.value[index].value = value;
  } else if (meta.actionType === 'uncheck') {
    forumList.value[index].value = value;
  }
}

function submit() {
  const forumId = [];
  const playId = [];
  forumList.value.forEach((e, idx) => {
    e.value.forEach((el) => {
      if (idx < 3) {
        forumId.push(el);
      } else {
        playId.push(el);
      }
    });
  });
  const data = {
    id: app.mpfId,
    memberForumTemp: memberForumTemp
  };

  if (forumId.length > 0 || memberForumTemps.length > 0) {
    memberForumTemps.forEach((e) => (e.isDelete = 1));
    forumId.forEach((e) => {
      const item = memberForumTemps.find((el) => el.forumId === e);
      if (item) {
        item.isDelete = 0;
      } else {
        memberForumTemps.push({
          memberId: app.mpfId,
          forumId: e,
          isDelete: 0
        });
      }
    });
    data.memberForumTemps = memberForumTemps;
  }

  if (playId.length > 0 || memberPlayForumTemp.length > 0) {
    memberPlayForumTemp.forEach((e) => (e.isDelete = 1));
    playId.forEach((e) => {
      const item = memberPlayForumTemp.find((el) => el.mpId === e);
      if (item) {
        item.isDelete = 0;
      } else {
        memberPlayForumTemp.push({
          mfId: memberForumTemp.id,
          mpId: e,
          isDelete: 0
        });
      }
    });
    data.memberPlayForumTemp = memberPlayForumTemp;
  }

  updateMemberInfo(data).then((result) => {
    if (result.code === '0') {
      message.success('Save success!');
      router.push('/home/qrcode');
    }
  });
}

getList();
</script>

<template>
  <div class="relative w-full py-7rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem">
      {{ app.isMobile ? 'Choose Your Agenda' : 'My Agenda' }}
    </div>

    <img src="/images/flower.gif" class="w-24rem h-17rem absolute top-8rem right-50rem" />

    <div class="px-45rem <sm:px-4rem">
      <div v-if="!app.isMobile" class="text-2.2rem color-#044EB3 font-bold mb-5rem">
        Choose Your Agenda
      </div>
      <n-collapse v-model:expanded-names="expandedNames">
        <n-collapse-item
          v-for="(item, index) in forumList"
          :key="index"
          :title="item.listName"
          :name="index"
        >
          <n-checkbox-group
            name="participationMethod"
            class="flex-col"
            :value="item.value"
            :disabled="item.disabled"
            @update-value="(value, meta) => handleChange(index, value, meta)"
          >
            <n-checkbox
              v-for="act in item.activity"
              :key="act.value"
              :value="act.value"
              class="mb-1rem"
            >
              <div class="font-bold text-2rem color-#303030">{{ act.name }}</div>
              <div class="font-bold text-2rem color-#303030">{{ act.date }}</div>
              <div class="text-2rem color-#666">{{ act.place }}</div>
            </n-checkbox>
          </n-checkbox-group>
        </n-collapse-item>
      </n-collapse>
    </div>

    <div class="text-right mt-11rem pr-45rem <sm:text-center <sm:pr-0">
      <n-button
        color="#044EB3"
        class="text-2rem w-19rem h-5.6rem border-rd-2.8rem <sm:w-70rem <sm:h-7rem <sm:border-rd-3.5rem <sm:text-3.2rem"
        @click="submit"
      >
        Submit
      </n-button>
    </div>
  </div>
</template>

<style lang="scss">
.n-collapse-item__header-main {
  color: #044eb3 !important;
  font-size: 2rem;
  background-color: #f1f1f1;
  .n-collapse-item-arrow {
    color: #044eb3 !important;
  }
}

.mobile .n-collapse-item__header-main {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
