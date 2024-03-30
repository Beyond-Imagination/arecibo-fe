export interface IPlanet {
    _id: string
    title: string
    default: boolean
    category: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export interface IGetSubscribedPlanetsResponse {
    planets: IPlanet[]
}

export interface IGetSubscribablePlanetsResponse {
    planets: IPlanet[]
}

export interface ISubscribePlanetRequest {
    uri: {
        planetId: string
    }
    secret: {
        token: string
    }
}

export interface IUnsubscribePlanetRequest extends ISubscribePlanetRequest {}
