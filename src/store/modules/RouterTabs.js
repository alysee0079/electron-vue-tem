const state = {
  routerTabs: [],
  currentRouterTitle: '',
}

const getters = {
  routerTabs: state => state.routerTabs,
  currentRouterTitle: state => state.currentRouterTitle,
}

const actions = {
  updateRouterTabs({ commit }, payload) {
    return commit('UpdateRouterTabs', payload)
  },
  delRouterTabs({ commit }, payload) {
    return commit('DelRouterTabs', payload)
  }
}
const mutations = {
  setRouterTabs (state, payload) {
    state.routerTabs = payload;
  },
  UpdateRouterTabs(state, to) {
    let title = to.meta.title;
    let fullPath = to.fullPath;
    let routerTabs = state.routerTabs;
    let minIndex = -1;
    let toIndex = -1;
    routerTabs.reduce((minItem, item, index) => {
      if (item.title == title) toIndex = index;
      if (item.time > minItem.time) {
        return minItem;
      } else {
        minIndex = index;
        return item;
      }
    }, routerTabs[0]);
    if (toIndex > -1) {
      routerTabs.splice(toIndex, 1, { title, fullPath, time: Date.now() });
    } else {
      if (minIndex > -1 && routerTabs.length >= 10) {
        routerTabs.splice(minIndex, 1);
      }
      routerTabs.push({ title, fullPath, time: Date.now() })
    }
    state.currentRouterTitle = title;
    localStorage.sys = JSON.stringify(routerTabs);
  },
  DelRouterTabs(state, index) {
    let routerTabs = state.routerTabs;
    routerTabs.splice(index, 1);
    localStorage.sys = JSON.stringify(routerTabs);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
