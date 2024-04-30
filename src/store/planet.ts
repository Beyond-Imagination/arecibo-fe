import { create } from 'zustand'
import { IPlanet } from '@/types'

interface planetState {
    planet: IPlanet
    setPlanet: (planet: IPlanet) => undefined
}
export const planetStore = create<planetState>(set => ({
    planet: {
        _id: '',
        title: '',
        default: false,
        category: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    setPlanet: planet => {
        set(state => ({
            planet: { ...state.planet, ...planet },
        }))
    },
}))
