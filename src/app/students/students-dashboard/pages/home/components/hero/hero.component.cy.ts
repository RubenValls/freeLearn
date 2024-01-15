import { HeroComponent } from './hero.component'

describe('HeroComponent', () => {
  it('should mount', () => {
    cy.mount(HeroComponent)
  })
})