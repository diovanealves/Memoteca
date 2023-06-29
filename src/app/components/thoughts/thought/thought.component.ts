import { Component, Input } from '@angular/core';
import { Thought } from '../thought';

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
    model: "model3"
  }

  thoughtWidth(): string {
    if(this.thought.content.length >= 256){
      return "thought-g"
    }
    return "thought-p"
  }

}
