/**
 * site-data.js — 集中管理网站可编辑内容
 * 修改活动信息、团队成员、时间线等只需编辑此文件
 */
var SITE_DATA = {

  /* ═══════════════════ 基本信息 ═══════════════════ */
  site: {
    title: '锦秀青年在秀山 · 三下乡实践成果',
    description: '西南大学地理科学学院赴重庆秀山暑期三下乡社会实践成果展示',
    teamName: '重庆秀山锦秀小分队',
    school: '西南大学 · 地理科学学院',
    theme: '故土情怀弦轮不辍，科教赋能秀山振兴',
    year: 2026,
    location: '重庆市秀山土家族苗族自治县',
    dateStart: '2026-07-16',
    dateEnd: '2026-07-22',
    dateDisplay: '2026年7月16日 — 22日',
    wechatId: 'jinxiu_swu',
    wechatName: '锦秀青年在秀山'
  },

  /* ═══════════════════ 成果数字 ═══════════════════ */
  stats: {
    highlights: [
      { target: 7,  unit: '天',  label: '实地实践' },
      { target: 5,  unit: '个',  label: '调研小组' },
      { target: 13, unit: '人',  label: '团队规模' },
      { target: 15, unit: '处',  label: '走访点位' }
    ],
    culture: [
      { target: 4, label: '非遗项目' },
      { target: 1, label: '国家级代表性传承人专访' },
      { target: 6, label: '走访村落' }
    ],
    survey: [
      { target: 88,  label: '民众非遗认知问卷（项目汇总）' },
      { target: 38,  label: '非遗进校园问卷（项目汇总）' },
      { target: 126, label: '当前汇总合计' }
    ],
    results: [
      { target: 5,  label: '调研报告' },
      { target: 10, label: '公众号推文' },
      { target: 3,  label: '纪录短片' },
      { target: 2,  label: '3D互动模型' },
      { target: 1,  label: '项目事实库' },
      { target: 383, label: '实拍照片', suffix: '+' }
    ]
  },

  /* ═══════════════════ 团队成员（13人） ═══════════════════ */
  team: {
    groups: [
      {
        name: '总统筹组',
        icon: '\u{1F3AF}',
        desc: '对接学院团委、秀山团委及所有外部单位；统筹全局工作，制定活动计划和进度表',
        members: ['彭思懿', '林若辰']
      },
      {
        name: '支教组',
        icon: '\u{1F4DA}',
        desc: '面向当地小学生开展红色文化、法治安全、地理科学、趣味科普等课程',
        members: ['张婷', '高思曼', '林若辰', '李宗恩']
      },
      {
        name: '文化调研组',
        icon: '\u{1F3AD}',
        desc: '围绕秀山花灯、秀山民歌、大寨村座子屋、秀山紫砂石壶开展调研和数字化记录',
        members: ['彭思懿', '李鸿彬', '张旭', '刘敏']
      },
      {
        name: '产业调研组',
        icon: '\u{1F4C8}',
        desc: '调研秀山电商与特色农业发展，实地走访武陵山国际电商产业园和玫瑰园国防教育基地',
        members: ['杨旺旺', '常浩', '袁文霞', '谢明朗']
      },
      {
        name: '技术组',
        icon: '\u{1F4BB}',
        desc: '负责项目知识库整理、3D建模、网站建设、拍摄与数字化成果落地，并推进AI问答方案',
        members: ['张旭', '李鸿彬', '常浩', '刘敏', '张婷']
      },
      {
        name: '宣传组',
        icon: '\u{1F4F7}',
        desc: '运营公众号"锦秀青年在秀山"，制作推文、短视频，负责多平台投稿与传播',
        members: ['高思曼', '袁文霞', '林若辰', '常浩', '谢明朗', '黄迪']
      },
      {
        name: '后勤安全组',
        icon: '\u{1F6E1}',
        desc: '负责物资采购、食宿交通、安全保障、经费管理、应急预案',
        members: ['李鸿彬', '杨旺旺', '李宗恩']
      }
    ]
  },

  /* ═══════════════════ 时间线（7天） ═══════════════════ */
  timeline: [
    {
      date: '7月16日',
      title: '三线并进攻坚日',
      desc: '支教组前往微电影城托管班开展服务；文化组前往大寨村开展座子屋实地测量，走访西兰卡普非遗工坊；产业组走访玫瑰园国防教育基地'
    },
    {
      date: '7月17日',
      title: '场馆+产业调研日',
      desc: '文化组走访秀山县文化馆、博物馆、非遗文化馆、天后宫、乌阳古码头；产业组前往武陵山国际电商产业园'
    },
    {
      date: '7月18日',
      title: '资料整理与宣传日',
      desc: '各组集中整理前两日调研数据与访谈记录；宣传组在各平台发布活动动态；技术组前往西街拍摄活动纪实与宣传视频素材'
    },
    {
      date: '7月19日',
      title: '全员非遗体验日',
      desc: '全体成员集中采访秀山民歌国家级非物质文化遗产代表性传承人何建勋老师，开展深度访谈、民歌学唱、花灯制作与表演体验，并进行街头民众非遗认知度调研'
    },
    {
      date: '7月20日',
      title: '分组深化日',
      desc: '文化组前往客寨风雨桥、土司遗址实地调研；产业组线上补充产业数据，完善调研报告框架'
    },
    {
      date: '7月21日',
      title: '机动整理日',
      desc: '各组集中整理全量调研资料与素材；查漏补缺，搭建调研报告框架；全体总结会汇报进度'
    },
    {
      date: '7月22日',
      title: '总结返程日',
      desc: '与共青团秀山县委开展总结对接会，汇报实践成果；完成物资收尾对接；全员返程重庆'
    }
  ],

  /* ═══════════════════ 文化调研项目 ═══════════════════ */
  culture: [
    {
      name: '秀山花灯',
      badge: '国家级非遗',
      desc: '秀山花灯是集舞蹈、音乐、扎彩为一体的民间艺术，2006年列入第一批国家级非物质文化遗产名录。团队采访了秀山民歌国家级非物质文化遗产代表性传承人何建勋老师，记录花灯起源传说、灯体寓意、制作工序以及当代传承困境。',
      images: [
        'assets/images/culture/huadeng-01.webp',
        'assets/images/culture/huadeng-02.webp',
        'assets/images/culture/huadeng-09.webp',
        'assets/images/culture/huadeng-11.webp'
      ]
    },
    {
      name: '秀山民歌',
      badge: '传统音乐',
      desc: '秀山民歌是土家族、苗族人民世代传唱的音乐形式。何建勋老师作为傩戏第十一代传人，不仅精通花灯表演，更是民歌的活字典。在他的传习所里，团队成员学唱经典曲目，记录珍贵的口传灯谣和民谣曲调。',
      image: 'assets/images/culture/minge-interview.webp',
      videos: [
        'assets/media/culture/minge-performance-01.mp4',
        'assets/media/culture/minge-performance-02.mp4'
      ]
    },
    {
      name: '大寨村座子屋',
      badge: '穿斗式木构',
      desc: '文化调研组深入清溪场镇大寨村，对多栋不同年代、不同结构的典型座子屋进行了实地观察、测量与资料采集，并完成部分特色构件的三维建模。座子屋点位和文化资料仍在整理，交互式文化地图尚在完善中。',
      images: [
        'assets/images/culture/zuoziwu-05.webp',
        'assets/images/culture/zuoziwu-03.webp',
        'assets/images/culture/zuoziwu-01.webp'
      ]
    },
    {
      name: '秀山紫砂石壶',
      badge: '地方石文化 · 匠心传承',
      desc: '文化调研组来到秀山非遗文化体验馆，与秀山紫砂石壶传承人向华清老师交流，了解紫砂石壶的历史渊源、石材特点与制作技艺。秀山紫砂石壶凝结了地方石文化与传统技艺的创新表达，是传播秀山文化的一张独特名片。',
      images: [
        'assets/images/culture/zisha-02.webp',
        'assets/images/culture/zisha-04.webp',
        'assets/images/culture/zisha-01.webp',
        'assets/images/culture/zisha-03.webp'
      ]
    }
  ],

  /* ═══════════════════ 产业调研 ═══════════════════ */
  industry: {
    tracks: [
      {
        name: '特色农业',
        icon: '\u{1F331}',
        desc: '走访清溪场镇玫瑰园国防教育爱国基地，了解特色农业与乡村文旅融合的发展实践。'
      },
      {
        name: '电商产业',
        icon: '\u{1F6D2}',
        desc: '深入武陵山国际电商产业园——建筑面积3.3万㎡，80余家企业入驻，泡泡玛特年产734万个盲盒，"秀源·轻山"品牌直接出口额达900万元，带动本地特产出口超1亿元。'
      },
      {
        name: '物流体系',
        icon: '\u{1F69A}',
        desc: '秀山（武陵）现代物流园是重庆市首个市级物流园区，渝怀铁路上唯一300万吨战略装卸点，支撑"工业品+农产品"双轮出海模式。'
      }
    ],
    chartData: [
      { year: '2014', value: 3.4 },
      { year: '2016', value: 8.2 },
      { year: '2018', value: 16.5 },
      { year: '2020', value: 31.4 }
    ],
    chartNote: '数据来源：崔凯 (2021) 秀山电商学术报告 · 实地调研数据待补充'
  },

  /* ═══════════════════ 支教课程 ═══════════════════ */
  teaching: {
    courses: [
      { name: '红色文化', color: 'red', desc: '讲述秀山红色历史，刘邓大军进驻秀山的故事，传承革命精神' },
      { name: '法治安全', color: 'blue', desc: '防溺水、交通安全、未成年人保护等法律常识普及' },
      { name: '地理科学', color: 'green', desc: '喀斯特地貌、武陵山区地理特征、家乡地图绘制' },
      { name: '趣味科普', color: 'yellow', desc: '科学实验、自然观察、环保手工等互动体验课程' }
    ],
    locations: ['微电影城托管班', '秀山县党群服务中心托管班']
  },

  /* ═══════════════════ 媒体与荣誉 ═══════════════════ */
  media: {
    douyin: {
      url: 'https://www.douyin.com/user/MS4wLjABAAAAOwQe6faum4K8Q2v7gs9tkUPmAWEM7ZGnoX7SsbBobYQOk0myyJBRoVQ6DsNQx9cA',
      label: '抖音账号',
      account: '34143075389',
      desc: '关注"锦秀青年在秀山"抖音账号，查看实践纪录视频'
    },
    wechat: {
      label: '微信公众号',
      name: '锦秀青年在秀山',
      account: 'jinxiu_swu',
      qr: 'assets/images/media/wechat-qr.webp',
      desc: '阅读"锦秀青年在秀山"公众号推文，了解实践全过程'
    }
  },

  /* ═══════════════════ 图片画廊 ═══════════════════ */
  gallery: [
    { src: 'assets/images/culture/zuoziwu-03.webp', alt: '大寨村座子屋实地调研', category: 'culture' },
    { src: 'assets/images/culture/minge-interview.webp', alt: '何建勋老师访谈', category: 'culture' },
    { src: 'assets/images/culture/huadeng-09.webp', alt: '花灯制作技艺体验', category: 'culture' },
    { src: 'assets/images/culture/huadeng-02.webp', alt: '秀山花灯陈列', category: 'culture' },
    { src: 'assets/images/teaching/teach-01.webp', alt: '托管班课堂教学', category: 'teach' },
    { src: 'assets/images/teaching/teach-02.webp', alt: '支教课堂互动', category: 'teach' }
  ],

  /* ═══════════════════ 走访地点汇总 ═══════════════════ */
  locations: [
    '清溪场镇大寨村（座子屋调研）',
    '清溪场镇西兰卡普非遗工坊',
    '秀山县文化馆 / 非遗文化馆 / 博物馆',
    '天后宫 / 乌阳古码头',
    '清溪场镇客寨风雨桥 / 土司遗址',
    '玫瑰园国防教育爱国基地',
    '武陵山国际电商产业园',
    '微电影城托管班',
    '秀山县党群服务中心托管班',
    '何建勋老师花灯传习所'
  ],

  /* ═══════════════════ 传承人专访：何建勋 ═══════════════════ */
  interview: {
    profile: {
      name: '何建勋',
      titles: ['秀山民歌国家级非物质文化遗产代表性传承人', '傩戏第十一代传人'],
      photo: 'assets/images/culture/he-jianxun.webp',
      quote: '灯由唐朝起，灯由宋朝兴。仁宗皇帝登龙位，郭母娘娘瞎眼睛。许下红灯三千六百盏，留下两盏到如今。',
      quoteSrc: '何建勋 · 口传灯谣',
      highlights: ['制作花灯', '传唱民歌', '教授技艺', '支持数字传播']
    },
    chapters: [
      { id: 'ch1', title: '灯由唐起', subtitle: '花灯的起源与传说' },
      { id: 'ch2', title: '指尖匠心', subtitle: '花灯制作工艺与分类' },
      { id: 'ch3', title: '风雪痴翁', subtitle: '传承困境与坚守故事' },
      { id: 'ch4', title: '微光星河', subtitle: '数字化传承与未来展望' }
    ],
    audio: {
      title: '秀山民歌实录',
      tracks: [
        { name: '开财门', artist: '文化组现场采录', duration: '05:08', src: 'assets/media/culture/kaicaimen.mp3' },
        { name: '谢主', artist: '文化组现场采录', duration: '04:39', src: 'assets/media/culture/xiezhu.mp3' }
      ]
    }
  }
};
