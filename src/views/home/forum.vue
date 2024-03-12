<script setup>
import { getStatic, getMemberInfo, updateMemberInfo } from '@/service/api/mpf';

import { useAppStore } from '@/stores';

defineOptions({
  name: 'ForumPage'
});

const message = useMessage();

const forumList = ref([]);

const forumSignList = ref([]);

const isEdit = ref(false);

let memberForumTemp = {};
let memberForumTemps = [];
let memberPlayForumTemp = [];

const { mpfId } = useAppStore();

const expandedNames = ref([0, 1]);
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
        place: e.place,
        value: e.id
      });
    } else if (e.id === 13) {
      list[1].activity.push({
        type: 'forum',
        date: e.startTime?.slice(0, -3) || '',
        place: e.place,
        value: e.id
      });
    } else if (e.id !== 11) {
      list[2].activity.push({
        type: 'forum',
        name: e.name,
        date: e.startTime?.slice(0, -3) || '',
        place: e.place,
        value: e.id
      });
    }
  });

  res.data.memberPlay.forEach((e) => {
    list[3].activity.push({
      type: 'play',
      name: e.name,
      date: e.time?.slice(0, -3) || '',
      place: e.place,
      value: e.id
    });
  });

  getMemberInfo(mpfId).then((res) => {
    // 总论坛信息，默认参与
    memberForumTemp = res.data.memberForumTemp || {};
    // 子论坛信息
    memberForumTemps = res.data.memberForumTemps || [];
    if (memberForumTemps.length > 0) {
      memberForumTemps.forEach((e) => {
        forumSignList.value.push({
          title: e.forum.name,
          time: e.forum.startTime,
          location: e.forum.place
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
          title: e.memberPlay.name,
          time: e.memberPlay.time,
          location: e.memberPlay.place
        });
        const item = list[3].activity.find((el) => el.value === e.mpId);
        if (item) {
          if (!expandedNames.value.includes(3)) {
            expandedNames.value.push(3);
          }
          list[3].value.push(e.mpId);
        }
      });
    }
    forumList.value = list;
  });
});

function handleChange(index, value, meta, disabled) {
  if (meta.actionType === 'check') {
    const timeList = [];
    forumList.value.forEach((e) => {
      if (e.value && e.value.length > 0) {
        console.log(e.value);
        e.value.forEach((el) => {
          const item = e.activity.find((a) => a.value === el);
          if (item) timeList.push(item.date);
        });
      }
    });
    const item = forumList.value[index].activity.find((e) => e.value === meta.value);
    if (item && timeList.includes(item.date)) {
      return message.error('已经报了同一时间段的论坛');
    }
    forumList.value[index].value = value;
  } else if (meta.actionType === 'uncheck') {
    forumList.value[index].value = value;
  }
}

function submit() {
  if (!isEdit.value) {
    isEdit.value = true;
    return;
  }
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
    id: mpfId,
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
          memberId: mpfId,
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
    }
  });
}
</script>

<template>
  <div class="w-full py-7rem">
    <div class="text-5rem font-bold text-center mb-10rem">My Agenda</div>

    <div v-if="isEdit" class="px-45rem">
      <div class="text-2.2rem color-#0040FF font-bold mb-5rem">Choose Your Agenda</div>
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

    <div
      v-else
      v-for="(item, index) in forumSignList"
      :key="index"
      class="flex py-4rem px-45rem"
      :style="{
        backgroundColor: index % 2 ? '#F8F8F8' : '#F1F1F1'
      }"
    >
      <img src="/public/images/agenda-icon-title@2x.png" class="w-6.3rem h-5.6rem" alt="" />
      <div class="ml-3.4rem">
        <div class="text-3rem color-#0040FF font-bold">{{ item.title }}</div>
        <div class="text-2.2rem color-#303030 flex-y-center">
          <img
            src="/public/images/agenda-icon-time@2x.png"
            class="w-2.2rem h-2.2rem mr-0.8rem"
            alt=""
          />
          {{ item.time }}
        </div>
        <div class="text-2.2rem color-#989898 flex-y-center">
          <img
            src="/public/images/agenda-icon-position@2x.png"
            class="w-1.8rem h-2.5rem mr-1.2rem"
            alt=""
          />
          {{ item.location }}
        </div>
      </div>
    </div>

    <div class="text-right mt-11rem mx-45rem">
      <n-button color="#0040FF" class="w-190px h-56px border-rd-28px" @click="submit">
        {{ isEdit ? 'Save' : 'Edit' }}
      </n-button>
    </div>
  </div>
</template>

<style lang="scss">
.n-collapse-item__header-main {
  color: #0040ff !important;
  font-size: 2rem;
  background-color: #f1f1f1;
  .n-collapse-item-arrow {
    color: #0040ff !important;
  }
}
</style>
