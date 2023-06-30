import { Component } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-thought',
  templateUrl: './list-thought.component.html',
  styleUrls: ['./list-thought.component.css']
})
export class ListThoughtComponent {
  listThought: Thought[] = [];
  currentPage: number = 1;
  hasMoreThought: boolean = true;
  filter: string = '';
  favorite: boolean = false;
  favoritesList: Thought[] = [];
  title: string = "Meu Mural";

  constructor(
    private service: ThoughtService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.service.list(this.currentPage, this.filter, this.favorite).subscribe((listThought) => {
      this.listThought = listThought
    })
  }

  loadMoreThought(){
    this.service.list(++this.currentPage, this.filter, this.favorite).subscribe((listThought) => {
      this.listThought.push(...listThought)
      if(!listThought.length) {
        this.hasMoreThought = false;
      }
    })
  }

  searchThought(){
    this.hasMoreThought = true;
    this.currentPage = 1;
    this.service.list(this.currentPage, this.filter, this.favorite).subscribe((listThought) => {
      this.listThought = listThought;
    })
  }

  reloadComponent(){
    this.favorite = false;
    this.currentPage = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  listFavorites(){
    this.favorite = true;
    this.hasMoreThought = true;
    this.currentPage = 1;
    this.title = "Meus Favoritos"
    this.service.list(this.currentPage, this.filter, this.favorite).subscribe((listFavoriteThoughts) => {
      this.listThought = listFavoriteThoughts
      this.favoritesList = listFavoriteThoughts
    })
  }
}
