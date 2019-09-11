const menuActivIndex = {
  dataImport: "/home/data-import",
  dataProcessing: "/home/data-processing",
  dataAnalysis: "/home/data-analysis",
  dataMining: "/home/data-mining",
  taskRelease: "/home/task-release"
};

const menu = {
  state: {
    active: "dataImport"
  },
  getter: {
    activeIndex: state => {
      let activeIndex = menuActivIndex[state.active];
      if (activeIndex == "" || activeIndex == undefined) {
        activeIndex = menuActivIndex["dataImport"];
      }
      return activeIndex;
    }
  },
  mutations: {
    changeIndex(state, payload) {
      state.active = payload.index;
    }
  }
};
export default menu;
