<script setup lang="ts">

const props = defineProps({
  rate: {
    type: String,
    default: '0'
  },
  percent: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ''
  }
});

const data = reactive({
  rangeGrade: [
    { id: 5, deg: '4deg', percent: '5%', color: '#F86B6B' },
    { id: 6, deg: '4deg', percent: '6%', color: '#F86B6B' },
    { id: 7, deg: '5deg', percent: '7%', color: '#F86B6B' },
    { id: 8, deg: '6deg', percent: '8%', color: '#F86B6B' },
    { id: 9, deg: '7deg', percent: '9%', color: '#F86B6B' },
    { id: 10, deg: '9deg', percent: '10%', color: '#F86B6B' },
    { id: 11, deg: '9deg', percent: '11%', color: '#F86B6B' },
    { id: 12, deg: '11deg', percent: '12%', color: '#F86B6B' },
    { id: 13, deg: '13deg', percent: '13%', color: '#F86B6B' },
    { id: 14, deg: '13deg', percent: '14%', color: '#F86B6B' },
    { id: 15, deg: '16deg', percent: '15%', color: '#F86B6B' },
    { id: 16, deg: '17deg', percent: '16%', color: '#F86B6B' },
    { id: 17, deg: '19deg', percent: '17%', color: '#F86B6B' },
    { id: 18, deg: '20deg', percent: '18%', color: '#F86B6B' },
    { id: 19, deg: '23deg', percent: '19%', color: '#F86B6B' },
    { id: 20, deg: '25deg', percent: '20%', color: '#F86B6B' },
    { id: 21, deg: '26deg', percent: '21%', color: '#F86B6B' },
    { id: 22, deg: '29deg', percent: '22%', color: '#F86B6B' },
    { id: 23, deg: '30deg', percent: '23%', color: '#F86B6B' },
    { id: 24, deg: '32deg', percent: '24%', color: '#F86B6B' },
    { id: 25, deg: '34deg', percent: '25%', color: '#F86B6B' },
    { id: 26, deg: '36deg', percent: '26%', color: '#F86B6B' },
    { id: 27, deg: '38deg', percent: '27%', color: '#F86B6B' },
    { id: 28, deg: '44deg', percent: '28%', color: '#F86B6B' },
    { id: 29, deg: '46deg', percent: '29%', color: '#F86B6B' },
    { id: 30, deg: '48deg', percent: '30%', color: '#F86B6B' },
    { id: 31, deg: '50deg', percent: '31%', color: '#FFBC65' },
    { id: 32, deg: '50deg', percent: '32%', color: '#FFBC65' },
    { id: 33, deg: '52deg', percent: '33%', color: '#FFBC65' },
    { id: 34, deg: '54deg', percent: '34%', color: '#FFBC65' },
    { id: 35, deg: '56deg', percent: '35%', color: '#FFBC65' },
    { id: 36, deg: '58deg', percent: '36%', color: '#FFBC65' },
    { id: 37, deg: '60deg', percent: '37%', color: '#FFBC65' },
    { id: 38, deg: '62deg', percent: '38%', color: '#FFBC65' },
    { id: 39, deg: '64deg', percent: '39%', color: '#FFBC65' },
    { id: 40, deg: '66deg', percent: '40%', color: '#FFBC65' },
    { id: 41, deg: '68deg', percent: '41%', color: '#FFBC65' },
    { id: 42, deg: '70deg', percent: '42%', color: '#FFBC65' },
    { id: 43, deg: '72deg', percent: '43%', color: '#FFBC65' },
    { id: 44, deg: '74deg', percent: '44%', color: '#FFBC65' },
    { id: 45, deg: '77deg', percent: '45%', color: '#FFBC65' },
    { id: 46, deg: '79deg', percent: '46%', color: '#FFBC65' },
    { id: 47, deg: '81deg', percent: '47%', color: '#FFBC65' },
    { id: 48, deg: '83deg', percent: '48%', color: '#FFBC65' },
    { id: 49, deg: '85deg', percent: '49%', color: '#FFBC65' },
    { id: 50, deg: '90deg', percent: '50%', color: '#FFBC65' },
    { id: 51, deg: '94deg', percent: '51%', color: '#FFBC65' },
    { id: 52, deg: '94deg', percent: '52%', color: '#FFBC65' },
    { id: 53, deg: '96deg', percent: '53%', color: '#FFBC65' },
    { id: 54, deg: '97deg', percent: '54%', color: '#FFBC65' },
    { id: 55, deg: '98deg', percent: '55%', color: '#FFBC65' },
    { id: 56, deg: '99deg', percent: '56%', color: '#FFBC65' },
    { id: 57, deg: '102deg', percent: '57%', color: '#FFBC65' },
    { id: 58, deg: '103deg', percent: '58%', color: '#FFBC65' },
    { id: 59, deg: '105deg', percent: '59%', color: '#FFBC65' },
    { id: 60, deg: '107deg', percent: '60%', color: '#FFBC65' },
    { id: 61, deg: '110deg', percent: '61%', color: '#FFBC65' },
    { id: 62, deg: '112deg', percent: '62%', color: '#FFBC65' },
    { id: 63, deg: '114deg', percent: '63%', color: '#FFBC65' },
    { id: 64, deg: '116deg', percent: '64%', color: '#FFBC65' },
    { id: 65, deg: '118deg', percent: '65%', color: '#FFBC65' },
    { id: 66, deg: '120deg', percent: '66%', color: '#FFBC65' },
    { id: 67, deg: '123deg', percent: '67%', color: '#FFBC65' },
    { id: 68, deg: '125deg', percent: '68%', color: '#FFBC65' },
    { id: 69, deg: '127deg', percent: '69%', color: '#FFBC65' },
    { id: 70, deg: '130deg', percent: '70%', color: '#FFBC65' },
    { id: 71, deg: '134deg', percent: '71%', color: '#FFBC65' },
    { id: 72, deg: '136deg', percent: '72%', color: '#FFBC65' },
    { id: 73, deg: '138deg', percent: '73%', color: '#FFBC65' },
    { id: 74, deg: '140deg', percent: '74%', color: '#FFBC65' },
    { id: 75, deg: '142deg', percent: '75%', color: '#FFBC65' },
    { id: 76, deg: '144deg', percent: '76%', color: '#FFBC65' },
    { id: 77, deg: '146deg', percent: '77%', color: '#FFBC65' },
    { id: 78, deg: '150deg', percent: '78%', color: '#FFBC65' },
    { id: 79, deg: '154deg', percent: '79%', color: '#FFBC65' },
    { id: 80, deg: '151deg', percent: '80%', color: '#7AC74F' },
    { id: 81, deg: '157deg', percent: '81%', color: '#7AC74F' },
    { id: 82, deg: '159deg', percent: '82%', color: '#7AC74F' },
    { id: 83, deg: '161deg', percent: '83%', color: '#7AC74F' },
    { id: 84, deg: '163deg', percent: '84%', color: '#7AC74F' },
    { id: 85, deg: '164deg', percent: '85%', color: '#7AC74F' },
    { id: 86, deg: '166deg', percent: '86%', color: '#7AC74F' },
    { id: 87, deg: '167deg', percent: '87%', color: '#7AC74F' },
    { id: 88, deg: '168deg', percent: '88%', color: '#7AC74F' },
    { id: 89, deg: '170deg', percent: '89%', color: '#7AC74F' },
    { id: 90, deg: '171deg', percent: '90%', color: '#7AC74F' },
    { id: 91, deg: '172deg', percent: '91%', color: '#7AC74F' },
    { id: 92, deg: '173deg', percent: '92%', color: '#7AC74F' },
    { id: 93, deg: '174deg', percent: '93%', color: '#7AC74F' },
    { id: 94, deg: '175deg', percent: '94%', color: '#7AC74F' },
    { id: 95, deg: '176deg', percent: '95%', color: '#7AC74F' },
    { id: 96, deg: '177deg', percent: '96%', color: '#7AC74F' },
    { id: 97, deg: '178deg', percent: '97%', color: '#7AC74F' },
    { id: 98, deg: '179deg', percent: '98%', color: '#7AC74F' },
    { id: 99, deg: '179deg', percent: '98%', color: '#7AC74F' },
    { id: 100,deg: '180deg', percent: '100%', color: '#7AC74F' },
  ]
});

const borderRate = () => {
  if (props.percent === 0) {
    return { 'border': '2px solid #E4E5F0' };
  }

  const rate = props.percent <= 5
      ? data.rangeGrade.find(rt => rt.id === 5)
      : data.rangeGrade.find(rt => rt.id === props.percent);
  return {
    'background': `linear-gradient(white, white) padding-box, linear-gradient(${rate?.deg}, ${rate?.color} 0 ${rate?.percent}, #E4E5F0 ${rate?.percent} 100%) border-box`,
    'border': '2px solid transparent'
  };
};
</script>

<template>
  <div class="border-rate">
    <div class="border-rate-title" v-if="props.title?.length">
      {{ props.title }}
    </div>
    <div class="cycle-value" :style="borderRate()">
      <div class="value">{{ props.rate }}</div>
    </div>
  </div>
</template>