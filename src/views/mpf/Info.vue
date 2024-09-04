<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'MpfInfo'
});

const app = useAppStore();

const p2 = `清风徐徐，荷韵悠悠，期待与您在“书藏古今、港通天下”的滨海宁波相会，共襄港航盛事！`;
const p3 = `联系人：
张女士：+86 18868100609
顾先生：+86 18868634100
电子邮箱：forum@nbport.com.cn`;
</script>

<template>
  <div
    class="w-full min-h-100vh pb-20px px-20px flex-col items-center login-page"
    :class="{
      'bg-pc': !app.isMobile,
      'bg-mobile': app.isMobile
    }"
  >
    <nav-bar />

    <div class="card">
      <div class="title">
        <div class="title-circle"></div>
        诚挚邀请
      </div>
      <div class="whitespace-pre-wrap text">
        2025海丝港口国际合作论坛<span class="color-#2a4f9f">聚焦港航交通的绿色可持续发展</span
        >，将于<span class="color-#2a4f9f">2025年5月26日-29日</span
        >在浙江宁波举办。本次论坛设置了开幕式暨主论坛、高层圆桌会、国际友好港合作会议、专题论坛等活动，围绕“国际陆向与海运物流”“数字信息与指数服务”“金融服务港航发展”“绿色能源开发”“引航服务”“法律服务”6个议题召开专题论坛，组织港航新兴技术主题展览、港产城参观、HI
        SEA PARTY等N个联动活动。
      </div>
      <div class="whitespace-pre-wrap text">{{ p2 }}</div>
      <div class="whitespace-pre-wrap text">{{ p3 }}</div>
    </div>

    <div class="card">
      <div class="title">
        <div class="title-circle"></div>
        论坛背景
      </div>
      <div class="text">
        中华人民共和国国家主席习近平提出 "一带一路 "合作
        倡议，以互联互通为主线，为世界经济增长注入新动
        能，为全球发展开辟新空间，为国际经济合作打造新平 台。 论坛坚持
      </div>
      <div class="text">
        " 海 丝 港 口 合 作 论 坛 " 积 极 响 应 " 一 带 一 路 " 倡 议 和
        世界一流强港建设战略，同时弘扬 "和平合作，开放 包容，互学互鉴，互利互赢"的丝路精神，<span
          class="color-#2a4f9f"
          >成为“一带一路”港航专业领域多边对话合作的重要平台。</span
        >
      </div>
      <div class="text">
        2015年以来，海丝港口合作论坛，立足于服务构建新 发展格局，打造 "一带一路
        "框架下港航合作开放交 流和互学互鉴平台，推动建设全球港航命运共同体。
      </div>
      <div class="text">"平等、合作、互利、共赢 "的宗旨，遵循 "共商、共建、共享"的原则。</div>
      <img src="https://pic.imgdb.cn/item/66d70232d9c307b7e9a172c2.png" alt="" class="w-full" />
      <div class="subTitle">
        <div class="title-circle"></div>
        平等
      </div>
      <div class="text">
        论坛的代表，不论所属国家和地区及单位经营规 模大小，应相互尊重，互学互鉴；论坛的组织和
        运作由论坛代表共同参与；论坛的议题设置充分 尊重与会代表的选择，反映代表的关注，体现代
        表的意愿。
      </div>

      <div class="subTitle">
        <div class="title-circle"></div>
        合作
      </div>
      <div class="text">
        论坛为与会成员搭建涵盖业务、投资、技术、 人 才、信息、口岸、文化等多方面的供需对接和合
        作平台。
      </div>

      <div class="subTitle">
        <div class="title-circle"></div>
        互利
      </div>
      <div class="text">论坛促进与会代表交流了解，共商共享，优势互 补，互惠互利。</div>

      <div class="subTitle">
        <div class="title-circle"></div>
        共赢
      </div>
      <div class="text">论坛促进与会代表达成共赢的合作共识。</div>
      <img src="https://pic.imgdb.cn/item/66d70233d9c307b7e9a17400.jpg" alt="" class="w-full" />
      <img
        src="https://pic.imgdb.cn/item/66d70208d9c307b7e9a15045.jpg"
        alt=""
        class="w-full rd-8px"
      />
    </div>

    <div class="card">
      <div class="title letter-space">
        <div class="title-circle"></div>
        共建
      </div>
      <div class="text mb-20px!">
        海丝港口合作论坛创办于2015年，迄今已成功举办8届，受海内外行业与媒体的广泛关注，致力于推动全球港航命运共同体建设。论坛由浙江省海港集团、宁波舟山港集团作为主牵头承办，多家知名港航企业、制造企业、信息技术企业和传媒企业共同支持，是国内最早创设、最为成熟的国际性港航类论坛。迈向第10年，论坛已成为全球港航界的年度盛会，浙江省对外开放和一流强港建设的亮点活动和有力抓手。
      </div>
      <div class="text">
        与会嘉宾通过广泛深入沟通交流，把握全球港航最新发
        展趋势，凝聚开放合作共识，谋求服务构建新发展格局 和推动世界经贸发展。
      </div>

      <img src="https://pic.imgdb.cn/item/66d70234d9c307b7e9a1751d.jpg" alt="" class="w-full" />

      <div class="text">
        涵盖50%以上的共建“一带一路”国家和地区、60%的全球前10大码头运营商、65%的全球前20大货代公司、90%的全球前20大班轮公司、95%的全球前40大集装箱港口、100%的全球前10大国际性航运中心、100%的国内省级港口集团。
      </div>

      <div class="title letter-space">
        <div class="title-circle"></div>
        共商
      </div>
      <div class="text">
        来自全球知名港航单位、政府单位、国际组织、研究机
        构等领域的高层领导、行业专家、业界精英在会上分别
        从不同领域和视角，集中聚焦港口投资合作、多式联运
        发展、智慧化数字化赋能、绿色港航发展、全球航运服 务等热门议题发表主题演讲。
      </div>

      <div class="title letter-space">
        <div class="title-circle"></div>
        共促
      </div>
      <div class="text">
        海丝论坛已发展为全球港航合作战略的对接平台、 港航合作要素的组合平台、 港航合作项目的洽谈平
        台，全球港口、航运企业高层和港航监管组织领导 在高层圆桌论坛、主题论坛上，分别从不同领域和
        视角，开拓新视野，提供新思路，成为各方共商合 作、共享成果、共促新发展的重要平台。<span
          class="color-#2a4f9f"
          >论坛上形 成的核心成果被纳入国家第二、三届 "一带一路 " 国际合作高峰论坛成果清单。</span
        >
      </div>
      <img src="https://pic.imgdb.cn/item/66d70232d9c307b7e9a1722f.jpg" alt="" class="w-full" />

      <img
        src="https://pic.imgdb.cn/item/66d70232d9c307b7e9a17270.jpg"
        alt=""
        class="w-full mt-10px"
      />
      <img
        src="https://pic.imgdb.cn/item/66d70209d9c307b7e9a151a1.jpg"
        alt=""
        class="w-full rd-8px"
      />
    </div>

    <div class="card">
      <div class="title letter-space">
        <div class="title-circle"></div>
        共融
      </div>
      <div class="subTitle">01 .多彩的文化</div>
      <div class="text mb-20px!">
        海丝论坛将舞台剧、现场书画篆刻表演、创新展 等艺术形式搬上论坛舞台，并提供港区参观，小
        型业务洽谈等场外活动安排。
      </div>
      <img
        src="https://pic.imgdb.cn/item/66d7023ad9c307b7e9a17ab6.jpg"
        alt=""
        class="w-full mt-10px"
      />
      <div class="flex mb-10px">
        <img
          src="https://pic.imgdb.cn/item/66d7023ad9c307b7e9a17ad8.jpg"
          alt=""
          class="w-50% object-contain"
        />
        <img
          src="https://pic.imgdb.cn/item/66d70207d9c307b7e9a14ed7.jpg"
          alt=""
          class="w-24% object-cover rd-10px mx-4px"
        />
        <img
          src="https://pic.imgdb.cn/item/66d70208d9c307b7e9a14f8c.jpg"
          alt=""
          class="w-24% object-cover rd-10px"
        />
      </div>

      <div class="subTitle">02.温暖的力量</div>
      <div class="text mb-20px!">
        海丝论坛为所有与会嘉宾提供贴心的服务，专门 组建了一支经过专业培训的志愿者团队，提供专
        业的解说，嘉宾注册，现场支持等保障服务。
      </div>
      <img
        src="https://pic.imgdb.cn/item/66d70208d9c307b7e9a14ffb.jpg"
        alt=""
        class="w-full rd-10px"
      />
      <div class="flex-center mb-20px">
        <img
          src="https://pic.imgdb.cn/item/66d7023ad9c307b7e9a17a94.jpg"
          alt=""
          class="w-50% object-contain rd-10px"
        />
        <img
          src="https://pic.imgdb.cn/item/66d7023ad9c307b7e9a17b04.jpg"
          alt=""
          class="w-50% object-contain rd-10px mr-4px"
        />
      </div>

      <div class="subTitle">03.共同的关注</div>
      <div class="text mb-20px!">
        海丝论坛的举办，引起了媒体对论坛的广泛关 注和深入报道，进一步推动了海丝论坛品牌的 建立。
      </div>

      <div class="subTitle">04.宝贵的商机</div>
      <div class="text mb-20px!">
        海丝论坛通过商业合作吸纳各行业赞助合作商，为合作伙伴提供招商洽谈展位、互动视频展示、联动活动赞助等，机械工程、物流货代、能源科技、金融保险等多个与港航产业关联的企业主体广泛参与进来，展示形象、推介产品、扩大销售、实现交易。
      </div>
      <img
        src="https://pic.imgdb.cn/item/66d70215d9c307b7e9a15af1.jpg"
        alt=""
        class="w-full rd-10px"
      />
      <div class="flex-center mb-20px">
        <img
          src="https://pic.imgdb.cn/item/66d70214d9c307b7e9a159d1.jpg"
          alt=""
          class="w-50% object-contain rd-10px"
        />
        <img
          src="https://pic.imgdb.cn/item/66d7021ad9c307b7e9a1607b.jpg"
          alt=""
          class="w-50% object-contain rd-10px mr-4px"
        />
      </div>

      <div class="subTitle">05.丰富的文创</div>
      <div class="text mb-20px!">
        海丝论坛推出系列文创，30余款论坛衍生周边可供选择。以论坛主视觉为设计理念，作为论坛留念，让海丝记忆传播和珍藏。
      </div>
      <img
        src="https://pic.imgdb.cn/item/66d70214d9c307b7e9a159fd.jpg"
        alt=""
        class="w-full rd-10px"
      />
      <div class="flex-center">
        <img
          src="https://pic.imgdb.cn/item/66d70215d9c307b7e9a15a54.jpg"
          alt=""
          class="w-50% object-contain rd-10px"
        />
        <img
          src="https://pic.imgdb.cn/item/66d70215d9c307b7e9a15aa7.jpg"
          alt=""
          class="w-50% object-contain rd-10px mr-4px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-pc {
  background-image: url('/images/mpf-login-bg.png');
  background-size: cover;
  padding-top: 120px;
}

.bg-mobile {
  background-image: url('/images/mpf-bg-mobile.png');
  background-size: cover;
  background-repeat: repeat-y;
  padding-top: 10rem;
}

.card {
  background-color: #fff;
  border-radius: 6px;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
}

.title {
  display: flex;
  align-items: center;
  color: rgb(11, 79, 168);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  .title-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgb(11, 79, 168);
    margin-right: 10px;
  }
}

.subTitle {
  color: #33ce5d;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;

  .title-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #33ce5d;
    margin-right: 10px;
  }
}

.text {
  color: rgb(35, 35, 35);
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
}

.letter-space {
  letter-spacing: 8px;
}
</style>
