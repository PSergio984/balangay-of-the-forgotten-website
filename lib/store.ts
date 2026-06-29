import { create } from 'zustand'

export interface GameState {
  // Loader Slice
  isLoaderMounted: boolean
  isLoaderVisible: boolean
  loaderProgress: number
  isReady: boolean
  bootMsgIndex: number
  bossIndex: number
  typedName: string
  flash: boolean

  // Audio Slice
  isAudioPlaying: boolean
  currentTheme: string | null

  // Selections Slice
  selectedRegionId: string
  selectedRoleId: string | null

  // Actions
  setLoaderProgress: (progress: number) => void
  setLoaderVisible: (visible: boolean) => void
  setLoaderMounted: (mounted: boolean) => void
  setBootMsgIndex: (index: number) => void
  setBossIndex: (index: number) => void
  setTypedName: (name: string) => void
  setFlash: (flash: boolean) => void
  setReady: (ready: boolean) => void

  setAudioPlaying: (playing: boolean) => void
  playTheme: (src: string) => void
  stopTheme: () => void

  selectRegion: (regionId: string) => void
  selectRole: (roleId: string | null) => void
}

export const useGameStore = create<GameState>((set) => ({
  // Loader Slice Defaults
  isLoaderMounted: false,
  isLoaderVisible: false,
  loaderProgress: 0,
  isReady: false,
  bootMsgIndex: 0,
  bossIndex: 0,
  typedName: "",
  flash: false,

  // Audio Slice Defaults
  isAudioPlaying: false,
  currentTheme: null,

  // Selections Slice Defaults
  selectedRegionId: "choosing-territory",
  selectedRoleId: null,

  // Actions
  setLoaderProgress: (progress) => set({ loaderProgress: progress }),
  setLoaderVisible: (visible) => set({ isLoaderVisible: visible }),
  setLoaderMounted: (mounted) => set({ isLoaderMounted: mounted }),
  setBootMsgIndex: (index) => set({ bootMsgIndex: index }),
  setBossIndex: (index) => set({ bossIndex: index }),
  setTypedName: (name) => set({ typedName: name }),
  setFlash: (flash) => set({ flash }),
  setReady: (ready) => set({ isReady: ready }),

  setAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
  playTheme: (src) => set({ currentTheme: src }),
  stopTheme: () => set({ currentTheme: null }),

  selectRegion: (regionId) => set({ selectedRegionId: regionId }),
  selectRole: (roleId) => set({ selectedRoleId: roleId }),
}))
