/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import { ref, computed } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export const collapsed = ref(true)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 200
export const SIDEBAR_WIDTH_COLLAPSED = 55
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)
