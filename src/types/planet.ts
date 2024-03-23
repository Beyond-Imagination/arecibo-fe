export interface IPlanet {
    _id: string
    title: string
    category: string
    createdAt: Date
    updatedAt: Date
}

export interface IGetSubscribedPlanetsResponse {
    planets: IPlanet[]
}

export interface IGetSubscribablePlanetsResponse {
    planets: IPlanet[]
}
