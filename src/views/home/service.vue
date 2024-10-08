<script setup>
import dayjs from 'dayjs';
import { getStatic, getMemberInfo, updateMemberInfo } from '@/service/api/mpf';

import { useAppStore } from '@/stores';

defineOptions({
  name: 'ServicePage'
});

const route = useRoute();
const message = useMessage();

const isEdit = ref(false);

const app = useAppStore();

const hotelList = ref([]);

const travel = ref({
  isWelcome: 0,
  welType: '',
  welClasses: '',
  welTime: null,
  isDelivery: 0,
  delType: '',
  delClasses: '',
  delTime: null
});

const hotel = ref({
  hotelIdx: null,
  roomIdx: null,
  timeRange: null,
  name: '',
  room: '',
  time: '',
  prize: ''
});

let memberInfo = {};

function getList() {
  window.$appLoading(true);
  getStatic().then((result) => {
    if (result.data) {
      let hotelMap = {};
      result.data.forumHotel.forEach((e) => {
        if (
          e.hotelEn === 'Wonderland Hotel（Conference Hotel）' ||
          (e.hotelEn === 'CORDIS Dongqian Lake' && e.price === 4600)
        ) {
          if (hotelMap[e.hotelEn]) {
            hotelMap[e.hotelEn].rooms.push({
              ...e,
              apartment: e.apartmentEn + ' ¥' + e.price,
              idx: hotelMap[e.hotelEn].rooms.length
            });
          } else {
            hotelMap[e.hotelEn] = {
              name: e.hotelEn,
              rooms: [
                {
                  ...e,
                  apartment: e.apartmentEn + ' ¥' + e.price,
                  idx: 0
                }
              ]
            };
          }
        }
      });

      hotelList.value = Object.keys(hotelMap).map((e, idx) => ({
        ...hotelMap[e],
        idx
      }));

      getMemberInfo(app.mpfId).then((res) => {
        if (res.data) {
          memberInfo = res.data || {};
          if (res.data.travelTemp) {
            travel.value = {
              isWelcome: res.data.travelTemp.isWelcome,
              welType: res.data.travelTemp.welType,
              welClasses: res.data.travelTemp.welClasses,
              welTime: res.data.travelTemp.welTime
                ? new Date(res.data.travelTemp.welTime).getTime()
                : null,
              isDelivery: res.data.travelTemp.isDelivery,
              delType: res.data.travelTemp.delType,
              delClasses: res.data.travelTemp.delClasses,
              delTime: res.data.travelTemp.delTime
                ? new Date(res.data.travelTemp.delTime).getTime()
                : null
            };
          }

          if (res.data.forumMemberHotelTemp) {
            if (
              res.data.forumMemberHotelTemp.forumHotel.hotelDo.nameEn !==
                'Wonderland Hotel（Conference Hotel）' &&
              !(
                res.data.forumMemberHotelTemp.forumHotel.hotelDo.nameEn ===
                  'CORDIS Dongqian Lake' && res.data.forumMemberHotelTemp.forumHotel.price === 4600
              )
            ) {
              result.data.forumHotel.forEach((e) => {
                if (e.hotelEn !== res.data.forumMemberHotelTemp.forumHotel.hotelDo.nameEn) return;
                if (e.hotelEn === 'CORDIS Dongqian Lake' && e.price === 4600) return;
                if (hotelMap[e.hotelEn]) {
                  hotelMap[e.hotelEn].rooms.push({
                    ...e,
                    apartment: e.apartmentEn + ' ¥' + e.price,
                    idx: hotelMap[e.hotelEn].rooms.length
                  });
                } else {
                  hotelMap[e.hotelEn] = {
                    name: e.hotelEn,
                    rooms: [
                      {
                        ...e,
                        apartment: e.apartmentEn + ' ¥' + e.price,
                        idx: 0
                      }
                    ]
                  };
                }
              });
            }

            hotelList.value = Object.keys(hotelMap).map((e, idx) => ({
              ...hotelMap[e],
              idx
            }));

            const hotelIdx = hotelList.value.findIndex(
              (e) => e.name === res.data.forumMemberHotelTemp.forumHotel.hotelDo.nameEn
            );
            let roomIdx = null;
            if (hotelIdx > -1) {
              roomIdx = hotelList.value[hotelIdx].rooms.findIndex(
                (e) => e.hotelId === res.data.forumMemberHotelTemp.forumHotel.hotelDo.id
              );
            }

            hotel.value = {
              hotelIdx: hotelIdx > -1 ? hotelIdx : null,
              roomIdx: roomIdx,
              timeRange: [
                new Date(res.data.forumMemberHotelTemp.startTime).getTime(),
                new Date(res.data.forumMemberHotelTemp.endTime).getTime()
              ],
              name: res.data.forumMemberHotelTemp.forumHotel.hotelDo.nameEn,
              room: res.data.forumMemberHotelTemp.forumHotel.hotelDo.apartmentEn,
              prize: res.data.forumMemberHotelTemp.forumHotel.price,
              time: res.data.forumMemberHotelTemp.time
            };
          }
        }
      });
    }
  });
}

const rooms = computed(() => {
  if (hotelList.value) {
    return hotel.value.hotelIdx !== null && hotel.value.hotelIdx !== -1
      ? hotelList.value[hotel.value.hotelIdx].rooms
      : [];
  }
  return [];
});

function submit() {
  if (!isEdit.value) {
    isEdit.value = true;
    return;
  }
  if (
    travel.value.isWelcome &&
    (travel.value.welType === '' || travel.value.welClasses.trim() === '' || !travel.value.welTime)
  ) {
    return message.error('Please fill inbound journey info');
  }

  if (
    travel.value.isDelivery &&
    (travel.value.delType === '' || travel.value.delClasses.trim() === '' || !travel.value.delTime)
  ) {
    return message.error('Please fill back journey info');
  }
  const data = {
    id: app.mpfId,
    memberForumTemp: memberInfo.memberForumTemp,
    memberForumTemps: memberInfo.memberForumTemps,
    travelTemp: {
      ...travel.value,
      mfId: memberInfo.memberForumTemp?.id,
      isDelete: 0
    }
  };
  if (travel.value.welTime) {
    data.travelTemp.welTime = dayjs(travel.value.welTime).format('YYYY-MM-DD HH:mm:ss');
  }
  if (travel.value.delTime) {
    data.travelTemp.delTime = dayjs(travel.value.delTime).format('YYYY-MM-DD HH:mm:ss');
  }
  if (
    hotel.value.hotelIdx !== null &&
    hotel.value.roomIdx !== null &&
    hotel.value.timeRange &&
    hotel.value.timeRange.length > 1
  ) {
    const room = hotelList.value[hotel.value.hotelIdx].rooms[hotel.value.roomIdx];
    data.forumMemberHotelTemp = {
      mhId: room.id,
      mfId: memberInfo.memberForumTemp?.id,
      startTime: dayjs(hotel.value.timeRange[0]).format('YYYY-MM-DD'),
      endTime: dayjs(hotel.value.timeRange[1]).format('YYYY-MM-DD'),
      isDelete: 0
    };
  }
  updateMemberInfo(data).then((res) => {
    if (res.code === '0') {
      isEdit.value = false;
      message.success('Save success!');
      getList();
    }
  });
}

const travelStart = 1719187200000;
const travelEnd = 1719590399000;
const hotelStart = 1719100800000;
const hotelEnd = 1719532800000;
function dateDisabled(ts, type) {
  const date = new Date(ts).getTime();
  const start = type === 1 ? hotelStart : travelStart;
  const end = type === 1 ? hotelEnd : travelEnd;
  return date < start || date > end;
}

getList();
isEdit.value = route.query.type === 'edit';
</script>

<template>
  <div class="relative mx-auto w-105rem py-7rem <sm:w-70rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem <sm:text-left">
      MPF Service
    </div>

    <img src="/images/love.gif" class="w-24rem h-24rem absolute top-6rem right-0rem <sm:top-0" />

    <div v-if="isEdit">
      <div class="px-3.4rem flex w-full pt-2rem pb-5rem border-b <sm:border-t">
        <img
          src="/images/service-icon-trip@2x(1).png"
          class="w-4rem h-3.7rem <sm:mt-0.5rem"
          alt=""
        />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold <sm:text-3rem">Inbound Journey</div>

          <n-form
            class="mt-2rem"
            :label-placement="app.isMobile ? 'top' : 'left'"
            label-width="42rem"
            label-align="left"
            require-mark-placement="left"
          >
            <n-form-item label="Require Pick-up Service" path="isWelcome">
              <n-radio-group v-model:value="travel.isWelcome" name="isWelcome">
                <n-space>
                  <n-radio :value="1"> Yes </n-radio>
                  <n-radio :value="0"> No </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <template v-if="travel.isWelcome === 1">
              <n-form-item label="Travel Method" path="welType" required>
                <n-radio-group v-model:value="travel.welType" name="gender">
                  <n-space>
                    <n-radio :value="1"> Plane </n-radio>
                    <n-radio :value="0"> High-Speed Railway </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="Flight / Class" path="welClasses" required>
                <n-input v-model:value="travel.welClasses" />
              </n-form-item>
              <n-form-item label="Arrival Time" path="welTime" required>
                <n-date-picker
                  v-model:value="travel.welTime"
                  type="datetime"
                  clearable
                  class="w-full"
                  input-readonly
                  format="yyyy-MM-dd HH:mm"
                  :default-calendar-start-time="travelStart"
                  :default-calendar-end-time="travelEnd"
                  :is-date-disabled="(ts) => dateDisabled(ts, 0)"
                  :time-picker-props="{
                    format: 'HH:mm'
                  }"
                />
              </n-form-item>
            </template>
          </n-form>
        </div>
      </div>

      <div class="px-3.4rem flex w-full pt-2rem pb-5rem border-b">
        <img src="/images/service-icon-trip@2x.png" class="w-4rem h-3.7rem <sm:mt-0.5rem" alt="" />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold <sm:text-3rem">Back Journey</div>

          <n-form
            class="mt-2rem"
            :label-placement="app.isMobile ? 'top' : 'left'"
            label-width="42rem"
            label-align="left"
            require-mark-placement="left"
          >
            <n-form-item label="Require Pick-up Service" path="isDelivery">
              <n-radio-group v-model:value="travel.isDelivery" name="isDelivery">
                <n-space>
                  <n-radio :value="1"> Yes </n-radio>
                  <n-radio :value="0"> No </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <template v-if="travel.isDelivery === 1">
              <n-form-item label="Travel Method" path="delType" required>
                <n-radio-group v-model:value="travel.delType" name="gender">
                  <n-space>
                    <n-radio :value="1"> Plane </n-radio>
                    <n-radio :value="0"> High-Speed Railway </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="Flight / Class" path="delClasses" required>
                <n-input v-model:value="travel.delClasses" />
              </n-form-item>
              <n-form-item label="Departure Time" path="delTime" required>
                <n-date-picker
                  v-model:value="travel.delTime"
                  type="datetime"
                  clearable
                  class="w-full"
                  input-readonly
                  format="yyyy-MM-dd HH:mm"
                  :default-calendar-start-time="travelStart"
                  :default-calendar-end-time="travelEnd"
                  :is-date-disabled="(ts) => dateDisabled(ts, 0)"
                  :time-picker-props="{
                    format: 'HH:mm'
                  }"
                />
              </n-form-item>
            </template>
          </n-form>
        </div>
      </div>

      <div class="px-3.4rem flex w-full pt-2rem pb-5rem border-b">
        <img
          src="/images/service-icon-hotel@2x.png"
          class="w-3.4rem h-3.6rem <sm:mt-0.5rem"
          alt=""
        />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold <sm:text-3rem">Hotel</div>

          <n-form
            class="mt-2rem"
            :label-placement="app.isMobile ? 'top' : 'left'"
            label-width="42rem"
            label-align="left"
            require-mark-placement="left"
          >
            <n-form-item label="My Hotel" path="delType">
              <n-select
                v-model:value="hotel.hotelIdx"
                :options="hotelList"
                label-field="name"
                value-field="idx"
                @update:value="hotel.roomIdx = null"
              />
            </n-form-item>
            <n-form-item label="Room Type" path="delClasses">
              <n-select
                v-model:value="hotel.roomIdx"
                :options="rooms"
                label-field="apartment"
                value-field="idx"
              />
            </n-form-item>
            <n-form-item label="Time" path="delTime">
              <n-date-picker
                v-model:value="hotel.timeRange"
                type="daterange"
                clearable
                class="w-full"
                input-readonly
                start-placeholder="Check In"
                end-placeholder="Check Out"
                :bind-calendar-months="true"
                :default-calendar-start-time="hotelStart"
                :default-calendar-end-time="hotelEnd"
                :is-date-disabled="(ts) => dateDisabled(ts, 1)"
              />
            </n-form-item>
          </n-form>
        </div>
      </div>
    </div>

    <div v-else class="py-4rem">
      <div class="px-3.4rem flex w-full py-3rem border-b <sm:border-t text-2rem">
        <img
          src="/images/service-icon-trip@2x(1).png"
          class="w-4rem h-3.7rem <sm:mt-0.5rem"
          alt=""
        />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold pb-1rem <sm:text-3rem">
            Inbound Journey
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Travel Method</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{
                travel.welType === 0 ? 'High-Speed Railway' : travel.welType === 1 ? 'Plane' : ''
              }}
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Flight / Class</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{ travel.welClasses }}
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Arrival Time</div>
            <div class="flex-1 color-#595757 py-2rem">
              {{ travel.welTime ? dayjs(travel.welTime).format('DD / MM / YYYY HH:mm') : '' }}
            </div>
          </div>
        </div>
      </div>

      <div class="px-3.4rem flex w-full pt-3rem pb-5rem border-b text-2rem">
        <img src="/images/service-icon-trip@2x.png" class="w-4rem h-3.7rem <sm:mt-0.5rem" alt="" />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold <sm:text-3rem pb-1rem">Back Journey</div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Travel Method</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{
                travel.delType === 0 ? 'High-Speed Railway' : travel.delType === 1 ? 'Plane' : ''
              }}
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Flight / Class</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{ travel.delClasses }}
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Departure Time</div>
            <div class="flex-1 color-#595757 py-2rem <sm:w-full">
              {{ travel.delTime ? dayjs(travel.delTime).format('DD / MM / YYYY HH:mm') : '' }}
            </div>
          </div>
        </div>
      </div>

      <div class="px-3.4rem flex w-full pt-3rem pb-5rem border-b text-2rem">
        <img src="/images/service-icon-trip@2x.png" class="w-4rem h-3.7rem <sm:mt-0.5rem" alt="" />
        <div class="ml-2rem flex-1">
          <div class="text-2.2rem color-#044EB3 font-bold <sm:text-3rem pb-1rem">Hotel</div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">My Hotel</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{ hotel.name }}
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Room Type</div>
            <div class="flex-1 border-b color-#595757 py-2rem <sm:w-full">
              {{ hotel.room
              }}<span class="color-#00D3CD">{{ hotel.prize ? ` | ¥${hotel.prize}` : '' }}</span>
            </div>
          </div>
          <div class="flex-y-center <sm:flex-col <sm:items-start <sm:mt-2rem">
            <div class="w-30rem color-#303030 font-bold">Time</div>
            <div class="flex-1 color-#595757 py-2rem">
              {{ hotel.timeRange ? dayjs(hotel.timeRange[0]).format('DD / MM') : '' }}
              {{ hotel.timeRange ? '-' + dayjs(hotel.timeRange[1]).format('DD / MM') : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>

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

<style lang="scss">
.n-date-panel-actions__suffix .n-button {
  padding: 1.5em 2em !important;
  font-size: 1.6rem;
}

.n-date-panel-calendar--end {
  display: none !important;
}
</style>
