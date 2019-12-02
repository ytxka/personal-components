const dataSource = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'xihu',
              label: '西湖',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          disabled: true, // attention
          children: [
            {
              value: 'zhonghuamen',
              label: '中华门',
            },
          ],
        },
      ],
    },
  ];

  const config = {
      root: 'cascader',
      dataSource,
  }
  let picker = new cascader(config);
  picker.initPage()