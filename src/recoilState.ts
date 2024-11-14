// recoilState.ts
import { atom, selector } from 'recoil'

// Atom to store the current active banner index
export const bannerIndexState = atom({
  key: 'bannerIndexState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (initial state)
})

// Selector example (optional): computed state based on the bannerIndexState
export const bannerDataSelector = selector({
  key: 'bannerDataSelector', // unique ID for the selector
  get: ({ get }) => {
    const bannerIndex = get(bannerIndexState)
    const banners = ['Banner 1', 'Banner 2', 'Banner 3'] // example banners
    return banners[bannerIndex] // return current banner data
  },
})
