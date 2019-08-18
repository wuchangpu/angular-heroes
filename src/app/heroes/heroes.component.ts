import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  private heroes: Hero[];

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({ name } as Hero).subscribe(
      
      hero => {
        console.log('add-subscribe-hero=', hero);
        this.heroes.push(hero)
      }
    );
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      () => {
        this.heroes = this.heroes.filter(item => item != hero)
      }
    );
  }

}
