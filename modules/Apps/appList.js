import Images from '../../commons/Images';

const appsList = {
  lottery: {
    imageSource: Images.lottery,
    description: 'Lottery是一款参考MMM设计的游戏，仅限中国大陆用户参与，风险自负。',
    title: 'lottery',
    enabled: true,
  },
  minecraft: {
    imageSource: Images.minecraft,
    description:
      'In Minecraft, you can own a piece of virtual land permenantly signed on Etheruem. ',
    title: 'minecraft',
    enabled: false,
  },
  neoworld: {
    imageSource: Images.neoworld,
    description:
      'In NeoWorld, you can own a piece of virtual land permenantly signed on Etheruem. ',
    title: 'neoworld',
    enabled: false,
  },
};

export default appsList;
