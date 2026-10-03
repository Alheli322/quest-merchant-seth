import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAvatarStore = create(
  persist(
    (set) => ({
      avatars: {},

      setAvatar: (usuarioId, avatar) =>
        set((state) => ({
          avatars: {
            ...state.avatars,
            [usuarioId]: avatar
          }
        }))
    }),
    {
      name: "quest-avatars"
    }
  )
)