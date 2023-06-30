import { Component, Input } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.css']
})
export class ThoughtComponent {

  @Input() thought: Thought = {
    id: 0,
    content: "Lorem ipsum dolor sit amet. Sed maiores possimus et nesciunt labore non accusamus repudiandae ea unde veniam hic enim vero? Ut ipsam asperiores qui tempore asperiores ad molestias autem rem magnam dolorum eos repellat doloribus aut internos quia! Cum sunt recusandae et iste ipsa est eaque laborum et eaque nemo.",
    authorship: "Diovane",
    model: "model3",
    favorite: false,
  }

  @Input() favoritesList: Thought[] = [];

  constructor(
    private service: ThoughtService
  ){}

  thoughtWidth(): string {
    if(this.thought.content.length >= 256){
      return "thought-g"
    }
    return "thought-p"
  }

  changeFavoriteIcon(): string {
    if(this.thought.favorite == false ){
      return "Inactive"
    }
    return "Active"
  }

  changeFavorite() {
    this.service.changeFavorite(this.thought).subscribe(() => {
      this.favoritesList.splice(this.favoritesList.indexOf(this.thought), 1)
    })
  }

}
